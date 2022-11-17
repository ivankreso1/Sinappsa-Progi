package com.example.projekt.dao;

import com.example.projekt.domain.Oglas;
import com.example.projekt.domain.RegistriraniKorisnik;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OglasRepository extends JpaRepository<Oglas, Long> {
    List<Oglas> findByKreator(RegistriraniKorisnik registriraniKorisnik);
}
