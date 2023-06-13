package com.cour.backserver.controller;

import com.cour.backserver.entity.Request;
import com.cour.backserver.entity.User;
import com.cour.backserver.repository.RequestRepository;
import com.cour.backserver.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class RequestController {
    private final RequestService requestService;
    @Autowired
    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @PostMapping("/req")
    public void create(@RequestBody Request request){
        requestService.saveRequest(request);

    }
    @PostMapping("/clientsreq")
    public List<Request> list(@RequestBody User client){
        return  requestService.getByClient(client);
    }
}
