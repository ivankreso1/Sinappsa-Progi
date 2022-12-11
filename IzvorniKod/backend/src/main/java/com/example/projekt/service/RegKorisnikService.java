package com.example.projekt.service;

import com.example.projekt.domain.RegistriraniKorisnik;
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

    public boolean verify(String verificationCode);

    RegistriraniKorisnik promijeniKorisnickoIme(RegistriraniKorisnik registriraniKorisnik, String novoKorisnickoIme);

    RegistriraniKorisnik promijeniLozinku(RegistriraniKorisnik registriraniKorisnik, String novaLozinka);

    RegistriraniKorisnik promijeniAvatar(RegistriraniKorisnik registriraniKorisnik, String noviAvatar);
}
