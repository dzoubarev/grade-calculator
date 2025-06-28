package com.calculator.grade.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.calculator.grade.dto.LoginRequest;
import com.calculator.grade.service.JWTService;
import com.calculator.grade.service.LoginService;

@RequestMapping("/api")
@RestController
public class LoginController {
    @Autowired
    private LoginService loginService;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/auth/login")
    public ResponseEntity<?> processLogin(@RequestBody LoginRequest loginRequest){
       UserDetails user =  loginService.loadUserByUsername(loginRequest.getUsername());

       if (!encoder.matches(loginRequest.getPassword(), user.getPassword())) {
        return ResponseEntity.status(401).body("Invalid login");
        }

       String token = jwtService.generateToken(user);
       return ResponseEntity.ok(Map.of("token", token));
    }
}
