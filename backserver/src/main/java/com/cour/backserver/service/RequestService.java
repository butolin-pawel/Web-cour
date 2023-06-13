package com.cour.backserver.service;

import com.cour.backserver.entity.Request;
import com.cour.backserver.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface RequestService {
    List<Request> getByClient(User client);
    void saveRequest(Request request);
    void payRequest(Request request);
    void cancelRequest(Request request);
    List<Request> getBetweenDate(LocalDate selday);
}
