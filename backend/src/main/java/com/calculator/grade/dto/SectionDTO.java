package com.calculator.grade.dto;

import com.calculator.grade.model.Section;

public class SectionDTO {
    private String name;
    private String weight;
    private String id;

     public SectionDTO(String name, double weight){
        this.name = name;
        this.weight = ""+weight;
     }

     public SectionDTO(Section section){
      this.name = section.getName();
      this.weight = ""+section.getWeight();
      this.id = section.getId().toString();
     }

     public SectionDTO(){
      this.name = null;
      this.weight = null;
      this.id = null;
     }

     public void setName(String name){this.name = name;}

     public void setWeight(String weight){this.weight = weight;}

     public void setId(String id){this.id = id;}

     public String getName(){return name;}

     public String getWeight(){return weight;}

     public String getId(){return id;}
}
