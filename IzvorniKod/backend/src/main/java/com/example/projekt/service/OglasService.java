package com.example.projekt.service;

import com.example.projekt.domain.Kategorija;
import com.example.projekt.domain.Oglas;
import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.domain.Smjer;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface OglasService {

    List<Oglas> listSveOglase();

    List<Oglas> listSvihAktivnihOglasa();

    Oglas objaviOglas(Oglas oglas);

    List<Oglas> dohvatiOglasePoKorisniku(RegistriraniKorisnik registriraniKorisnik);

    Optional<Oglas> dohvatiOglasPoId(Long id);

    List<Oglas> filtrirajOglase(Smjer smjer, Kategorija kategorija, String kolegij_ime);
}
