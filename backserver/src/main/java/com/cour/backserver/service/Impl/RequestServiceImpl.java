package com.cour.backserver.service.Impl;

import com.cour.backserver.entity.Request;
import com.cour.backserver.entity.Status;
import com.cour.backserver.entity.User;
import com.cour.backserver.repository.RequestRepository;
import com.cour.backserver.repository.StatusRepository;
import com.cour.backserver.service.RequestService;
import com.cour.backserver.service.TimeCounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
@Service
public class RequestServiceImpl implements RequestService {
    private final RequestRepository requestRepository;
    private final StatusRepository statusRepository;
    private final TimeCounterService timeCounterService;
    @Autowired
    public RequestServiceImpl(RequestRepository requestRepository, StatusRepository statusRepository, TimeCounterService timeCounterService) {
        this.requestRepository = requestRepository;
        this.statusRepository = statusRepository;
        this.timeCounterService = timeCounterService;
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
        System.out.println(request.getId());
        requestRepository.save(request);

    }

    @Override
    public void payRequest(Request request) {
        request.setStatus(statusRepository.getByStatus("Оплачена"));
        requestRepository.save(request);
    }

    @Override
    public void cancelRequest(Request request) {
        requestRepository.delete(request);
    }

    @Override
    public List<Request> getBetweenDate(LocalDate selday) {
       return requestRepository.findByStdateIsBetween(selday,selday.plusDays(2));
    }
}
