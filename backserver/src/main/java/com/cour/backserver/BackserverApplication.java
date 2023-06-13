package com.cour.backserver;

import com.cour.backserver.service.ProductService;
import com.cour.backserver.service.ServiceService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@NoArgsConstructor
@EnableJpaRepositories
public class BackserverApplication {
    private  ProductService productService;
    private ServiceService serviceService;
    public static void main(String[] args) {
        SpringApplication.run(BackserverApplication.class, args);
    }

}
