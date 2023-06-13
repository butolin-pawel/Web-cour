package com.cour.backserver.entity;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.databind.JsonNode;
import javax.persistence.*;

import com.fasterxml.jackson.databind.json.JsonMapper;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.JSONArray;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import java.util.*;

@Table(name = "product")
@Entity
@NoArgsConstructor
@TypeDef(name = "json", typeClass = JsonStringType.class)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "name")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "maker")
    private String maker;


//    @Column(name = "characters")
//    @Type( type = "json" )
//    private HashMap<String,String> characters ;
      @Column(name = "characters")
    private String characters ;

      @Column(name = "height")
      private String height;

      @OneToMany(mappedBy = "product")
      private Set<ProductRadius> product_radius;

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public Set<ProductRadius> getRadiuses() {
        return product_radius;
    }

    public void setRadiuses(Set<ProductRadius> radiuses) {
        this.product_radius = radiuses;
    }

    public String getMaker() {
        return maker;
    }

    public void setMaker(String maker) {
        this.maker = maker;
    }



    public String getCharacters() {
        return characters;
    }

    public void setCharacters(String characters) {
        this.characters = characters;
    }

    @Column(name = "cost")
    private double cost;

//    public Map<String,String> getCharacters() {
//        return characters;
//    }
//
//    public void setCharacters(Map<String,String> characters) {
//        this.characters = characters;
//    }



    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
