package com.cour.backserver.entity;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name= "request")
@NoArgsConstructor
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "client")
    private Integer client;

    @Column(name = "startdate")
    private LocalDateTime stdate;

    @Column(name = "enddate")
    private LocalDateTime enddate;

    @Column(name = "summ")
    private Double summa;

    @ManyToOne
    @JoinColumn(name = "car_type")
    private Type type;

    @ManyToOne
    @JoinColumn(name = "wheel_radius")
    private Radius radius;

    @ManyToOne
    @JoinColumn(name = "status")
    private Status status;

    @OneToMany(mappedBy = "request")
    private Set<Cart_service> cart_services;
    @OneToMany(mappedBy = "request")
    private Set<Cart_product> cart_products;

    public Set<Cart_product> getCart_products() {
        return cart_products;
    }

    public void setCart_products(Set<Cart_product> cart_products) {
        this.cart_products = cart_products;
    }

    public Set<Cart_service> getCart_services() {
        return cart_services;
    }

    public void setCart_services(Set<Cart_service> cart_services) {
        this.cart_services = cart_services;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getClient() {
        return client;
    }

    public void setClient(Integer client) {
        this.client = client;
    }

    public LocalDateTime getStdate() {
        return stdate;
    }

    public void setStdate(LocalDateTime stdate) {
        this.stdate = stdate;
    }

    public LocalDateTime getEnddate() {
        return enddate;
    }

    public void setEnddate(LocalDateTime enddate) {
        this.enddate = enddate;
    }

    public Double getSumma() {
        return summa;
    }

    public void setSumma(Double summa) {
        this.summa = summa;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Radius getRadius() {
        return radius;
    }

    public void setRadius(Radius radius) {
        this.radius = radius;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
