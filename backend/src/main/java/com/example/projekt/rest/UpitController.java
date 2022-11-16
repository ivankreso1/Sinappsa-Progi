package com.example.projekt.rest;

import com.example.projekt.service.UpitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/placeholder")
public class UpitController {

    @Autowired
    private UpitService upitService;
}
