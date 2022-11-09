package com.example.projekt.service;

import com.example.projekt.domain.Oglas;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OglasService {

    List<Oglas> listSveOglase();

    Oglas objaviOglas(Oglas oglas);
}
