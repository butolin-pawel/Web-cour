package com.cour.backserver.controller;

import com.cour.backserver.entity.Product;
import com.cour.backserver.repository.ProductRadiusRepository;
import com.cour.backserver.service.ProductService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    private final ProductService productService;
    private final ProductRadiusRepository productRadiusRepository;
    public ProductController(ProductService productService, ProductRadiusRepository productRadiusRepository) {
        this.productService = productService;
        this.productRadiusRepository = productRadiusRepository;
    }

    @GetMapping("/products")
    public List getProducts(){
        return productService.getAll();
    }
    @GetMapping("/products/{id}")
    public Product getProducts(@PathVariable Long id){
        return productService.getProduct(id);
    }
    @GetMapping("/products/types")
    public List getTypes(){
        return productRadiusRepository.findAll();
    }
}
