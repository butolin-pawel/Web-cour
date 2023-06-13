package com.cour.backserver.repository;

import com.cour.backserver.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
public interface ProductRepository extends CrudRepository<Product, Long> {
    List<Product> findAll();
}
