package com.example.projekt.service;

import com.example.projekt.domain.RegistriraniKorisnik;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface RegKorisnikService {
    RegistriraniKorisnik registriraj(String email, String korisnickoIme, String ime, String prezime, String lozinka, String avatar);

    List<RegistriraniKorisnik> dohvatiKorisnike();

    Optional<RegistriraniKorisnik> findByKorisnickoIme(String korisnickoIme);

    RegistriraniKorisnik prijavi(String korisnickoIme, String lozinka);

    Optional<RegistriraniKorisnik> findById(Long id);
}
