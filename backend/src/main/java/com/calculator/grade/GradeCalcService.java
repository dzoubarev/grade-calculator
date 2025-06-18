package com.calculator.grade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class GradeCalcService {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private GradingSchemeRepository gradingSchemeRepository;


    public List<GradingSchemeDTO> getCourseScheme(String courseId){
        return gradingSchemeRepository.findAllByCourse_Id(courseId).stream().map(GradingSchemeDTO::new).toList();
    }

    @Transactional
    public Course addCourse(Course course){
        return courseRepository.save(course);
    }

    public boolean getCourse(String courseId){
        return courseRepository.findById(courseId).isPresent();
    }
}
