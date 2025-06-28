package com.calculator.grade.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class GradingScheme {
    @Id
    @GeneratedValue
    private UUID id;

    private String name;           

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToMany(mappedBy = "gradingScheme", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Section> sections = new ArrayList<>();

    public GradingScheme(){
        name = null;
        course = null;
    }

    public void  setId(UUID id) {this.id = id;}

    public void  setName(String name) {this.name = name;}

    public void  setSections(List<Section> sections) {this.sections = sections;}

    public void setCourse(Course course){this.course = course;}

    public Course getCourse(){return course;}

    public String getName(){
        return name;
    }

    public List<Section> getSections(){ return sections;}
}