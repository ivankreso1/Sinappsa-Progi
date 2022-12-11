package com.example.projekt.dao;

import com.example.projekt.domain.Oglas;
import com.example.projekt.domain.RegistriraniKorisnik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OglasRepository extends JpaRepository<Oglas, Long> {
    List<Oglas> findByKreator(RegistriraniKorisnik registriraniKorisnik);

    @Query(value = "SELECT * FROM oglas JOIN kolegij ON oglas.kolegij_ime = kolegij.ime", nativeQuery = true)
    List<Oglas> listOglasJoinKolegijByKolegijName();
}
