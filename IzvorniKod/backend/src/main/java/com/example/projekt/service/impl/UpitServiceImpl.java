package com.example.projekt.service.impl;
//findByKreator
//findByOglas
import com.example.projekt.dao.UpitRepository;
import com.example.projekt.domain.Oglas;
import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.domain.StanjeUpita;
import com.example.projekt.domain.Upit;
import com.example.projekt.service.RequestDeniedException;
import com.example.projekt.service.UpitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UpitServiceImpl implements UpitService {

    @Autowired
    private UpitRepository upitRepository;

//    @Override
//    public List<Upit> getUpiti() {
//        return upitRepository.findAll();
//    }

    @Override
    public List<Upit> listUpitByKreator(RegistriraniKorisnik registriraniKorisnik) {
        return upitRepository.findByAutorUpita(registriraniKorisnik);
    }

    @Override
    public List<Upit> listUpitByOglas(Oglas oglas) {
        return upitRepository.findByOglas(oglas);
    }

    @Override
    public Upit objaviUpit(String poruka, RegistriraniKorisnik registriraniKorisnik, Oglas oglas) {
        if (poruka.isEmpty() ||poruka == null) {
            throw new RequestDeniedException("Poruka nije upisana");
        }
        return upitRepository.save(new Upit(registriraniKorisnik, oglas, poruka, StanjeUpita.U_TIJEKU));
    }
}
