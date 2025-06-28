package com.calculator.grade.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Course {
    @Id
    private String id;

    private String name;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<GradingScheme> gradingSchemes;

    public Course(){
        id = null;
        name = null;
    }

    public String getId(){return id;}

    public String getName(){return name;}

    public List<GradingScheme> getGradingSchemes(){
        return gradingSchemes;
    }

    public void setId(String id) { this.id = id; }

    public void setName(String name) { this.name = name; }

    public void setGradingSchemes(List<GradingScheme> gradingSchemes) {
        this.gradingSchemes = gradingSchemes;
    }
}
