package com.cour.backserver.service;

import com.cour.backserver.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAll();
    void changeCount(Product product);
    Product getProduct(Long id);
}
