package com.example.projekt.rest.dto;

import com.example.projekt.domain.Kategorija;
import com.example.projekt.domain.Kolegij;
import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.domain.Upit;
import java.util.List;

public class OglasUpitUpitOglasDTO {
    private Long id;
    private String naslov;
    private String opis;
    private Kolegij kolegij;
    private Kategorija kategorija;
    private RegistriraniKorisnik kreator;
    private boolean aktivan;
    private boolean trazimPomoc;
    private List<Upit> listaUpita;

    public Long getId() { return id; }
    public void setId(Long id) {this.id = id;}

    public String getNaslov() { return naslov; }
    public void setNaslov(String naslov) {this.naslov = naslov;}

    public String getOpis() { return opis; }
    public void setOpis(String opis) {this.opis = opis;}

    public Kolegij getKolegij() { return kolegij; }
    public void setKolegij(Kolegij kolegij) {this.kolegij = kolegij;}

    public Kategorija getKategorija() { return kategorija; }
    public void setKategorija(Kategorija kategorija) {this.kategorija = kategorija;}

    public RegistriraniKorisnik getKreator() { return kreator; }
    public void setKreator(RegistriraniKorisnik kreator) {this.kreator = kreator;}

    public boolean getAktivan() { return aktivan; }
    public void setAktivan(boolean aktivan) {this.aktivan = aktivan;}

    public boolean getTrazimPomoc() { return trazimPomoc; }
    public void setTrazimPomoc(boolean trazimPomoc) {this.trazimPomoc = trazimPomoc;}

    public List<Upit> getListaUpita() { return listaUpita; }
    public void setListaUpita(List<Upit> listaUpita) {this.listaUpita = listaUpita;}
}
