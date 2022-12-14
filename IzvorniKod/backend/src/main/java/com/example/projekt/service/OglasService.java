package com.example.projekt.service;

import com.example.projekt.domain.Kategorija;
import com.example.projekt.domain.Oglas;
import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.domain.Smjer;
import com.example.projekt.rest.dto.CreateOglasDTO;
import com.example.projekt.rest.dto.PutOglasDTO;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface OglasService {

    List<Oglas> listSveOglase();

    List<Oglas> listSvihAktivnihOglasa();

    boolean promijeniOglas(Long id, PutOglasDTO noviOglas, User user);

    boolean objaviOglas(CreateOglasDTO oglas, User user);

    boolean obrisiOglas(Long id, User user);

    List<Oglas> dohvatiOglasePoKorisniku(RegistriraniKorisnik registriraniKorisnik);

    Optional<Oglas> dohvatiOglasPoId(Long id);

    List<Oglas> filtrirajOglase(Smjer smjer, Kategorija kategorija, String kolegij_ime);
}
