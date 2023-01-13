package com.example.projekt.rest.dto;

import com.example.projekt.domain.Oglas;
import com.example.projekt.domain.Upit;

import java.util.List;

public class OglasUpitiDTO {

    private Oglas oglas;
    private List<Upit> listaUpita;

    public Oglas getOglas() { return oglas; }
    public void setOglas(Oglas oglas) {this.oglas = oglas;}

    public List<Upit> getListaUpita() { return listaUpita; }
    public void setListaUpita(List<Upit> listaUpita) {this.listaUpita = listaUpita;}

}