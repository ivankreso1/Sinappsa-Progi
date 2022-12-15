package com.example.projekt.service;

import com.example.projekt.domain.*;
import com.example.projekt.rest.dto.CreateOcjenaDTO;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@Service
public interface UpitService {
    List<Upit> listUpitByKreator(RegistriraniKorisnik registriraniKorisnik);
    List<Upit> listUpitByOglas(Oglas oglas);
    Upit objaviUpit(String poruka, RegistriraniKorisnik registriraniKorisnik, Oglas oglas) throws MessagingException, UnsupportedEncodingException;
    // List<Upit> getUpiti();
    Optional<Upit> dohvatiUpitPoId(Long id);
    Upit promjeniStanjeUpita(Upit upit, StanjeUpita novoStanjeUpita);
    boolean ocijeniStudentPomagaca(CreateOcjenaDTO createOcjenaDTO, User user);
}
