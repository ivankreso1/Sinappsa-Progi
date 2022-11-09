package com.example.projekt.domain;

import org.hibernate.annotations.Cache;

import javax.persistence.*;

@Entity
public class Upit {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private RegistriraniKorisnik autorUpita;

    @ManyToOne
    private Oglas oglas;

    @Column
    private String poruka;

    @Enumerated(EnumType.STRING)
    @Column
    private StanjeUpita stanjeUpita;

    public Upit() {
    }

    public Upit(RegistriraniKorisnik autorUpita, Oglas oglas, String poruka, StanjeUpita stanjeUpita) {
        this.autorUpita = autorUpita;
        this.oglas = oglas;
        this.poruka = poruka;
        this.stanjeUpita = stanjeUpita;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RegistriraniKorisnik getAutorUpita() {
        return autorUpita;
    }

    public void setAutorUpita(RegistriraniKorisnik autorUpita) {
        this.autorUpita = autorUpita;
    }

    public Oglas getOglas() {
        return oglas;
    }

    public void setOglas(Oglas oglas) {
        this.oglas = oglas;
    }

    public String getPoruka() {
        return poruka;
    }

    public void setPoruka(String poruka) {
        this.poruka = poruka;
    }

    public StanjeUpita getStanjeUpita() {
        return stanjeUpita;
    }

    public void setStanjeUpita(StanjeUpita stanjeUpita) {
        this.stanjeUpita = stanjeUpita;
    }

    @Override
    public String toString() {
        return "Upit{" +
                "id=" + id +
                ", autorUpita=" + autorUpita +
                ", oglas=" + oglas +
                ", poruka='" + poruka + '\'' +
                ", stanjeUpita=" + stanjeUpita +
                '}';
    }
}
