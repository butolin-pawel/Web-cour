package com.cour.backserver.controller;

import com.cour.backserver.service.ProductService;
import com.cour.backserver.service.ServiceService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@CrossOrigin(origins = "http://localhost:4200")
public class ServiceController {
    private final ServiceService serviceService;
    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @GetMapping("/services")
    public List getServices(){
        return serviceService.getAll();
    }
}
