package com.example.projekt.rest;

import java.util.List;
import java.util.Optional;

import com.example.projekt.domain.*;
import com.example.projekt.rest.dto.CreateOglasDTO;
import com.example.projekt.rest.dto.PutOglasDTO;
import com.example.projekt.service.NotFoundException;
import com.example.projekt.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import com.example.projekt.service.OglasService;

@RestController
@RequestMapping("/oglasi")
public class OglasController {

    @Autowired
    private OglasService oglasService;

    @GetMapping
    @Secured("ROLE_ADMIN")
    public List<Oglas> listOglasi() {
        return oglasService.listSveOglase();
    }

    @GetMapping("/aktivni")
    public List<Oglas> listAktivniOglasi() {
        return oglasService.listSvihAktivnihOglasa();
    }

    @GetMapping("/filter")
    public List<Oglas> filtrirajOglase(@RequestParam(required = false, name = "smjer") Smjer smjer,
                                       @RequestParam(required = false, name = "kategorija") Kategorija kategorija,
                                       @RequestParam(required = false, name = "kolegij") String kolegij) {
        return oglasService.filtrirajOglase(smjer, kategorija, kolegij);
    }

    @GetMapping("/{id}")
    public Oglas dohvatiOglasPoId(@PathVariable Long id) {
        Optional<Oglas> oglas = oglasService.dohvatiOglasPoId(id);
        if (oglas.isEmpty()) {
            throw new NotFoundException("Ne postoji oglas s id: " + id);
        } else {
            return oglas.get();
        }
    }

    @PostMapping
    @Secured("ROLE_STUDENT_KORISNIK")
    public ResponseEntity<Void> objaviOglas (@RequestBody CreateOglasDTO oglas, @AuthenticationPrincipal User user) {
        userNull(user);
        if (oglasService.objaviOglas(oglas, user)) {
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            throw new RequestDeniedException("Neuspješno dodavanje novog oglasa");
        }
    }

    @PutMapping("/{id}")
    @Secured("ROLE_STUDENT_KORISNIK")
    public ResponseEntity<Void> promijeniOglas(@PathVariable Long id, @RequestBody PutOglasDTO noviOglas, @AuthenticationPrincipal User user) {
        userNull(user);
        if (oglasService.promijeniOglas(id, noviOglas, user)) {
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            throw new NotFoundException("Ne postoji oglas s id: " + id);
        }
    }

    @DeleteMapping("/{id}")
    @Secured({"ROLE_STUDENT_KORISNIK", "ROLE_ADMIN"})
    public ResponseEntity<Void> obrisiOglas(@PathVariable Long id, @AuthenticationPrincipal User user) {
        userNull(user);
        if (oglasService.obrisiOglas(id, user)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        throw new NotFoundException("Ne postoji oglas s id: " + id);
    }

    public void userNull (User user) {
        if (user == null) {
            throw new RequestDeniedException("Nema podataka o autentikaciji");
        }
    }
}
