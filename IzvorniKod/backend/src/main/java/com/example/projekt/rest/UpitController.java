package com.example.projekt.rest;

import com.example.projekt.domain.*;
import com.example.projekt.rest.dto.CreateOcjenaDTO;
import com.example.projekt.rest.dto.CreateUpitDTO;
import com.example.projekt.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.userdetails.User;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@CrossOrigin(origins = "https://sheeshmishi-fe.onrender.com")
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
    @Secured("ROLE_STUDENT_KORISNIK")
    public List<Upit> getUpitByKreator(@PathVariable("idAutoraUpita") Long idAutoraUpita, @AuthenticationPrincipal User user) {
        if (user == null) {
            throw new RequestDeniedException("Nema podataka o autentikaciji");
        }
        RegistriraniKorisnik korisnikPoUsername = regKorisnikService.findByKorisnickoIme(user.getUsername()).get();
        if (idAutoraUpita != korisnikPoUsername.getId()) {
            throw new RequestDeniedException("Nemate pravo dohvatiti upite");
        }
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
    @Secured("ROLE_STUDENT_KORISNIK")
    public Upit postUpit(@PathVariable("idAutoraUpita") Long idAutoraUpita, @PathVariable("idOglasa") Long idOglasa, @RequestBody CreateUpitDTO createUpitDTO, @AuthenticationPrincipal User user) throws MessagingException, UnsupportedEncodingException {
        if (user == null) {
            throw new RequestDeniedException("Nema podataka o autentikaciji");
        }
        RegistriraniKorisnik korisnikPoUsername = regKorisnikService.findByKorisnickoIme(user.getUsername()).get();
        if (!Objects.equals(idAutoraUpita, korisnikPoUsername.getId())) {
            throw new RequestDeniedException("Nemate pravo objaviti upit");
        }
        Optional<RegistriraniKorisnik> registriraniKorisnik = regKorisnikService.findById(idAutoraUpita);
        if(registriraniKorisnik.isEmpty()) {
            throw new RequestDeniedException("Nema korisnika sa id-om: " + idAutoraUpita);
        }

        Optional<Oglas> oglas = oglasService.dohvatiOglasPoId(idOglasa);
        if(oglas.isEmpty()) {
            throw new RequestDeniedException("Nema oglasa sa id-om: " + idOglasa);
        }
        if (Objects.equals(idAutoraUpita, oglas.get().getKreator().getId())) {
            throw new RequestDeniedException("Ne možete postaviti upit na vlastiti oglas");
        }
        return upitService.objaviUpit(createUpitDTO.getPoruka(), registriraniKorisnik.get(), oglas.get());
    }

    @PutMapping("{idUpita}/novoStanje")
    @Secured("ROLE_STUDENT_KORISNIK")
    public Upit putNovoStanje(@PathVariable("idUpita") Long idUpita, @RequestParam("stanjeUpita") StanjeUpita stanjeUpita, @AuthenticationPrincipal User user) {
        Optional<Upit> upit = upitService.dohvatiUpitPoId(idUpita);
        Oglas oglas = upit.get().getOglas();
        RegistriraniKorisnik korisnikPoUsername = regKorisnikService.findByKorisnickoIme(user.getUsername()).get();
        if (user == null) {
            throw new RequestDeniedException("Nema podataka o autentikaciji");
        }
        if (korisnikPoUsername != oglas.getKreator()) {
            throw new RequestDeniedException("Nemate pravo promijeniti stanje upita");
        }
        if (upit.isEmpty()) {
            throw new RequestDeniedException("Nema upita sa id-om: " + idUpita);
        }
        return upitService.promjeniStanjeUpita(upit.get(), stanjeUpita);
    }

    @PutMapping("/ocijeni")
    @Secured("ROLE_STUDENT_KORISNIK")
    public ResponseEntity<Void> ocijeniStudentPomagaca(@RequestBody CreateOcjenaDTO createOcjenaDTO, @AuthenticationPrincipal User user) {
        if (user == null) {
            throw new RequestDeniedException("Nema podataka o autentikaciji");
        }
        if (upitService.ocijeniStudentPomagaca(createOcjenaDTO, user)) {
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        throw new NotFoundException("Ne postoj upit s id: " + createOcjenaDTO.getIdUpita());
    }
}
