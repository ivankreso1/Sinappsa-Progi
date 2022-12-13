package com.example.projekt.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import com.example.projekt.domain.*;
import com.example.projekt.rest.dto.CreateOglasDTO;
import com.example.projekt.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.projekt.service.KolegijService;
import com.example.projekt.service.OglasService;
import com.example.projekt.service.RegKorisnikService;

@RestController
@RequestMapping("/oglasi")
public class OglasController {

    @Autowired
    private OglasService oglasService;

    @Autowired
    private RegKorisnikService regKorisnikService;

    @Autowired
    private KolegijService kolegijService;

    @GetMapping
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
            throw new RequestDeniedException("Ne postoji oglas s id = " + id);
        } else {
            return oglas.get();
        }
    }

    @PostMapping
    public ResponseEntity<Void> objaviOglas (@RequestBody CreateOglasDTO oglas) throws URISyntaxException{
        oglasService.objaviOglas(toOglasEntity(oglas));
        return ResponseEntity.created(new URI("/oglasi")).build(); // redirecta na oglase
    }

    public Oglas toOglasEntity(CreateOglasDTO oglas) {
        RegistriraniKorisnik regKorisnik = new RegistriraniKorisnik();
        Kolegij kolegij = new Kolegij();

        regKorisnik = regKorisnikService.findById(oglas.getKreator_id()).get();
        kolegij = kolegijService.findByImeKolegija(oglas.getKolegij_ime()).get();
        return new Oglas(oglas.getNaslov(), oglas.getOpis(), kolegij, oglas.getKategorija(), regKorisnik, true,
                oglas.isTrazimPomoc());
    }
}
