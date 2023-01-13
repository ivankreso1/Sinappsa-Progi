package com.example.projekt.dao;

import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.rest.dto.RangiraniKorisnikDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RegKorisnikRepository extends JpaRepository<RegistriraniKorisnik, Long> {
    boolean existsByEmail(String email);
    boolean existsByKorisnickoIme(String korisnickoIme);
    Optional<RegistriraniKorisnik> findByKorisnickoIme(String korisnickoIme);

    RegistriraniKorisnik findByVerificationCode(String code);

    @Query(value = "SELECT * " +
            "FROM registrirani_korisnik " +
            "WHERE registrirani_korisnik.broj_primljenih_recenzija > 0 " +
            "ORDER BY (CAST(registrirani_korisnik.suma_primljenih_recenzija AS DECIMAL(7, 5)) / registrirani_korisnik.broj_primljenih_recenzija) DESC " +
            "LIMIT 10", nativeQuery = true)
    List<RegistriraniKorisnik> dohvatiNajboljih10();
}
