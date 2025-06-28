package com.calculator.grade.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.calculator.grade.dto.Feedback;
import com.calculator.grade.service.FeedbackService;


@RequestMapping("/api")
@RestController
public class FeedbackController{
    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/sendFeedback")
    public String addCourse(@RequestBody Feedback feedback){
        String status = feedbackService.sendFeedback(feedback);
        return status;
    }
}
