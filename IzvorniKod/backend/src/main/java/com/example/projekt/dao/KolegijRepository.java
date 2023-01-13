package com.example.projekt.dao;

import com.example.projekt.domain.Kolegij;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KolegijRepository extends JpaRepository<Kolegij, Long> {
    Optional<Kolegij> findByIme(String ime);
}
