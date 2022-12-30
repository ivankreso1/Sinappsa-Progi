package com.example.projekt.rest.dto;

public class CreateKolegijDTO {
    private String ime;
    private String smjer;

    public String getNazivKolegija() {
        return ime;
    }

    public void setNazivKolegija(String ime) {
        this.ime = ime;
    }

    public String getSmjer() {
        return smjer;
    }

    public void setSmjer(String smjer) {
        this.smjer = smjer;
    }
}
