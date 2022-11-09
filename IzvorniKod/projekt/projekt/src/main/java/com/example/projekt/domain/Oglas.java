package com.example.projekt.domain;

import javax.persistence.*;

@Entity
public class Oglas {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String naslov;

    @Column
    private String opis;

    @ManyToOne
    private Kolegij kolegij;

    @Column
    private Kategorija kategorija;

    @ManyToOne
    private RegistriraniKorisnik kreator;

    @Column
    private boolean aktivan;

    @Column
    private boolean trazimPomoc;

    public Oglas() {
    }

    public Oglas(String naslov, String opis, Kolegij kolegij, Kategorija kategorija, RegistriraniKorisnik kreator, boolean aktivan, boolean trazimPomoc) {
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

    @Override
    public String toString() {
        return "Oglas{" +
                "id=" + id +
                ", naslov='" + naslov + '\'' +
                ", opis='" + opis + '\'' +
                ", kolegij=" + kolegij +
                ", kategorija=" + kategorija +
                ", kreator=" + kreator +
                ", aktivan=" + aktivan +
                ", trazimPomoc=" + trazimPomoc +
                '}';
    }
}
