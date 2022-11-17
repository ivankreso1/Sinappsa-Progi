package com.example.projekt.rest;

import com.example.projekt.domain.Oglas;
import com.example.projekt.service.OglasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/oglasi")
public class OglasController {

    @Autowired
    private OglasService oglasService;

    @GetMapping
    public List<Oglas> listOglasi() {
        return oglasService.listSveOglase();
    }

    @PostMapping
    public Oglas objaviOglas(@RequestBody Oglas oglas) {        // tip je Oglas, al to ne znaci da moraju svi atributi biti prisutni u JSON-u -> mozda napravit createOglas DTO
        return oglasService.objaviOglas(oglas);                 // u createOglasDTO ce bit naslov, opis, username kreatora, boolean jel trazi pomoc, ime kategorije, ime kolegija
    }
}
