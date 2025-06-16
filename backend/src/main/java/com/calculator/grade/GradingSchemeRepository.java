package com.calculator.grade;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradingSchemeRepository extends JpaRepository<GradingScheme, Long> {
    List<GradingScheme> findAllByCourse_Id(String courseId);
}