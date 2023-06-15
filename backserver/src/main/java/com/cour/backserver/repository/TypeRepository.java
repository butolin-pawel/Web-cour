package com.cour.backserver.repository;

import com.cour.backserver.entity.Radius;
import com.cour.backserver.entity.Type;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
public interface TypeRepository extends CrudRepository<Type,Long> {
    List<Type> findAll();

    Type getByType(String type);
}
