package com.cour.backserver.repository;

import com.cour.backserver.entity.Status;
import org.springframework.data.repository.CrudRepository;

import java.util.Map;

public interface StatusRepository extends CrudRepository<Status,Long> {

    Status getByStatus(String status);
}
