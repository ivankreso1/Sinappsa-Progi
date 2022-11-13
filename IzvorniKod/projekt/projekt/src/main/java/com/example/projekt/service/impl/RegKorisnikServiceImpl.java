package com.example.projekt.service.impl;

import com.example.projekt.dao.RegKorisnikRepository;
import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.service.RegKorisnikService;
import com.example.projekt.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegKorisnikServiceImpl implements RegKorisnikService {

    @Autowired
    private RegKorisnikRepository regKorisnikRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Optional<RegistriraniKorisnik> findById(Long id) {
        return regKorisnikRepository.findById(id);
    }

    @Override
    public List<RegistriraniKorisnik> dohvatiKorisnike() {
        return regKorisnikRepository.findAll();
    }

    @Override
    public RegistriraniKorisnik prijavi(String korisnickoIme, String lozinka) {
        Optional<RegistriraniKorisnik> registriraniKorisnik = regKorisnikRepository.findByKorisnickoIme(korisnickoIme);
        if(korisnickoIme == null || lozinka == null || korisnickoIme.isEmpty() || lozinka.isEmpty()) {
            throw new RequestDeniedException("Moraju biti upisana oba podatka");
        }
        if(registriraniKorisnik.isEmpty()) {
            throw new RequestDeniedException("Ne postoji korisnik s korisnickim imenom: " + korisnickoIme);
        }
        if(!passwordEncoder.matches(lozinka, registriraniKorisnik.get().getLozinka())) {
            throw new RequestDeniedException("Pogresna lozinka");
        }
        return registriraniKorisnik.get();
    }

    @Override
    public RegistriraniKorisnik registriraj(String email, String korisnickoIme, String ime, String prezime, String lozinka, String avatar) {
        // validacija
        if(email == null || korisnickoIme == null || ime == null || prezime == null || lozinka == null || avatar == null) {
            throw new RequestDeniedException("Sva polja moraju biti ispunjena");
        }
        if(email.isEmpty() || korisnickoIme.isEmpty() || ime.isEmpty() || prezime.isEmpty() || lozinka.isEmpty() || avatar.isEmpty()) {
            throw new RequestDeniedException("Polja ne smiju biti prazna");
        }
        if(regKorisnikRepository.existsByEmail(email)) {
            throw new RequestDeniedException("Ova e-mail adresa je vec iskoristena.");
        }
        if(regKorisnikRepository.existsByKorisnickoIme(korisnickoIme)) {
            throw new RequestDeniedException("Ovo korisnicko ime je vec zauzeto.");
        }
        if(!email.endsWith("@fer.hr")) {
            throw new RequestDeniedException("E-mail adresa " + email + " nije iz FER-ove domene.");
        }

        String hashLozinka = passwordEncoder.encode(lozinka);

        return regKorisnikRepository.save(new RegistriraniKorisnik(email, korisnickoIme, ime, prezime, hashLozinka, avatar));
    }

    @Override
    public Optional<RegistriraniKorisnik> findByKorisnickoIme(String korisnickoIme) {
        return regKorisnikRepository.findByKorisnickoIme(korisnickoIme);
    }
}
