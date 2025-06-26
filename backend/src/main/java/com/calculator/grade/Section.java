package com.calculator.grade;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Section {
    @Id
    @GeneratedValue
    private UUID id;

    private String name;           
    private double weight;

    @ManyToOne
    @JoinColumn(name = "scheme_id")
    private GradingScheme gradingScheme;

    public Section(){
        name = null;
        weight = 0;
        gradingScheme = null;
    }

    public void setScheme(GradingScheme gradingScheme){this.gradingScheme = gradingScheme;}

    public void setName(String name){this.name = name;}

    public GradingScheme getScheme(){ return gradingScheme; }

    public String getName(){ return name; }

    public void setWeight(double weight){ this.weight = weight;}

    public double getWeight(){ return weight; }

    public UUID getId(){ return id; }
}
