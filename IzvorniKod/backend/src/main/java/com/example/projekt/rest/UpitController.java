package com.example.projekt.rest;

import com.example.projekt.domain.*;
import com.example.projekt.service.OglasService;
import com.example.projekt.service.RegKorisnikService;
import com.example.projekt.service.RequestDeniedException;
import com.example.projekt.service.UpitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/upiti")
public class UpitController {

    @Autowired
    private UpitService upitService;
    @Autowired
    private RegKorisnikService regKorisnikService;
    @Autowired
    private OglasService oglasService;

    @GetMapping("autorUpita/{idAutoraUpita}")
    public List<Upit> getUpitByKreator(@PathVariable("idAutoraUpita") Long idAutoraUpita) {
        Optional<RegistriraniKorisnik> registriraniKorisnik = regKorisnikService.findById(idAutoraUpita);
        return upitService.listUpitByKreator(registriraniKorisnik.get());
    }
    /*
    @GetMapping("autorUpita/{idOglasa}")
    public List<Upit> getUpitByOglas(@PathVariable("idOglasa") Long idOglasa) {
        Optional<Oglas> oglas = oglasService.findById(idOglasa);
        return upitService.listUpitByOglas(oglas.get());
    }
    */
    @PostMapping("{idAutoraUpita}/{idOglasa}")
    public Upit postUpit(@PathVariable("idAutoraUpita") Long idAutoraUpita, @PathVariable("idOglasa") Long idOglasa, @RequestBody CreateUpitDTO createUpitDTO) {
        Optional<RegistriraniKorisnik> registriraniKorisnik = regKorisnikService.findById(idAutoraUpita);
        if(registriraniKorisnik.isEmpty()) {
            throw new RequestDeniedException("Nema korisnika sa id-om: " + idAutoraUpita);
        }
        /*
        Optional<Oglas> oglas = oglasService.findById(idOglasa);
        if(oglas.isEmpty()) {
            throw new RequestDeniedException("Nema oglasa sa id-om: " + idOglasa);
        }
        */
        Oglas oglas = null;
        return upitService.objaviUpit(createUpitDTO.getPoruka(), registriraniKorisnik.get(), oglas); //oglas.get()
                                                                        // u oglas se treba napravit getOglasById(idOglasa)
    }
}
