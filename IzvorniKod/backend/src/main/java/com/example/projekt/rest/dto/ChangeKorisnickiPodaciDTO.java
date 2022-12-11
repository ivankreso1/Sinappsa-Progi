package com.example.projekt.rest.dto;

public class ChangeKorisnickiPodaciDTO {

    private String novoKorisnickoIme;
    private String novaLozinka;
    private String noviAvatar;

    public String getNovaLozinka() {
        return novaLozinka;
    }

    public void setNovaLozinka(String novaLozinka) {
        this.novaLozinka = novaLozinka;
    }

    public String getNoviAvatar() {
        return noviAvatar;
    }

    public void setNoviAvatar(String noviAvatar) {
        this.noviAvatar = noviAvatar;
    }

    public String getNovoKorisnickoIme() {
        return novoKorisnickoIme;
    }

    public void setNovoKorisnickoIme(String novoKorisnickoIme) {
        this.novoKorisnickoIme = novoKorisnickoIme;
    }
}
