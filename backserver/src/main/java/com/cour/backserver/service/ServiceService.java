package com.cour.backserver.service;

import com.cour.backserver.entity.Product;
import com.cour.backserver.entity.Service;

import java.util.List;

public interface ServiceService {
    List<Service> getAll();
    Service getService(Long id);
}
