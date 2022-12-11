package com.example.projekt.service.impl;

import com.example.projekt.dao.KolegijRepository;
import com.example.projekt.domain.Kolegij;
import com.example.projekt.domain.Smjer;
import com.example.projekt.service.KolegijService;
import com.example.projekt.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class KolegijServiceImpl implements KolegijService {
    private Smjer smjer;

    @Autowired
    private KolegijRepository kolegijRepository;

    @Override
    public List<Kolegij> getKolegiji() {
        return kolegijRepository.findAll();
    }

    @Override
    public Kolegij napraviKolegij(String nazivKolegija, String smjerSlovo) {
        //Smjer smjer = null;
        if(smjerSlovo.equals("E")) {
            smjer = Smjer.E;
        } else if(smjerSlovo.equals("R")) {
            smjer = Smjer.R;
        } else {
            throw new RequestDeniedException("Smjer mora biti E ili R");
        }
        Optional<Kolegij> vecPostojeci = kolegijRepository.findById(nazivKolegija);
        if(vecPostojeci.isPresent()) {
            throw new RequestDeniedException("Vec postoji kolegij s tim imenom");
        }
        return kolegijRepository.save(new Kolegij(nazivKolegija, smjer));
    }

    @Override
    public Optional<Kolegij> findByImeKolegija(String nazivKolegija) {
        return kolegijRepository.findById(nazivKolegija);
    }

    @Override
    public List<Kolegij> getKolegijiPoSmjeru (String smjerSlovo) {
        if (smjerSlovo.equals("e")) {
            smjer = Smjer.E;
        } else if (smjerSlovo.equals("r")) {
            smjer = Smjer.R;
        } else {
            throw new RequestDeniedException("Smjer mora biti E ili R");
        }
        return kolegijRepository.findAll().stream().filter((kolegij) -> kolegij.getSmjer().equals(smjer)).collect(Collectors.toList());
    }
}
