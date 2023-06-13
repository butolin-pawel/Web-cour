package com.cour.backserver.controller;

import com.cour.backserver.entity.Radius;
import com.cour.backserver.entity.Status;
import com.cour.backserver.entity.Type;
import com.cour.backserver.entity.User;
import com.cour.backserver.repository.RadiusRepository;
import com.cour.backserver.repository.StatusRepository;
import com.cour.backserver.repository.TypeRepository;
import com.cour.backserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@CrossOrigin(origins = "http://localhost:4200")
public class ParamController {
    private final RadiusRepository radiusRepository;
    private final TypeRepository typeRepository;
    private final UserRepository userRepository;
    private final StatusRepository statusRepository;
    @Autowired
    public ParamController(RadiusRepository radiusRepository, TypeRepository typeRepository, UserRepository userRepository, StatusRepository statusRepository){
        this.radiusRepository = radiusRepository;
        this.typeRepository = typeRepository;
        this.userRepository = userRepository;
        this.statusRepository = statusRepository;
    }
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    @GetMapping("/radius")
    public List getRiuses(){
        return radiusRepository.findAll();
    }
    @GetMapping("/type")
    public List getTypes(){
        return typeRepository.findAll();
    }
    @GetMapping("/radius/{id}")
    public Radius getRiusesId(@PathVariable Long id){
        return radiusRepository.findById(id).get();
    }
    @GetMapping("/type/{id}")
    public Type getTypesId(@PathVariable Long id){
        return typeRepository.findById(id).get();
    }
    @PostMapping("/register")
    public void regClient(@RequestBody User user){
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
    }
    @GetMapping("/stat")
    public Status st(){
       return statusRepository.getByStatus("Создана");
    }

}
