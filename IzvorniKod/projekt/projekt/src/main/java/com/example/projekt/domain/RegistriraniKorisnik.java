package com.example.projekt.domain;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Objects;

@Entity
public class RegistriraniKorisnik {

    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String korisnickoIme;

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

//    @Lob // Large Object, jos byte pa je myb BLOB - binary large object
//    @Column()
//    private byte[] avatar;
    @Column
    private String avatar;

    public RegistriraniKorisnik(String email, String korisnickoIme, String ime, String prezime, String lozinka, String avatar) {
        this.email = email;
        this.korisnickoIme = korisnickoIme;
        this.ime = ime;
        this.prezime = prezime;
        this.lozinka = lozinka;
        this.avatar = avatar;
        this.sumaPrimljenihRecenzija = 0;
        this.brojPrimljenihRecenzija = 0;
        this.moderator = false;
    }

    public RegistriraniKorisnik() {   // mora postojat zbog nacina na koji spring data vraca podatke iz tablice
    }

    public String getKorisnickoIme() {
        return korisnickoIme;
    }

    public void setKorisnickoIme(String korisnickoIme) {
        this.korisnickoIme = korisnickoIme;
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

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    @Override
    public String toString() {
        return "RegistriraniKorisnik{" +
                "id=" + id +
                ", korisnickoIme='" + korisnickoIme + '\'' +
                ", email='" + email + '\'' +
                ", ime='" + ime + '\'' +
                ", prezime='" + prezime + '\'' +
                ", lozinka='" + lozinka + '\'' +
                ", moderator=" + moderator +
                ", brojPrimljenihRecenzija=" + brojPrimljenihRecenzija +
                ", sumaPrimljenihRecenzija=" + sumaPrimljenihRecenzija +
                ", avatar=" + avatar +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RegistriraniKorisnik that = (RegistriraniKorisnik) o;
        return moderator == that.moderator && brojPrimljenihRecenzija == that.brojPrimljenihRecenzija && sumaPrimljenihRecenzija == that.sumaPrimljenihRecenzija && id.equals(that.id) && korisnickoIme.equals(that.korisnickoIme) && email.equals(that.email) && ime.equals(that.ime) && prezime.equals(that.prezime) && lozinka.equals(that.lozinka) && avatar.equals(that.avatar);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, korisnickoIme, email, ime, prezime, lozinka, moderator, brojPrimljenihRecenzija, sumaPrimljenihRecenzija, avatar);
    }
}
