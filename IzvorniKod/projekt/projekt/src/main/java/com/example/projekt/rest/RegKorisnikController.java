package com.example.projekt.rest;

import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.service.RegKorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/placeholder")
public class RegKorisnikController {

    @Autowired
    private RegKorisnikService regKorisnikService;

}
