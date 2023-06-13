package com.cour.backserver.repository;

import com.cour.backserver.entity.Radius;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RadiusRepository extends CrudRepository<Radius,Long> {
    List<Radius> findAll();

}
