package com.calculator.grade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.calculator.grade.model.Admin;

@Repository
public interface LoginRepository extends JpaRepository<Admin, String> {
}
