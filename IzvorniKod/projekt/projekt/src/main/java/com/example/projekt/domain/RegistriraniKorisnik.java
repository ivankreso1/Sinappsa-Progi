package com.example.projekt.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class RegistriraniKorisnik {

    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String email;

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

    @Override
    public String toString() {
        return "RegistriraniKorisnik{" +
                "id=" + id +
                ", email='" + email + '\'' +
                '}';
    }
}
