package com.calculator.grade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.calculator.grade.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course,String> {
    
}
