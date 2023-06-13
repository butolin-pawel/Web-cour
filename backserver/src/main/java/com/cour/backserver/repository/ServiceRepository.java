package com.cour.backserver.repository;

import com.cour.backserver.entity.Service;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends CrudRepository<Service,Long> {
    List<Service> findAll();
}
