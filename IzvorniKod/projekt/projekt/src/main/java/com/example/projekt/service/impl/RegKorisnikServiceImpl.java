package com.example.projekt.service.impl;

import com.example.projekt.dao.RegKorisnikRepository;
import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.service.RegKorisnikService;
import com.example.projekt.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegKorisnikServiceImpl implements RegKorisnikService {

    @Autowired
    private RegKorisnikRepository regKorisnikRepository;

    @Override
    public List<RegistriraniKorisnik> dohvatiKorisnike() {
        return regKorisnikRepository.findAll();
    }

    @Override
    public RegistriraniKorisnik registriraj(String email, String korisnickoIme, String ime, String prezime, String lozinka, String avatar) {
        // validacija
        if(regKorisnikRepository.existsByEmail(email)) {
            throw new RequestDeniedException("Ovaj email je vec iskoristen.");
        }
        if(regKorisnikRepository.existsByKorisnickoIme(korisnickoIme)) {
            throw new RequestDeniedException("Ovo korisnicko ime je vec zauzeto.");
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashLozinka = passwordEncoder.encode(lozinka);

        return regKorisnikRepository.save(new RegistriraniKorisnik(email, korisnickoIme, ime, prezime, hashLozinka, avatar));
    }
}
