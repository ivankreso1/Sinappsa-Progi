package com.example.projekt.rest.dto;

public class CreateOcjenaDTO {
    private Long idUpita;
    private int ocjena;

    public CreateOcjenaDTO() {
    }

    public CreateOcjenaDTO(Long idUpita, int ocjena) {
        this.idUpita = idUpita;
        this.ocjena = ocjena;
    }

    public Long getIdUpita() {
        return this.idUpita;
    }

    public void setIdUpita (Long idUpita) {
        this.idUpita = idUpita;
    }

    public int getOcjena() {
        return this.ocjena;
    }

    public void setOcjena(int ocjena) {
        this.ocjena = ocjena;
    }
}
