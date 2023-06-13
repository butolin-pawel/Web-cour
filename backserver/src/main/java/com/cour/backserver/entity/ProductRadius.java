package com.cour.backserver.entity;

import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "product_radius")
@Entity
@NoArgsConstructor
public class ProductRadius {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "product")
    private Integer product;

    @ManyToOne
    @JoinColumn(name = "radius")
    private Radius radius;

    @Column(name = "count")
    private Integer count;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getProduct() {
        return product;
    }

    public void setProduct(Integer product) {
        this.product = product;
    }

    public Radius getRadius() {
        return radius;
    }

    public void setRadius(Radius radius) {
        this.radius = radius;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
