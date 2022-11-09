package com.example.projekt.domain;

import javax.persistence.*;
import java.util.Arrays;

@Entity
public class RegistriraniKorisnik {

    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String email;

    @Column
    private String ime;

    @Column
    private String prezime;

    @Column
    private String lozinka;

    @Column
    private boolean moderator;

    @Column
    private int brojPrimljenihRecenzija;

    @Column
    private int sumaPrimljenihRecenzija;

    @Lob // Large Object, jos byte pa je myb BLOB - binary large object
    @Column()
    private byte[] avatar;

    public RegistriraniKorisnik(String email, String ime, String prezime, String lozinka, boolean moderator, byte[] avatar) {
        this.email = email;
        this.ime = ime;
        this.prezime = prezime;
        this.lozinka = lozinka;
        this.moderator = moderator;
        this.avatar = avatar;
        this.sumaPrimljenihRecenzija = 0;
        this.brojPrimljenihRecenzija = 0;
    }

    public RegistriraniKorisnik() {   // mora postojat zbog nacina na koji spring data vraca podatke iz tablice
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getLozinka() {
        return lozinka;
    }

    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }

    public boolean isModerator() {
        return moderator;
    }

    public void setModerator(boolean moderator) {
        this.moderator = moderator;
    }

    public int getBrojPrimljenihRecenzija() {
        return brojPrimljenihRecenzija;
    }

    public void setBrojPrimljenihRecenzija(int brojPrimljenihRecenzija) {
        this.brojPrimljenihRecenzija = brojPrimljenihRecenzija;
    }

    public int getSumaPrimljenihRecenzija() {
        return sumaPrimljenihRecenzija;
    }

    public void setSumaPrimljenihRecenzija(int sumaPrimljenihRecenzija) {
        this.sumaPrimljenihRecenzija = sumaPrimljenihRecenzija;
    }

    public byte[] getAvatar() {
        return avatar;
    }

    public void setAvatar(byte[] avatar) {
        this.avatar = avatar;
    }

    @Override
    public String toString() {
        return "RegistriraniKorisnik{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", ime='" + ime + '\'' +
                ", prezime='" + prezime + '\'' +
                ", lozinka='" + lozinka + '\'' +
                ", moderator=" + moderator +
                ", brojPrimljenihRecenzija=" + brojPrimljenihRecenzija +
                ", sumaPrimljenihRecenzija=" + sumaPrimljenihRecenzija +
                ", avatar=" + Arrays.toString(avatar) +
                '}';
    }


}
