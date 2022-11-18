package com.example.projekt.service.impl;

import com.example.projekt.dao.OglasRepository;
import com.example.projekt.domain.Oglas;
import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.service.OglasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OglasServiceImpl implements OglasService {

    @Autowired
    private OglasRepository oglasRepository;

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
        return oglasRepository.save(oglas);
    }
}
