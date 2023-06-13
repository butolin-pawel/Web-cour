package com.cour.backserver.repository;

import com.cour.backserver.entity.Request;
import com.cour.backserver.entity.User;

import java.time.LocalDate;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Locale;

public interface RequestRepository extends CrudRepository<Request,Long> {

    List<Request> findAllByClient(User client);
    List<Request> findByStdateIsBetween(LocalDate selday, LocalDate nextbeforeday);
}
