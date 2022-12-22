package com.example.projekt.rest.dto;

public class RangiraniKorisnikDTO {
    private String korisnickoIme;
    private float prosjek;
    private String avatar;

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getKorisnickoIme() {
        return korisnickoIme;
    }

    public void setKorisnickoIme(String korisnickoIme) {
        this.korisnickoIme = korisnickoIme;
    }

    public float getProsjek() {
        return prosjek;
    }

    public void setProsjek(float prosjek) {
        this.prosjek = prosjek;
    }
}
