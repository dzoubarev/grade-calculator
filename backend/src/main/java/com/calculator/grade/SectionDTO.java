package com.calculator.grade;

public class SectionDTO {
    private String name;
    private double weight;

     public SectionDTO(String name, double weight){
        this.name = name;
        this.weight = weight;
     }

     public SectionDTO(Section section){
      this.name = section.getName();
      this.weight = section.getWeight();
     }

     public String getName(){return name;}

     public double getWeight(){return weight;}
}
