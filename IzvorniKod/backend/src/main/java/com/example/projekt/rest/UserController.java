package com.example.projekt.rest;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "https://sheeshmishi-fe.onrender.com")
@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping
    public User getCurrentUser(@AuthenticationPrincipal User user) {
        return user;
    }
}