package com.example.projekt.dao;

import com.example.projekt.domain.RegistriraniKorisnik;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegKorisnikRepository extends JpaRepository<RegistriraniKorisnik, Long> {
}
