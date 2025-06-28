package com.calculator.grade.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.calculator.grade.model.Admin;
import com.calculator.grade.repository.LoginRepository;

@Service
public class LoginService implements UserDetailsService{
    @Autowired
    private LoginRepository loginRepository;

    public UserDetails loadUserByUsername(String username){
        Admin user = loginRepository.findById(username)
            .orElseThrow(() -> new IllegalArgumentException("Wrong username or password"));
        
        return new org.springframework.security.core.userdetails.User(
            user.getUsername(),
            user.getPassword(),
            List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))
        );
    }
}
