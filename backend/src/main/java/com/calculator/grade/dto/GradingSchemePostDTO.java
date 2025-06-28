package com.calculator.grade.dto;

import java.util.List;

public class GradingSchemePostDTO {
    private String courseId;
    private List<SectionDTO> sections;
    private String name;

    public GradingSchemePostDTO(){}

    public void setSections(List<SectionDTO> sections){
        this.sections = sections;
    }
    
    public void setCourseId(String courseId){this.courseId = courseId;}

    public void setName(String name){this.name = name;}

    public void addSection(SectionDTO newSection){
        sections.add(newSection);
    }

    public String getName(){
        return name;
    }

    public List<SectionDTO> getSections() {
        return sections;
    }

    public String getCourseId() {
        return this.courseId;
    }
}
