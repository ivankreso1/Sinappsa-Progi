package com.example.projekt.rest;

import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.service.OglasService;
import com.example.projekt.service.RegKorisnikService;
import com.example.projekt.service.RequestDeniedException;
import com.example.projekt.service.impl.RegKorisnikServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/korisnik")
public class RegKorisnikController {

    @Autowired
    private RegKorisnikService regKorisnikService;

    @Autowired
    private OglasService oglasService;

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

    @GetMapping("podaci/{id}")
    public MyProfileDTO dohvatiPodatkeProfila(@PathVariable("id") Long id, @AuthenticationPrincipal User u) {
        MyProfileDTO myProfileDTO = new MyProfileDTO();

        if(u == null) {
            throw new RequestDeniedException("Ne postoje podaci o autentikaciji");
        }

        Optional<RegistriraniKorisnik> korisnikPrekoId = regKorisnikService.findById(id);
        Optional<RegistriraniKorisnik> korisnikPrekoAutentikacije = regKorisnikService.findByKorisnickoIme(u.getUsername());

        if(korisnikPrekoId.isEmpty()) {
            throw new RequestDeniedException("Nema korisnika sa id-om: " + id);
        }
        if(korisnikPrekoAutentikacije.isEmpty()) {
            throw new RequestDeniedException("Ne postoje podaci o autentikaciji");
        }
        if(!korisnikPrekoAutentikacije.get().equals(korisnikPrekoId.get())) {
            throw new RequestDeniedException("Moze se pristupiti samo svojim podacima.");
        }
        myProfileDTO.setRegistriraniKorisnik(korisnikPrekoId.get());
        myProfileDTO.setOglasi(oglasService.dohvatiOglasePoKorisniku(korisnikPrekoId.get()));
        return myProfileDTO;
    }

}
