package com.example.projekt.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/placeholder")
public class KolegijController {

    @GetMapping
    public String testirajPut() {
        return "Hello from backend!";
    }
}
