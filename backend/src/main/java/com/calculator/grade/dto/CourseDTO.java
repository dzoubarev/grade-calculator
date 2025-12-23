package com.calculator.grade.dto;

import com.calculator.grade.model.Course;

public class CourseDTO {
    private String name;
    private String id;

    public CourseDTO(){}

    public CourseDTO(String name, String id){
        this.name = name;
        this.id = id;
    }

    public CourseDTO(Course course){
        this.name = course.getName();
        this.id = course.getId();
    }

    public String getName(){return this.name;}

    public String getId(){return this.id;}

    public void setId(String id){this.id = id;}

    public void setName(String name){this.name = name;}

}
