package com.example.projekt.domain;

import javax.persistence.*;

@Entity
public class Kolegij {

    @Id
    @Column
    private String ime;

    @Enumerated(EnumType.STRING)
    @Column
    private Smjer smjer;

    public Kolegij() {
    }

    public Kolegij(String ime, Smjer smjer) {
        this.ime = ime;
        this.smjer = smjer;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public Smjer getSmjer() {
        return smjer;
    }

    public void setSmjer(Smjer smjer) {
        this.smjer = smjer;
    }

    @Override
    public String toString() {
        return "Kolegij{" +
                "ime='" + ime + '\'' +
                ", smjer=" + smjer +
                '}';
    }
}
