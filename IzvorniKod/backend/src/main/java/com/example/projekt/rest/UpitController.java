package com.example.projekt.rest;

import com.example.projekt.domain.*;
import com.example.projekt.rest.dto.CreateUpitDTO;
import com.example.projekt.service.OglasService;
import com.example.projekt.service.RegKorisnikService;
import com.example.projekt.service.RequestDeniedException;
import com.example.projekt.service.UpitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
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

//    @GetMapping()
//    public List<Upit> getUpiti() {
//        return upitService.getUpiti();
//    }

    @GetMapping("autorUpita/{idAutoraUpita}")
    public List<Upit> getUpitByKreator(@PathVariable("idAutoraUpita") Long idAutoraUpita) {
        Optional<RegistriraniKorisnik> registriraniKorisnik = regKorisnikService.findById(idAutoraUpita);
        if(registriraniKorisnik.isEmpty()) {
            throw new RequestDeniedException("Nema korisnika sa id-om: " + idAutoraUpita);
        }
        return upitService.listUpitByKreator(registriraniKorisnik.get());
    }

    @GetMapping("odOglasa/{idOglasa}")
    public List<Upit> getUpitByOglas(@PathVariable("idOglasa") Long idOglasa) {
        Optional<Oglas> oglas = oglasService.dohvatiOglasPoId(idOglasa);
        if(oglas.isEmpty()) {
            throw new RequestDeniedException("Nema oglasa sa id-om: " + idOglasa);
        }
        return upitService.listUpitByOglas(oglas.get());
    }

    @PostMapping("{idAutoraUpita}/{idOglasa}")
    @ResponseStatus(HttpStatus.CREATED)
    public Upit postUpit(@PathVariable("idAutoraUpita") Long idAutoraUpita, @PathVariable("idOglasa") Long idOglasa, @RequestBody CreateUpitDTO createUpitDTO) throws MessagingException, UnsupportedEncodingException {
        Optional<RegistriraniKorisnik> registriraniKorisnik = regKorisnikService.findById(idAutoraUpita);
        if(registriraniKorisnik.isEmpty()) {
            throw new RequestDeniedException("Nema korisnika sa id-om: " + idAutoraUpita);
        }

        Optional<Oglas> oglas = oglasService.dohvatiOglasPoId(idOglasa);
        if(oglas.isEmpty()) {
            throw new RequestDeniedException("Nema oglasa sa id-om: " + idOglasa);
        }

        return upitService.objaviUpit(createUpitDTO.getPoruka(), registriraniKorisnik.get(), oglas.get());
    }

    @PutMapping("{idUpita}/novoStanje")
    public Upit putNovoStanje(@PathVariable("idUpita") Long idUpita, @RequestParam("stanjeUpita") StanjeUpita stanjeUpita) {
        Optional<Upit> upit = upitService.dohvatiUpitPoId(idUpita);
        if (upit.isEmpty()) {
            throw new RequestDeniedException("Nema upita sa id-om: " + idUpita);
        }
        return upitService.promjeniStanjeUpita(upit.get(), stanjeUpita);
    }
}
