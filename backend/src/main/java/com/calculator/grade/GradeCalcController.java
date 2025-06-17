package com.calculator.grade;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
@RestController
public class GradeCalcController{
    @Autowired
    private GradeCalcService gradeCalcService;

    @GetMapping("/scheme/{courseId}")
    public List<GradingSchemeDTO> getCourseScheme(@PathVariable("courseId") String courseId){
        return gradeCalcService.getCourseScheme(courseId);
    }
}