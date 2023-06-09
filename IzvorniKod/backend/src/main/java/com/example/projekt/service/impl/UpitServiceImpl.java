package com.example.projekt.service.impl;

import com.example.projekt.dao.UpitRepository;
import com.example.projekt.domain.Oglas;
import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.domain.StanjeUpita;
import com.example.projekt.domain.Upit;
import com.example.projekt.rest.dto.CreateOcjenaDTO;
import com.example.projekt.service.RegKorisnikService;
import com.example.projekt.service.RequestDeniedException;
import com.example.projekt.service.UpitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@Service
public class UpitServiceImpl implements UpitService {

    @Autowired
    private UpitRepository upitRepository;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private RegKorisnikService regKorisnikService;

    @Override
    public List<Upit> listUpitByKreator(RegistriraniKorisnik registriraniKorisnik) {
        return upitRepository.findByAutorUpita(registriraniKorisnik);
    }

    @Override
    public List<Upit> listUpitByOglas(Oglas oglas) {
        return upitRepository.findByOglas(oglas);
    }

    @Override
    public Upit objaviUpit(String poruka, RegistriraniKorisnik registriraniKorisnik, Oglas oglas) throws MessagingException, UnsupportedEncodingException {
        if (poruka.isEmpty()) {
            throw new RequestDeniedException("Poruka nije upisana");
        }
        var autorOglasa = oglas.getKreator();

        posaljiMailAutoruOglasa(registriraniKorisnik, autorOglasa, poruka);

        return upitRepository.save(new Upit(registriraniKorisnik, oglas, poruka, StanjeUpita.U_TIJEKU));
    }
    private void posaljiMailAutoruOglasa(RegistriraniKorisnik autorUpita, RegistriraniKorisnik autorOglasa, String poruka) throws MessagingException, UnsupportedEncodingException {

        String fromAddress = "sinappsa.team@gmail.com";
        String senderName = "Sinappsa";
        String subject = "KONTAKT AUTORA UPITA";
        String content = "Dragi/a [[imeOglasnika]],<br>"
                + "Obavještavamo Vas da ste dobili odgovor na postavljeni oglas:<br>"
                + "<i>[[poruka]]</i><br><br>"
                + "Zainteresirani student:<br>"
                + "<b>[[imeUpitnika]]</b><br>"
                + "<b>[[kontaktOsoba]]</b><br><br>"
                + "LP,<br>"
                + "Tvoj Sinappsa tim";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(autorOglasa.getEmail());
        helper.setSubject(subject);

        content = content.replace("[[imeOglasnika]]", autorOglasa.getIme() + " " + autorOglasa.getPrezime());
        content = content.replace("[[kontaktOsoba]]", autorUpita.getEmail());
        content = content.replace("[[poruka]]", poruka);
        content = content.replace("[[imeUpitnika]]", autorUpita.getIme() + " " + autorUpita.getPrezime());

        helper.setText(content, true);
        mailSender.send(message);
    }
    @Override
    public Optional<Upit> dohvatiUpitPoId(Long id) {
        return upitRepository.findById(id);
    }

    @Override
    public Upit promjeniStanjeUpita(Upit upit, StanjeUpita novoStanjeUpita){
        upit.setStanjeUpita(novoStanjeUpita);
        return upitRepository.save(upit);
    }

    @Override
    public boolean ocijeniStudentPomagaca(CreateOcjenaDTO createOcjenaDTO, User user) {
        if (createOcjenaDTO.getIdUpita() == null) {
            throw new RequestDeniedException("Id polje mora biti ispunjeno");
        }
        if (!upitRepository.findById(createOcjenaDTO.getIdUpita()).isPresent()) {
            return false;
        }
        if (createOcjenaDTO.getOcjena() < 1 || createOcjenaDTO.getOcjena() > 5) {
            throw new RequestDeniedException("Ocjena mora biti od 1 do 5");
        }
        Upit upit = upitRepository.findById(createOcjenaDTO.getIdUpita()).get();
        Oglas oglas = upit.getOglas();
        RegistriraniKorisnik korisnikPoUsername = regKorisnikService.findByKorisnickoIme(user.getUsername()).get();

        if (upit.getStanjeUpita() != StanjeUpita.CEKA_OCJENJIVANJE) {
            throw new RequestDeniedException("Stanje upita vam ne dozvoljava ocjenjivanje trenutno");
        }
        if (oglas.isTrazimPomoc()) {
            if (oglas.getKreator().equals(korisnikPoUsername)) {
                regKorisnikService.ocijeni(upit.getAutorUpita(), createOcjenaDTO.getOcjena());
            } else {
                throw new RequestDeniedException("Nemate prava ocijeniti");
            }
        } else {
            if (upit.getAutorUpita().equals(korisnikPoUsername)) {
                regKorisnikService.ocijeni(oglas.getKreator(), createOcjenaDTO.getOcjena());
            } else {
                throw new RequestDeniedException("Nemate prava ocijeniti");
            }
        }
        upit.setStanjeUpita(StanjeUpita.PRIHVACEN);
        upit.setOcjena(createOcjenaDTO.getOcjena());
        upitRepository.save(upit);

        return true;
    }
}
