package com.calculator.grade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
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
