package com.example.projekt.rest.dto;

import com.example.projekt.domain.Kategorija;

public class CreateOglasDTO {
    private String naslov;
    private String opis;
    private String kolegij_ime;
    private Kategorija kategorija;
    private boolean trazimPomoc;

    public CreateOglasDTO() {
    }

    public CreateOglasDTO(String naslov, String opis, String kolegij_ime, Kategorija kategorija, boolean trazimPomoc) {
        this.naslov = naslov;
        this.opis = opis;
        this.kolegij_ime = kolegij_ime;
        this.kategorija = kategorija;
        this.trazimPomoc = trazimPomoc;
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

    public String getKolegij_ime() {
        return kolegij_ime;
    }

    public void setKolegij_ime(String kolegij_ime) {
        this.kolegij_ime = kolegij_ime;
    }

    public Kategorija getKategorija() {
        return kategorija;
    }

    public void setKategorija(Kategorija kategorija) {
        this.kategorija = kategorija;
    }

    public boolean isTrazimPomoc() {
        return trazimPomoc;
    }

    public void setTrazimPomoc(boolean trazimPomoc) {
        this.trazimPomoc = trazimPomoc;
    }

}
