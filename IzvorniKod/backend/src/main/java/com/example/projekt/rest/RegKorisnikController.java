package com.example.projekt.rest;

import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.rest.dto.ChangeKorisnickiPodaciDTO;
import com.example.projekt.rest.dto.CreateRegKorisnikDTO;
import com.example.projekt.rest.dto.LoginDTO;
import com.example.projekt.rest.dto.RangiraniKorisnikDTO;
import com.example.projekt.service.NotFoundException;
import com.example.projekt.service.RegKorisnikService;
import com.example.projekt.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

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
    @Secured("ROLE_STUDENT_KORISNIK")
    public RegistriraniKorisnik dohvatiPodatkeProfila(@PathVariable("id") Long id, @AuthenticationPrincipal User u) {
        Optional<RegistriraniKorisnik> korisnikPrekoId = regKorisnikService.findById(id);
        Optional<RegistriraniKorisnik> korisnikPrekoAutentikacije = regKorisnikService.findByKorisnickoIme(u.getUsername());
        autentikacijaKorisnika(korisnikPrekoId, korisnikPrekoAutentikacije);

        return korisnikPrekoId.get();
    }

    @GetMapping("/rang")
    public List<RangiraniKorisnikDTO> dohvatiNajboljih10() {
        return regKorisnikService.dohvatiNajboljih10();
    }

    @PutMapping("/uredi/{id}")
    @Secured("ROLE_STUDENT_KORISNIK")
    public RegistriraniKorisnik promijeniPodatke(@PathVariable("id") Long id, @AuthenticationPrincipal User u, @RequestBody ChangeKorisnickiPodaciDTO changeKorisnickiPodaciDTO) {
        String novoKorisnickoIme = changeKorisnickiPodaciDTO.getKorisnickoIme();
        String novaLozinka = changeKorisnickiPodaciDTO.getLozinka();
        String noviAvatar = changeKorisnickiPodaciDTO.getAvatar();

        if(novoKorisnickoIme != null) {
            Optional<RegistriraniKorisnik> vecPostojeceKorisnickoImeKorisnik = regKorisnikService.findByKorisnickoIme(novoKorisnickoIme);
            if(vecPostojeceKorisnickoImeKorisnik.isPresent()) {
                throw new RequestDeniedException("Korisnicko ime " + novoKorisnickoIme + " je već zauzeto");
            }
        }
        if(novaLozinka != null && novaLozinka.length() < 5) {
            throw new RequestDeniedException("Lozinka mora imati bar 5 znakova");
        }

        Optional<RegistriraniKorisnik> korisnikPrekoId = regKorisnikService.findById(id);
        Optional<RegistriraniKorisnik> korisnikPrekoAutentikacije = regKorisnikService.findByKorisnickoIme(u.getUsername());

        autentikacijaKorisnika(korisnikPrekoId, korisnikPrekoAutentikacije);

        return regKorisnikService.promijeniPodatke(korisnikPrekoId.get(), novoKorisnickoIme, novaLozinka, noviAvatar);
    }

    private void autentikacijaKorisnika(Optional<RegistriraniKorisnik> korisnikPrekoId, Optional<RegistriraniKorisnik> korisnikPrekoAutentikacije) {
        if(korisnikPrekoId.isEmpty()) {
            throw new NotFoundException("Nema korisnika sa tim id-om");
        }
        if(korisnikPrekoAutentikacije.isEmpty()) {
            throw new NotFoundException("Ne postoje podaci o autentikaciji");
        }
        if(!korisnikPrekoAutentikacije.get().equals(korisnikPrekoId.get())) {
            throw new RequestDeniedException("Moze se pristupiti samo svojim podacima.");
        }
    }
}
