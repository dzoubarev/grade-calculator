package com.calculator.grade.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.calculator.grade.dto.GradingSchemeDTO;
import com.calculator.grade.dto.GradingSchemePostDTO;
import com.calculator.grade.dto.SectionDTO;
import com.calculator.grade.model.Course;
import com.calculator.grade.model.GradingScheme;
import com.calculator.grade.model.Section;
import com.calculator.grade.repository.CourseRepository;
import com.calculator.grade.repository.GradingSchemeRepository;

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

    @Transactional
    public GradingScheme addScheme(GradingSchemePostDTO scheme){
        Course course = courseRepository.findById(scheme.getCourseId())
        .orElseThrow(() -> new IllegalArgumentException("Course not found: " + scheme.getCourseId()));

        GradingScheme newScheme = new GradingScheme();
        newScheme.setName(scheme.getName());
        newScheme.setCourse(course);

        List<Section> sectionEntities = new ArrayList<>();
        for (SectionDTO dto : scheme.getSections()) {
            Section section = new Section();
            section.setName(dto.getName());
            section.setScheme(newScheme);
            section.setWeight(Double.parseDouble(dto.getWeight()));
            sectionEntities.add(section);
        }

        newScheme.setSections(sectionEntities);
        return gradingSchemeRepository.save(newScheme);
    }
}
