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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRequest() {
        return request;
    }

    public void setRequest(Integer request) {
        this.request = request;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }
}
