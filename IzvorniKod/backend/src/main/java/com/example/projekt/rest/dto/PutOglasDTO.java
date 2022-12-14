package com.example.projekt.rest.dto;

public class PutOglasDTO {
    private String naslov;
    private String opis;

    public PutOglasDTO() {
    }

    public PutOglasDTO(String naslov, String opis) {
        this.naslov = naslov;
        this.opis = opis;
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
}
