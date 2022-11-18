package com.example.projekt.service.impl;

import com.example.projekt.dao.KolegijRepository;
import com.example.projekt.domain.Kolegij;
import com.example.projekt.domain.Smjer;
import com.example.projekt.service.KolegijService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KolegijServiceImpl implements KolegijService {

    @Autowired
    private KolegijRepository kolegijRepository;

    @Override
    public List<Kolegij> getKolegiji() {
        return kolegijRepository.findAll();
    }

    @Override
    public Kolegij napraviKolegij(String nazivKolegija, String smjerSlovo) {
        Smjer smjer = null;
        if(smjerSlovo.equals("E")) {
            smjer = Smjer.E;
        } else if(smjerSlovo.equals("R")) {
            smjer = Smjer.R;
        } else {
            // baci error
            String errorMessage = "Smjer mora biti E ili R";
        }
        Optional<Kolegij> vecPostojeci = kolegijRepository.findById(nazivKolegija);
        if(vecPostojeci.isPresent()) {
            // baci error
            String errorMessage = "Vec postoji kolegij s tim imenom";
        }
        return kolegijRepository.save(new Kolegij(nazivKolegija, smjer));
    }
}
