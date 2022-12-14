package com.example.projekt.service.impl;
import com.example.projekt.dao.UpitRepository;
import com.example.projekt.domain.Oglas;
import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.domain.StanjeUpita;
import com.example.projekt.domain.Upit;
import com.example.projekt.service.RequestDeniedException;
import com.example.projekt.service.UpitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
//    @Override
//    public List<Upit> getUpiti() {
//        return upitRepository.findAll();
//    }

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
}
