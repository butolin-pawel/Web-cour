package com.cour.backserver.repository;

import com.cour.backserver.entity.ProductRadius;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductRadiusRepository extends CrudRepository<ProductRadius,Long> {
    List<ProductRadius> findAll();
}
