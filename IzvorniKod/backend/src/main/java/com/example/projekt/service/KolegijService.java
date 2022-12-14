package com.example.projekt.service;

import com.example.projekt.domain.Kolegij;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface KolegijService {

    List<Kolegij> getKolegiji();

    Kolegij napraviKolegij(String nazivKolegija, String smjer);

    List<Kolegij> getKolegijiPoSmjeru(String smjer);

    Optional<Kolegij> findByImeKolegija(String nazivKolegija);
    void izbrisiKolegij(String ime);
}
