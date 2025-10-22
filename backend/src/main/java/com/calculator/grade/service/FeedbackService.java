package com.calculator.grade.service;

import org.springframework.stereotype.Service;

import com.calculator.grade.dto.Feedback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class FeedbackService {
    @Autowired
    private JavaMailSender emailSender;


    public String sendFeedback(Feedback feedback){

        try{
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("gradecalc.dev@gmail.com");
            message.setSubject(feedback.getCategory());
            message.setText(feedback.getFeedback());

            emailSender.send(message);
            return "Feedback sent successfully!";
        }
        catch (Exception e) {
            throw new RuntimeException("Failed to send feedback: " + e.getMessage(), e);
        }
    }
}
