package com.cour.backserver.entity;

import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "cart_service")
@NoArgsConstructor
public class Cart_service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "request")
    private Integer request;

    @JoinColumn(name = "serv")
    @ManyToOne
    private Service service;

    @Column(name = "cost")
    private Double cost;


}
