package com.cour.backserver.service;

import com.cour.backserver.entity.Radius;
import com.cour.backserver.entity.Type;
import org.springframework.stereotype.Service;
import java.time.*;
@Service
public class TimeCounterService {
    public LocalDateTime countEndTime(LocalDateTime stdt, Radius rs, Type ty){
        LocalDateTime enddate = stdt;
        double minutes = 15;

        byte wheelcnt = 4;
        if(ty.getType() != "Легковой"){
           enddate =  enddate.plusMinutes(20);
           if(ty.getType() == "Прицеп"){
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
