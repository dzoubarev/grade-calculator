package com.calculator.grade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.calculator.grade.model.GradingScheme;

import java.util.List;
import java.util.UUID;

@Repository
public interface GradingSchemeRepository extends JpaRepository<GradingScheme, UUID> {
    List<GradingScheme> findAllByCourse_Id(String courseId);
}