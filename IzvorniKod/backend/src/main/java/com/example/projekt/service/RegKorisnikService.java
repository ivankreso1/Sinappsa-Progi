package com.example.projekt.service;

import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.rest.dto.RangiraniKorisnikDTO;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@Service
public interface RegKorisnikService {
    RegistriraniKorisnik registriraj(String email, String korisnickoIme, String ime, String prezime, String lozinka, String avatar, String siteURL) throws UnsupportedEncodingException, MessagingException;

    List<RegistriraniKorisnik> dohvatiKorisnike();

    Optional<RegistriraniKorisnik> findByKorisnickoIme(String korisnickoIme);

    RegistriraniKorisnik prijavi(String korisnickoIme, String lozinka);

    Optional<RegistriraniKorisnik> findById(Long id);

    boolean verify(String verificationCode);

    List<RangiraniKorisnikDTO> dohvatiNajboljih10();

    RegistriraniKorisnik promijeniPodatke(RegistriraniKorisnik registriraniKorisnik, String novoKorisnickoIme, String novaLozinka, String noviAvatar);

    void ocijeni (RegistriraniKorisnik registriraniKorisnik, int ocjena);
}
