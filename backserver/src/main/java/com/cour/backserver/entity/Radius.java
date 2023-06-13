package com.cour.backserver.entity;

import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "wheel_radius")
@Entity
@NoArgsConstructor
public class Radius {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "radius")
    private String radius;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRadius() {
        return radius;
    }

    public void setRadius(String radius) {
        this.radius = radius;
    }
}
