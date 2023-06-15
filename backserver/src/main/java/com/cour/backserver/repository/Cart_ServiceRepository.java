package com.cour.backserver.repository;

import com.cour.backserver.entity.Cart_service;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

public interface Cart_ServiceRepository extends CrudRepository<Cart_service,Long> {
}
