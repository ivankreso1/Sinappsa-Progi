package com.example.projekt.rest;

import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.rest.dto.ChangeKorisnickiPodaciDTO;
import com.example.projekt.rest.dto.CreateRegKorisnikDTO;
import com.example.projekt.rest.dto.LoginDTO;
import com.example.projekt.service.RegKorisnikService;
import com.example.projekt.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
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
    public RegistriraniKorisnik registriraj(@RequestBody CreateRegKorisnikDTO regKorisnikDTO, HttpServletRequest request) throws UnsupportedEncodingException, MessagingException {
        return regKorisnikService.registriraj(regKorisnikDTO.getEmail(),regKorisnikDTO.getKorisnickoIme(), regKorisnikDTO.getIme(), regKorisnikDTO.getPrezime(), regKorisnikDTO.getLozinka(), regKorisnikDTO.getAvatar(), getSiteURL(request));
    }

    @GetMapping("/verify")
    public String verifyUser(@Param("code") String code) {
        if(regKorisnikService.verify(code)) {
            return "Uspješno ste verificirani! Od sada se možete prijaviti u sustav sa svojim korisničkim podacima. \nMožete zatvoriti ovu stranicu.";
        } else {
            return "Nažalost, verifikacija nije uspjela. Ovaj profil je već verificiran ili je kod za verifikaciju pogrešan. \nMožete zatvoriti ovu stranicu. ";
        }
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

    @PostMapping("prijava")
    public RegistriraniKorisnik prijavi(@RequestBody LoginDTO loginDTO) {
        return regKorisnikService.prijavi(loginDTO.getKorisnickoIme(), loginDTO.getLozinka());
    }

    @GetMapping("podaci/{id}")
    public RegistriraniKorisnik dohvatiPodatkeProfila(@PathVariable("id") Long id, @AuthenticationPrincipal User u) {
        if(u == null) {
            throw new RequestDeniedException("Ne postoje podaci o autentikaciji");
        }

        Optional<RegistriraniKorisnik> korisnikPrekoId = regKorisnikService.findById(id);
        Optional<RegistriraniKorisnik> korisnikPrekoAutentikacije = regKorisnikService.findByKorisnickoIme(u.getUsername());
        autentikacijaKorisnika(korisnikPrekoId, korisnikPrekoAutentikacije);

        return korisnikPrekoId.get();
    }

    @PutMapping("/promijeni/username/{id}")
    public RegistriraniKorisnik promijeniKorisnickoIme(@PathVariable("id") Long id, @AuthenticationPrincipal User u, @RequestBody ChangeKorisnickiPodaciDTO changeKorisnickiPodaciDTO) {
        String novoKorisnickoIme = changeKorisnickiPodaciDTO.getNovoKorisnickoIme();

        if(u == null) {
            throw new RequestDeniedException("Ne postoje podaci o autentikaciji");
        }
        if(novoKorisnickoIme == null) {
            throw new RequestDeniedException("Nije upisano novo korisničko ime");
        }

        Optional<RegistriraniKorisnik> korisnikPrekoId = regKorisnikService.findById(id);
        Optional<RegistriraniKorisnik> korisnikPrekoAutentikacije = regKorisnikService.findByKorisnickoIme(u.getUsername());
        Optional<RegistriraniKorisnik> vecPostojeceKorisnickoImeKorisnik = regKorisnikService.findByKorisnickoIme(novoKorisnickoIme);

        autentikacijaKorisnika(korisnikPrekoId, korisnikPrekoAutentikacije);

        if(vecPostojeceKorisnickoImeKorisnik.isPresent()) {
            throw new RequestDeniedException("Korisnicko ime " + novoKorisnickoIme + " je već zauzeto");
        }

        return regKorisnikService.promijeniKorisnickoIme(korisnikPrekoId.get(), novoKorisnickoIme);
    }

    @PutMapping("/promijeni/lozinka/{id}")
    public RegistriraniKorisnik promijeniLozinku(@PathVariable("id") Long id, @AuthenticationPrincipal User u, @RequestBody ChangeKorisnickiPodaciDTO changeKorisnickiPodaciDTO) {
        String novaLozinka = changeKorisnickiPodaciDTO.getNovaLozinka();

        if(u == null) {
            throw new RequestDeniedException("Ne postoje podaci o autentikaciji");
        }
        if(novaLozinka == null) {
            throw new RequestDeniedException("Nije upisana nova lozinka");
        }
        if(novaLozinka.length() < 5) {
            throw new RequestDeniedException("Lozinka mora imati bar 5 znakova");
        }

        Optional<RegistriraniKorisnik> korisnikPrekoId = regKorisnikService.findById(id);
        Optional<RegistriraniKorisnik> korisnikPrekoAutentikacije = regKorisnikService.findByKorisnickoIme(u.getUsername());
        autentikacijaKorisnika(korisnikPrekoId, korisnikPrekoAutentikacije);


        return regKorisnikService.promijeniLozinku(korisnikPrekoId.get(), novaLozinka);
    }

    @PutMapping("/promijeni/avatar/{id}")
    public RegistriraniKorisnik promijeniAvatar(@PathVariable("id") Long id, @AuthenticationPrincipal User u, @RequestBody ChangeKorisnickiPodaciDTO changeKorisnickiPodaciDTO) {
        String noviAvatar = changeKorisnickiPodaciDTO.getNoviAvatar();

        if(u == null) {
            throw new RequestDeniedException("Ne postoje podaci o autentikaciji");
        }
        if(noviAvatar == null) {
            throw new RequestDeniedException("Nije izabran novi avatar");
        }

        Optional<RegistriraniKorisnik> korisnikPrekoId = regKorisnikService.findById(id);
        Optional<RegistriraniKorisnik> korisnikPrekoAutentikacije = regKorisnikService.findByKorisnickoIme(u.getUsername());
        autentikacijaKorisnika(korisnikPrekoId, korisnikPrekoAutentikacije);

        return regKorisnikService.promijeniAvatar(korisnikPrekoId.get(), noviAvatar);
    }

    private void autentikacijaKorisnika(Optional<RegistriraniKorisnik> korisnikPrekoId, Optional<RegistriraniKorisnik> korisnikPrekoAutentikacije) {
        if(korisnikPrekoId.isEmpty()) {
            throw new RequestDeniedException("Nema korisnika sa tim id-om");
        }
        if(korisnikPrekoAutentikacije.isEmpty()) {
            throw new RequestDeniedException("Ne postoje podaci o autentikaciji");
        }
        if(!korisnikPrekoAutentikacije.get().equals(korisnikPrekoId.get())) {
            throw new RequestDeniedException("Moze se pristupiti samo svojim podacima.");
        }
    }
}
