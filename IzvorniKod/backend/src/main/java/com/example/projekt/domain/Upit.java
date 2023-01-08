package com.example.projekt.domain;

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

    @Column(nullable = false)
    private String poruka;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StanjeUpita stanjeUpita;

    @Column(nullable = false)
    private int ocjena;

    public Upit() {
    }

    public Upit(RegistriraniKorisnik autorUpita, Oglas oglas, String poruka, StanjeUpita stanjeUpita) {
        this.autorUpita = autorUpita;
        this.oglas = oglas;
        this.poruka = poruka;
        this.stanjeUpita = stanjeUpita;
        this.ocjena = -1;
    }

    public int getOcjena() {
        return ocjena;
    }

    public void setOcjena(int ocjena) {
        this.ocjena = ocjena;
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
