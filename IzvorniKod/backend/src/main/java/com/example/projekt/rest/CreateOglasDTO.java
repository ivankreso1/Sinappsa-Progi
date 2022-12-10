package com.example.projekt.rest;

import com.example.projekt.domain.Kategorija;
import com.example.projekt.domain.Kolegij;
import com.example.projekt.domain.RegistriraniKorisnik;

public class CreateOglasDTO {

    private Long id;
    private String naslov;
    private String opis;
    private Kolegij kolegij;
    private Kategorija kategorija;
    private RegistriraniKorisnik kreator;
    private boolean aktivan;
    private boolean trazimPomoc;

    public CreateOglasDTO() {
    }

    public CreateOglasDTO(Long id, String naslov, String opis, Kolegij kolegij, Kategorija kategorija,
                          RegistriraniKorisnik kreator, boolean aktivan, boolean trazimPomoc) {
        this.id = id;
        this.naslov = naslov;
        this.opis = opis;
        this.kolegij = kolegij;
        this.kategorija = kategorija;
        this.kreator = kreator;
        this.aktivan = aktivan;
        this.trazimPomoc = trazimPomoc;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNaslov() {
        return naslov;
    }

    public void setNaslov(String naslov) {
        this.naslov = naslov;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public Kolegij getKolegij() {
        return kolegij;
    }

    public void setKolegij(Kolegij kolegij) {
        this.kolegij = kolegij;
    }

    public Kategorija getKategorija() {
        return kategorija;
    }

    public void setKategorija(Kategorija kategorija) {
        this.kategorija = kategorija;
    }

    public RegistriraniKorisnik getKreator() {
        return kreator;
    }

    public void setKreator(RegistriraniKorisnik kreator) {
        this.kreator = kreator;
    }

    public boolean isAktivan() {
        return aktivan;
    }

    public void setAktivan(boolean aktivan) {
        this.aktivan = aktivan;
    }

    public boolean isTrazimPomoc() {
        return trazimPomoc;
    }

    public void setTrazimPomoc(boolean trazimPomoc) {
        this.trazimPomoc = trazimPomoc;
    }

}
