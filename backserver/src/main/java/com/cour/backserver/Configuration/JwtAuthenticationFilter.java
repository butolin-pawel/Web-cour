package com.cour.backserver.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.log.LogMessage;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.event.InteractiveAuthenticationSuccessEvent;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter implements AuthenticationSuccessHandler {
    private JwtTokenProvider jwtTokenProvider;
    private AuthenticationManager authenticationManager;
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");
//        String username ="example@email.com";
//        String password = "123";
        if(username == null || password == null)
            return null;
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        this.onAuthenticationSuccess(request,response,authResult);
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authResult) throws IOException, ServletException {
        String token = jwtTokenProvider.generateToken(authResult);
        response.addHeader("Authorization", "Bearer " + token);
        response.setStatus(HttpServletResponse.SC_OK);

        // Создание объекта ответа
        String responseBody = token;
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonBody = objectMapper.writeValueAsString(responseBody);

        // Установка Content-Type заголовка для указания формата JSON
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        // Запись тела ответа
        response.getWriter().write(jsonBody);

        // Отправка ответа клиенту
        response.getWriter().flush();
    }
}
