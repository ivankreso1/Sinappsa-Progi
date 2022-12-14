package com.example.projekt.service;

import com.example.projekt.domain.*;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;

@Service
public interface UpitService {
    List<Upit> listUpitByKreator(RegistriraniKorisnik registriraniKorisnik);
    List<Upit> listUpitByOglas(Oglas oglas);
    Upit objaviUpit(String poruka, RegistriraniKorisnik registriraniKorisnik, Oglas oglas) throws MessagingException, UnsupportedEncodingException;
    // List<Upit> getUpiti();
}
