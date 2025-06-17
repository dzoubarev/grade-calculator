package com.calculator.grade;

public class SectionDTO {
    private String name;
    private double weight;
    private String id;

     public SectionDTO(String name, double weight){
        this.name = name;
        this.weight = weight;
     }

     public SectionDTO(Section section){
      this.name = section.getName();
      this.weight = section.getWeight();
      this.id = section.getId().toString();
     }

     public String getName(){return name;}

     public double getWeight(){return weight;}

     public String getId(){return id;}
}
