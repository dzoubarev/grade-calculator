package com.calculator.grade;

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

     public String getName(){return name;}

     public String getWeight(){return weight;}

     public String getId(){return id;}
}
