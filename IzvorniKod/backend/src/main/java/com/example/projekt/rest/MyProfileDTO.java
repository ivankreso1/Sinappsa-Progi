package com.example.projekt.rest;

import com.example.projekt.domain.Oglas;
import com.example.projekt.domain.RegistriraniKorisnik;

import java.util.List;

public class MyProfileDTO {
    private RegistriraniKorisnik registriraniKorisnik;
    private List<Oglas> oglasi;

    public RegistriraniKorisnik getRegistriraniKorisnik() {
        return registriraniKorisnik;
    }

    public void setRegistriraniKorisnik(RegistriraniKorisnik registriraniKorisnik) {
        this.registriraniKorisnik = registriraniKorisnik;
    }

    public List<Oglas> getOglasi() {
        return oglasi;
    }

    public void setOglasi(List<Oglas> oglasi) {
        this.oglasi = oglasi;
    }
}
