package com.example.projekt.service;

import com.example.projekt.domain.Kolegij;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface KolegijService {

    List<Kolegij> getKolegiji();

    Kolegij napraviKolegij(String nazivKolegija, String smjer);

    List<Kolegij> getKolegijiPoSmjeru(String smjer);
}
