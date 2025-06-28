package com.calculator.grade;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Encrypter {
    public static void main(String[] args){
        String rawPassword = "";
        String hashedPassword = new BCryptPasswordEncoder().encode(rawPassword);
        System.out.println(hashedPassword);
    }
}
