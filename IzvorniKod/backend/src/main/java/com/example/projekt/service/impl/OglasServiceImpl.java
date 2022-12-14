package com.example.projekt.service.impl;

import com.example.projekt.dao.OglasRepository;
import com.example.projekt.domain.*;
import com.example.projekt.rest.dto.CreateOglasDTO;
import com.example.projekt.rest.dto.PutOglasDTO;
import com.example.projekt.service.*;
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
            throw new NotFoundException("Ne postoji korisnik s korisničkim imenom: " + user.getUsername());
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
            throw new NotFoundException("Ne postoji kolegij s imenom: " + oglasDTO.getKolegij_ime());
        } else {
            kolegij = postojiKolegij.get();
        }
        Oglas oglas = new Oglas(oglasDTO.getNaslov(), oglasDTO.getOpis(), kolegij, kategorija, registriraniKorisnik, true, oglasDTO.isTrazimPomoc());

        oglasRepository.save(oglas);
        return true;
    }

    @Override
    public boolean promijeniOglas(Long id, PutOglasDTO noviOglas, User user) {
        boolean pristup = provjeraPristupa(id, user, "Samo aktivnim oglasima možete mijenjati naslov i opis");
        Oglas stariOglas;

        if (pristup) {
            stariOglas = oglasRepository.findById(id).get();
        } else {
            return false;
        }
        if (noviOglas.getNaslov().isBlank() || noviOglas.getNaslov() == null) {
            throw new RequestDeniedException("Naslov ne smije biti prazan");
        }
        if (noviOglas.getOpis().isBlank() || noviOglas.getOpis() == null) {
            throw new RequestDeniedException("Opis ne smije biti prazan");
        }
        stariOglas.setNaslov(noviOglas.getNaslov());
        stariOglas.setOpis(noviOglas.getOpis());

        oglasRepository.save(stariOglas);
        return true;
    }

    @Override
    public boolean obrisiOglas (Long id, User user) {
        boolean pristup = provjeraPristupa(id, user, "Samo aktivne oglase možete izbrisati");
        if (pristup) {
            oglasRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Optional<Oglas> dohvatiOglasPoId(Long id) {
        return oglasRepository.findById(id);
    }

    @Override
    public List<Oglas> filtrirajOglase(Smjer smjer, Kategorija kategorija, String kolegij_ime) {
        List<Oglas> filtriranaLista = oglasRepository.findAllByAktivan(true);
        Predicate<Oglas> poSmjeru = oglas -> oglas.getKolegij().getSmjer().equals(smjer);
        Predicate<Oglas> poKategoriji = oglas -> oglas.getKategorija().equals(kategorija);
        Predicate<Oglas> poKolegiju = oglas -> oglas.getKolegij().getIme().equals(kolegij_ime);

        if (smjer == null) {
        } else if (smjer.equals(Smjer.R) || smjer.equals(Smjer.E)) {
            filtriranaLista = filtriranaLista.stream().filter(poSmjeru).collect(Collectors.toList());
        } else {
            throw new RequestDeniedException("Smjer mora biti E ili R");
        }
        if (kategorija != null) {
            filtriranaLista = filtriranaLista.stream().filter(poKategoriji).collect(Collectors.toList());
        }
        if (kolegijService.getKolegiji().stream().map(Kolegij::getIme).toList().contains(kolegij_ime)) {
            filtriranaLista = filtriranaLista.stream().filter(poKolegiju).collect(Collectors.toList());
        } else if (kolegij_ime.equals("")) {
        } else {
            throw new NotFoundException("Odabrani kolegij se ne nalazi na popisu dostupnih kolegija");
        }

        return filtriranaLista;
    }

    public boolean provjeraPristupa (Long id, User user, String errMsg) {
        Optional<Oglas> postojiOglas = oglasRepository.findById(id);
        RegistriraniKorisnik autorOglasa;
        RegistriraniKorisnik korisnikPoUsername = regKorisnikService.findByKorisnickoIme(user.getUsername()).get();
        Oglas stariOglas;

        if (!postojiOglas.isPresent()) {
            return false;
        } else {
            stariOglas = postojiOglas.get();
        }
        if (!stariOglas.isAktivan()) {
            throw new RequestDeniedException(errMsg);
        }
        autorOglasa = stariOglas.getKreator();
        if (!autorOglasa.equals(korisnikPoUsername)) {
            throw new RequestDeniedException("Pokušali ste izmijeniti oglas korisnika " + autorOglasa.getKorisnickoIme()
                    + " prijavljeni kao " + user.getUsername());
        }

        return true;
    }
}
