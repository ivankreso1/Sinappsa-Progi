package com.example.projekt.service.impl;

import com.example.projekt.dao.OglasRepository;
import com.example.projekt.domain.*;
import com.example.projekt.service.KolegijService;
import com.example.projekt.service.OglasService;
import com.example.projekt.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.function.Predicate;

@Service
public class OglasServiceImpl implements OglasService {

    @Autowired
    private OglasRepository oglasRepository;

    @Autowired
    private KolegijService kolegijService;

    @Override
    public List<Oglas> listSveOglase() {
        return oglasRepository.findAll();
    }

    @Override
    public List<Oglas> dohvatiOglasePoKorisniku(RegistriraniKorisnik registriraniKorisnik) {
        return oglasRepository.findByKreator(registriraniKorisnik);
    }

    @Override
    public Oglas objaviOglas(Oglas oglas) {
        if (oglas.getNaslov() == null || oglas.getOpis() == null || oglas.getKolegij() == null || oglas.getKategorija() == null) {
            throw new RequestDeniedException("Sva polja moraju biti ispunjena");
        }
        if (oglas.getNaslov().isEmpty() || oglas.getOpis().isEmpty()
        ) {
            throw new RequestDeniedException("Polja ne smiju biti prazna");
        }
        /* provjera je li korisnik ulogiran
            * if () {
            * throw
            * }
        */
        if (!kolegijService.getKolegiji().contains(oglas.getKolegij())) {
            throw new RequestDeniedException("Odabrani kolegij se ne nalazi na popisu dostupnih kolegija");
        }
        if (!Arrays.stream(Kategorija.values()).toList().contains(oglas.getKategorija())) {
            throw new RequestDeniedException("Odabrana kategorija se ne nalazi na popisu dostupnih kategorija");
        }
        return oglasRepository.save(oglas);
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

        if (smjer != null) {
            filtriranaLista = filtriranaLista.stream().filter(poSmjeru).collect(Collectors.toList());
        } else if (!smjer.equals(Smjer.R) && !smjer.equals(Smjer.E)) {
            throw new RequestDeniedException("Smjer mora biti R ili E");
        }
        if (kategorija != null) {
            filtriranaLista = filtriranaLista.stream().filter(poKategoriji).collect(Collectors.toList());
        }
        if (kolegij_ime != null) {
            filtriranaLista = filtriranaLista.stream().filter(poKolegiju).collect(Collectors.toList());
        }
        return filtriranaLista;
    }
}
