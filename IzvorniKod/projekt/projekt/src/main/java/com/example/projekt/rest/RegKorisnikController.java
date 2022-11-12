package com.example.projekt.rest;

import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.service.RegKorisnikService;
import com.example.projekt.service.impl.RegKorisnikServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/korisnik")
public class RegKorisnikController {

    @Autowired
    private RegKorisnikService regKorisnikService;

    @GetMapping
    public List<RegistriraniKorisnik> getKorisnike() {
        return regKorisnikService.dohvatiKorisnike();
    }

    @PostMapping("registracija")
    public RegistriraniKorisnik registriraj(@RequestBody CreateRegKorisnikDTO regKorisnikDTO) {
        return regKorisnikService.registriraj(regKorisnikDTO.getEmail(),regKorisnikDTO.getKorisnickoIme(), regKorisnikDTO.getIme(), regKorisnikDTO.getPrezime(), regKorisnikDTO.getLozinka(), regKorisnikDTO.getAvatar());
    }

    @PostMapping("prijava")
    public RegistriraniKorisnik prijavi(@RequestBody LoginDTO loginDTO) {
        return regKorisnikService.prijavi(loginDTO.getKorisnickoIme(), loginDTO.getLozinka());
    }

}
