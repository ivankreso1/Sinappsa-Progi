package com.example.projekt.service.impl;

import com.example.projekt.dao.OglasRepository;
import com.example.projekt.domain.*;
import com.example.projekt.rest.dto.CreateOglasDTO;
import com.example.projekt.service.KolegijService;
import com.example.projekt.service.OglasService;
import com.example.projekt.service.RegKorisnikService;
import com.example.projekt.service.RequestDeniedException;
import org.springframework.security.core.userdetails.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.function.Predicate;

@Service
public class OglasServiceImpl implements OglasService {

    @Autowired
    private OglasRepository oglasRepository;

    @Autowired
    private RegKorisnikService regKorisnikService;

    @Autowired
    private KolegijService kolegijService;

    @Override
    public List<Oglas> listSveOglase() {
        return oglasRepository.findAll();
    }

    @Override
    public List<Oglas> listSvihAktivnihOglasa() {
        return oglasRepository.findAllByAktivan(true);
    }

    @Override
    public List<Oglas> dohvatiOglasePoKorisniku(RegistriraniKorisnik registriraniKorisnik) {
        return oglasRepository.findByKreator(registriraniKorisnik);
    }

    @Override
    public boolean objaviOglas(CreateOglasDTO oglasDTO, User user) {
        RegistriraniKorisnik registriraniKorisnik;
        Kolegij kolegij;
        Kategorija kategorija = oglasDTO.getKategorija();
        Optional<RegistriraniKorisnik> postojiKorisnik = regKorisnikService.findByKorisnickoIme(user.getUsername());
        Optional<Kolegij> postojiKolegij = kolegijService.findByImeKolegija(oglasDTO.getKolegij_ime());

        if (!postojiKorisnik.isPresent()) {
            throw new RequestDeniedException("Ne postoji korisnik s korisničkim imenom: " + user.getUsername());
        } else {
            registriraniKorisnik = postojiKorisnik.get();
        }
        if (oglasDTO.getNaslov() == null || oglasDTO.getOpis() == null || oglasDTO.getKolegij_ime() == null || oglasDTO.getKategorija() == null) {
            throw new RequestDeniedException("Sva polja moraju biti ispunjena");
        }
        if (oglasDTO.getNaslov().isBlank() || oglasDTO.getOpis().isBlank()) {
            throw new RequestDeniedException("Polja ne smiju biti prazna");
        }
        if (!postojiKolegij.isPresent()) {
            throw new RequestDeniedException("Ne postoji kolegij s imenom: " + oglasDTO.getKolegij_ime());
        } else {
            kolegij = postojiKolegij.get();
        }

        Oglas oglas = new Oglas(oglasDTO.getNaslov(), oglasDTO.getOpis(), kolegij, kategorija, registriraniKorisnik, true, oglasDTO.isTrazimPomoc());
        return oglasRepository.save(oglas) != null;
    }

    @Override
    public Optional<Oglas> dohvatiOglasPoId(Long id) {
        return oglasRepository.findById(id);
    }

    @Override
    public List<Oglas> filtrirajOglase(Smjer smjer, Kategorija kategorija, String kolegij_ime) {
        List<Oglas> filtriranaLista = oglasRepository.findAll();
        Predicate<Oglas> poSmjeru = oglas -> oglas.getKolegij().getSmjer().equals(smjer);
        Predicate<Oglas> poKategoriji = oglas -> oglas.getKategorija().equals(kategorija);
        Predicate<Oglas> poKolegiju = oglas -> oglas.getKolegij().getIme().equals(kolegij_ime);

        if (smjer == null) {
        } else if (smjer.equals(Smjer.R) || smjer.equals(Smjer.E)) {
            filtriranaLista = filtriranaLista.stream().filter(poSmjeru).collect(Collectors.toList());
        } else {
            throw new RequestDeniedException("Smjer mora biti E ili R");
        }
        // Java ima svoju provjeru za enum, 400 ako nije dobra kategorija
        if (kolegijService.getKolegiji().stream().map(Kolegij::getIme).toList().contains(kolegij_ime)) {
            filtriranaLista = filtriranaLista.stream().filter(poKolegiju).collect(Collectors.toList());
        } else if (kolegij_ime.equals("")) {
        } else {
            throw new RequestDeniedException("Odabrani kolegij se ne nalazi na popisu dostupnih kolegija");
        }
        return filtriranaLista;
    }
}
