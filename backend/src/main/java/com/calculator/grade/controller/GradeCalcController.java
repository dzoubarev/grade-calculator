package com.calculator.grade.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.calculator.grade.dto.GradingSchemeDTO;
import com.calculator.grade.dto.GradingSchemePostDTO;
import com.calculator.grade.model.Course;
import com.calculator.grade.service.GradeCalcService;


@RequestMapping("/api")
@RestController
public class GradeCalcController{
    @Autowired
    private GradeCalcService gradeCalcService;

    @PostMapping("/course")
    public ResponseEntity<Course> addCourse(@RequestBody Course course){
        Course saved = gradeCalcService.addCourse(course);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/scheme/{courseId}")
    public List<GradingSchemeDTO> getCourseScheme(@PathVariable("courseId") String courseId){
        return gradeCalcService.getCourseScheme(courseId);
    }

    @GetMapping("/course/{courseId}")
    public boolean courseExistsInDB(@PathVariable("courseId") String courseId){
        return gradeCalcService.getCourse(courseId);
    }

    @PostMapping("/scheme")
    public ResponseEntity<GradingSchemeDTO> addScheme(@RequestBody GradingSchemePostDTO scheme){
        GradingSchemeDTO saved = new GradingSchemeDTO(gradeCalcService.addScheme(scheme));
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}