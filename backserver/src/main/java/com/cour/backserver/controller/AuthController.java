package com.cour.backserver.controller;

import com.cour.backserver.Configuration.JwtTokenProvider;
import com.cour.backserver.entity.User;
import com.cour.backserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    private JwtTokenProvider jwtTokenProvider;
    private UserRepository userRepository;

    @Autowired
    public AuthController(JwtTokenProvider jwtTokenUtil, UserRepository userRepository) {
        this.jwtTokenProvider = jwtTokenUtil;
        this.userRepository = userRepository;
    }
    @PostMapping("/token")
    public Boolean validateToken(@RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7);

        if (jwtTokenProvider.validateToken(jwtToken)) {
            // Токен действителен
            return true;
        } else {
            // Токен недействителен
            return false;
        }
    }
    @PostMapping("/user")
    public User getUserFromToken(@RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7);

            Long userId = jwtTokenProvider.getUserIdFromToken(jwtToken);
            User user = userRepository.findById(userId).orElse(null);

            return user;

    }
    @PostMapping("logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response){
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok().build();
    }
}
