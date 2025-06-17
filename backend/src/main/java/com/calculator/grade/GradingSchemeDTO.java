package com.calculator.grade;

import java.util.ArrayList;
import java.util.List;

public class GradingSchemeDTO {
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
        this.name = scheme.getName();
        this.sections = scheme.getSections()
                         .stream()
                         .map(SectionDTO::new)
                         .toList();
    }

    public void addSection(SectionDTO newSection){
        sections.add(newSection);
    }

    public String getName(){
        return name;
    }

    public List<SectionDTO> getSections() {
        return sections;
    }
}
