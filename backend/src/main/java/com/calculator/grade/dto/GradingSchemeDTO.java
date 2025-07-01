package com.calculator.grade.dto;

import java.util.ArrayList;
import java.util.List;

import com.calculator.grade.model.GradingScheme;

public class GradingSchemeDTO {
    private String id;
    private String name;
    private List<SectionDTO> sections;

    public GradingSchemeDTO(String name){
        this.name = name;
        sections = new ArrayList<SectionDTO>();
    }

    public GradingSchemeDTO(String name, List<SectionDTO> sections){
        this.name = name;
        this.sections = sections;
    }

    public GradingSchemeDTO(GradingScheme scheme){
        this.id = scheme.getId().toString();
        this.name = scheme.getName();
        this.sections = scheme.getSections()
                         .stream()
                         .map(SectionDTO::new)
                         .toList();
    }

    public GradingSchemeDTO(){};

    public void setSections(List<SectionDTO> sections){
        this.sections = sections;
    }

    public void setId(String id){
        this.id = id;
    }

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

    public String getId(){
        return id;
    }
}
