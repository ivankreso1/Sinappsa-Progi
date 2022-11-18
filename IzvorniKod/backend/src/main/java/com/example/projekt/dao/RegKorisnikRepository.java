package com.example.projekt.dao;

import com.example.projekt.domain.RegistriraniKorisnik;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RegKorisnikRepository extends JpaRepository<RegistriraniKorisnik, Long> {
    boolean existsByEmail(String email);
    boolean existsByKorisnickoIme(String korisnickoIme);
    Optional<RegistriraniKorisnik> findByKorisnickoIme(String korisnickoIme);
}
