package com.cour.backserver.service.Impl;

import com.cour.backserver.entity.Service;
import com.cour.backserver.repository.ServiceRepository;
import com.cour.backserver.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
@org.springframework.stereotype.Service
public class ServiceServiceImpl implements ServiceService {
    private final ServiceRepository serviceRepository;
    @Autowired
    public ServiceServiceImpl(ServiceRepository serviceRepository){
        this.serviceRepository = serviceRepository;
    }
    @Override
    public List<Service> getAll() {
        return serviceRepository.findAll();
    }

    @Override
    public Service getService(Long id) {
        return serviceRepository.findById(id).get();
    }
}
