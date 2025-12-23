package com.calculator.grade.dto;

import java.util.ArrayList;
import java.util.List;

import com.calculator.grade.model.GradingScheme;

public class GradingSchemeDTO {
    private String id;
    private List<SectionDTO> sections;
    private String courseName;

    public GradingSchemeDTO(String name){
        this.courseName = name;
        sections = new ArrayList<SectionDTO>();
    }

    public GradingSchemeDTO(String name, List<SectionDTO> sections){
        this.courseName = name;
        this.sections = sections;
    }

    public GradingSchemeDTO(GradingScheme scheme){
        this.id = scheme.getId().toString();
        this.sections = scheme.getSections()
                         .stream()
                         .map(SectionDTO::new)
                         .toList();
        this.courseName = scheme.getCourse().getId();
    }

    public GradingSchemeDTO(){};

    public void setSections(List<SectionDTO> sections){
        this.sections = sections;
    }

    public void setId(String id){
        this.id = id;
    }

    public void setCourseName(String name){this.courseName = name;}
    
    public void addSection(SectionDTO newSection){
        sections.add(newSection);
    }

    public String getCourseName(){
        return courseName;
    }

    public List<SectionDTO> getSections() {
        return sections;
    }

    public String getId(){
        return id;
    }
}
