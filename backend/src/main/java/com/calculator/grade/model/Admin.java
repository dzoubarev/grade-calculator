package com.calculator.grade.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Admin {
    @Id
    private String username;

    private String password;

    public Admin(){};

    public String getUsername(){return username;}
    public String getPassword(){return password;}

    public void setUsername(String username){this.username = username;}
    public void setPassword(String password){this.password = password;}
}
