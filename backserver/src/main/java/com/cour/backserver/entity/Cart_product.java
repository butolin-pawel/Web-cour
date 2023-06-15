package com.cour.backserver.entity;

import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "cart_product")
@NoArgsConstructor
public class Cart_product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "request")
    private Integer request;

    @JoinColumn(name = "product")
    @ManyToOne
    private Product product;

    @Column(name = "count")
    private Integer count;

    @Column(name = "productradius")
    private Integer productradius;

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

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getProductradius() {
        return productradius;
    }

    public void setProductradius(Integer productradius) {
        this.productradius = productradius;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }
}
