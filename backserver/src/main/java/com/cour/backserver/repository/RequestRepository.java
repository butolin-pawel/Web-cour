package com.cour.backserver.repository;

import com.cour.backserver.entity.Request;
import com.cour.backserver.entity.User;

import java.time.LocalDate;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

public interface RequestRepository extends CrudRepository<Request,Long> {

    List<Request> findAllByClient(User client);
    List<Request> findByStdateIsBetweenOrderByStdateDesc(LocalDateTime selday, LocalDateTime nextbeforeday);
    Request findFirstByClientOrderByIdDesc(Integer client);
}
