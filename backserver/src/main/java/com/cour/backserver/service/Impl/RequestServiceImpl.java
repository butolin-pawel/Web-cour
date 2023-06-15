package com.cour.backserver.service.Impl;

import com.cour.backserver.entity.*;
import com.cour.backserver.repository.*;
import com.cour.backserver.service.RequestService;
import com.cour.backserver.service.TimeCounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
@Service
public class RequestServiceImpl implements RequestService {
    private final RequestRepository requestRepository;
    private final StatusRepository statusRepository;
    private final TimeCounterService timeCounterService;
    private final Cart_ServiceRepository cart_serviceRepository;
    private final Cart_ProductRepository cart_productRepository;
    private final ProductRadiusRepository productRadiusRepository;
    @Autowired
    public RequestServiceImpl(RequestRepository requestRepository, StatusRepository statusRepository, TimeCounterService timeCounterService, Cart_ServiceRepository cart_serviceRepository, Cart_ProductRepository cart_productRepository, ProductRadiusRepository productRadiusRepository) {
        this.requestRepository = requestRepository;
        this.statusRepository = statusRepository;
        this.timeCounterService = timeCounterService;
        this.cart_serviceRepository = cart_serviceRepository;
        this.cart_productRepository = cart_productRepository;
        this.productRadiusRepository = productRadiusRepository;
    }

    @Override
    public List<Request> getByClient(User client) {
        return requestRepository.findAllByClient(client);
    }

    @Override
    public void saveRequest(Request request) {
        request.setEnddate(timeCounterService.countEndTime(request.getStdate(),request.getRadius(),request.getType()));

        Status st = statusRepository.getByStatus("Создана");
        request.setStatus(st);
        requestRepository.save(request);
        Long id = requestRepository.findFirstByClientOrderByIdDesc(request.getClient()).getId();
        List<Cart_service> servcart = request.getCart_services().stream().toList();
        for (Cart_service cs:servcart
             ) {
            cs.setRequest(id.intValue());
            cart_serviceRepository.save(cs);
        }
        if(request.getCart_products() != null){
            List<Cart_product> prodcart = request.getCart_products().stream().toList();
            for (Cart_product cs:prodcart
            ) {
                ProductRadius pr = productRadiusRepository.findById(cs.getProductradius().longValue()).get();
                pr.setCount(pr.getCount() - cs.getCount());
                productRadiusRepository.save(pr);
                cs.setRequest(id.intValue());
                cart_productRepository.save(cs);
            }
        }
    }

    @Override
    public void payRequest(Request request) {
        request.setStatus(statusRepository.getByStatus("Оплачена"));
        requestRepository.save(request);
    }

    @Override
    public void cancelRequest(Request request) {
        if(request.getCart_products() != null){
            List<Cart_product> prodcart = request.getCart_products().stream().toList();
            for (Cart_product cs:prodcart
            ) {
                ProductRadius pr = productRadiusRepository.findById(cs.getProductradius().longValue()).get();
                pr.setCount(pr.getCount() + cs.getCount());
                productRadiusRepository.save(pr);
            }
        }
        requestRepository.delete(request);
    }

    @Override
    public List<Request> getBetweenDate(LocalDateTime selday) {
       return requestRepository.findByStdateIsBetweenOrderByStdateDesc(selday,selday.plusDays(3));
    }
}
