package com.example.projekt.service.impl;

import com.example.projekt.dao.RegKorisnikRepository;
import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.service.RegKorisnikService;
import com.example.projekt.service.RequestDeniedException;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@Service
public class RegKorisnikServiceImpl implements RegKorisnikService {

    @Autowired
    private RegKorisnikRepository regKorisnikRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Optional<RegistriraniKorisnik> findById(Long id) {
        return regKorisnikRepository.findById(id);
    }

    @Override
    public List<RegistriraniKorisnik> dohvatiKorisnike() {
        return regKorisnikRepository.findAll();
    }

    @Override
    public RegistriraniKorisnik prijavi(String korisnickoIme, String lozinka) {
        Optional<RegistriraniKorisnik> registriraniKorisnik = regKorisnikRepository.findByKorisnickoIme(korisnickoIme);
        if(korisnickoIme == null || lozinka == null || korisnickoIme.isEmpty() || lozinka.isEmpty()) {
            throw new RequestDeniedException("Moraju biti upisana oba podatka");
        }
        if(registriraniKorisnik.isEmpty()) {
            throw new RequestDeniedException("Ne postoji korisnik s korisnickim imenom: " + korisnickoIme);
        }
        if(!passwordEncoder.matches(lozinka, registriraniKorisnik.get().getLozinka())) {
            throw new RequestDeniedException("Pogresna lozinka");
        }
        if(!registriraniKorisnik.get().isEnabled()) {
            throw new RequestDeniedException("Profil nije verificiran");
        }
        return registriraniKorisnik.get();
    }

    @Override
    public RegistriraniKorisnik registriraj(String email, String korisnickoIme, String ime, String prezime, String lozinka, String avatar, String siteURL) throws UnsupportedEncodingException, MessagingException {
        // validacija
        if(email == null || korisnickoIme == null || ime == null || prezime == null || lozinka == null || avatar == null) {
            throw new RequestDeniedException("Sva polja moraju biti ispunjena");
        }
        if(email.isEmpty() || korisnickoIme.isEmpty() || ime.isEmpty() || prezime.isEmpty() || lozinka.isEmpty() || avatar.isEmpty()) {
            throw new RequestDeniedException("Polja ne smiju biti prazna");
        }
        if(regKorisnikRepository.existsByEmail(email)) {
            throw new RequestDeniedException("Ova e-mail adresa je vec iskoristena.");
        }
        if(regKorisnikRepository.existsByKorisnickoIme(korisnickoIme)) {
            throw new RequestDeniedException("Ovo korisnicko ime je vec zauzeto.");
        }
        if(!email.endsWith("@fer.hr")) {
            throw new RequestDeniedException("E-mail adresa " + email + " nije iz FER-ove domene.");
        }
        if(lozinka.length() < 5) {
            throw new RequestDeniedException("Lozinka mora imati barem 5 znakova.");
        }

        String hashLozinka = passwordEncoder.encode(lozinka);
        String randomCode = RandomString.make(64);

        RegistriraniKorisnik registriraniKorisnik = new RegistriraniKorisnik(email, korisnickoIme, ime, prezime, hashLozinka, avatar);
        registriraniKorisnik.setEnabled(false);
        registriraniKorisnik.setVerificationCode(randomCode);

        RegistriraniKorisnik savedRegistriraniKorisnik = regKorisnikRepository.save(registriraniKorisnik);

        sendVerificationEmail(registriraniKorisnik, siteURL);

        return savedRegistriraniKorisnik;
    }

    private void sendVerificationEmail(RegistriraniKorisnik registriraniKorisnik, String siteURL) throws MessagingException, UnsupportedEncodingException {
        String toAddress = registriraniKorisnik.getEmail();
        String fromAddress = "sinappsa.team@gmail.com";
        String senderName = "Sinappsa";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Sinappsa team";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", registriraniKorisnik.getIme() + " " + registriraniKorisnik.getPrezime());
        String verifyURL = siteURL + "/korisnik/verify?code=" + registriraniKorisnik.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);

    }

    @Override
    public boolean verify(String verificationCode) {
        RegistriraniKorisnik registriraniKorisnik = regKorisnikRepository.findByVerificationCode(verificationCode);

        if(registriraniKorisnik == null || registriraniKorisnik.isEnabled()) {
            return false;
        } else {
            registriraniKorisnik.setVerificationCode(null);
            registriraniKorisnik.setEnabled(true);
            regKorisnikRepository.save(registriraniKorisnik);
            return true;
        }
    }

    @Override
    public Optional<RegistriraniKorisnik> findByKorisnickoIme(String korisnickoIme) {
        return regKorisnikRepository.findByKorisnickoIme(korisnickoIme);
    }

    @Override
    public RegistriraniKorisnik promijeniKorisnickoIme(RegistriraniKorisnik registriraniKorisnik, String novoKorisnickoIme) {
        registriraniKorisnik.setKorisnickoIme(novoKorisnickoIme);
        return regKorisnikRepository.save(registriraniKorisnik);
    }

    @Override
    public RegistriraniKorisnik promijeniLozinku(RegistriraniKorisnik registriraniKorisnik, String novaLozinka) {
        String novaHashLozinka = passwordEncoder.encode(novaLozinka);
        registriraniKorisnik.setLozinka(novaHashLozinka);
        return regKorisnikRepository.save(registriraniKorisnik);
    }

    @Override
    public RegistriraniKorisnik promijeniAvatar(RegistriraniKorisnik registriraniKorisnik, String noviAvatar) {
        registriraniKorisnik.setAvatar(noviAvatar);
        return regKorisnikRepository.save(registriraniKorisnik);
    }
}
