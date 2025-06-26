package com.calculator.grade;

public class Feedback {
    private String feedback;
    private String category;

    public Feedback(){};

    public void setFeedback(String feedback){this.feedback = feedback;}
    public void setCategory(String category){this.category = category;}

    public String getFeedback(){return feedback;}
    public String getCategory(){return category;}
}
