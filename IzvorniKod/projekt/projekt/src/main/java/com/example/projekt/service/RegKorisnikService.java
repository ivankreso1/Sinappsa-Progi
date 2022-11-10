package com.example.projekt.service;

import com.example.projekt.domain.RegistriraniKorisnik;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RegKorisnikService {
    RegistriraniKorisnik registriraj(String email, String korisnickoIme, String ime, String prezime, String lozinka, String avatar);

    List<RegistriraniKorisnik> dohvatiKorisnike();
}
