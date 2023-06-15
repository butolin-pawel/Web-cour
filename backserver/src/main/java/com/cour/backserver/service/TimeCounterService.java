package com.cour.backserver.service;

import com.cour.backserver.entity.Radius;
import com.cour.backserver.entity.Type;
import com.cour.backserver.repository.StatusRepository;
import com.cour.backserver.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.*;
import java.util.Objects;

@Service
public class TimeCounterService {
    private final TypeRepository typeRepository;
@Autowired
    public TimeCounterService(TypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }

    public LocalDateTime countEndTime(LocalDateTime stdt, Radius rs, Type ty){
        LocalDateTime enddate = stdt;
        double minutes = 15;

        byte wheelcnt = 4;
        if(ty.getId() != typeRepository.getByType("Легковой").getId()){
           enddate =  enddate.plusMinutes(20);
           if(ty.getId() == typeRepository.getByType("Прицеп").getId()){
               wheelcnt = 2;
           }
        }
        Integer rad = Integer.parseInt(rs.getRadius().substring(0,2));
        for (int i = rad;i > 15;i--){
            minutes *= 1.4;
        }
        enddate = enddate.plusMinutes((long) Math.ceil(minutes*wheelcnt));
        return enddate;
    }
}
