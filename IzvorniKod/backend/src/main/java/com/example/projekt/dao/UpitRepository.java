package com.example.projekt.dao;

import com.example.projekt.domain.Oglas;
import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.domain.Upit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UpitRepository extends JpaRepository<Upit, Long> {
    List<Upit> findByKreator(RegistriraniKorisnik registriraniKorisnik);
    List<Upit> findByOglas(Oglas oglas);
}
