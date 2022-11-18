package com.example.projekt.service;

import com.example.projekt.domain.Oglas;
import com.example.projekt.domain.RegistriraniKorisnik;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OglasService {

    List<Oglas> listSveOglase();

    Oglas objaviOglas(Oglas oglas);

    List<Oglas> dohvatiOglasePoKorisniku(RegistriraniKorisnik registriraniKorisnik);
}
