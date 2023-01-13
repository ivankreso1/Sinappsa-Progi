package com.example.projekt.service.impl;

import com.example.projekt.dao.OglasRepository;
import com.example.projekt.dao.UpitRepository;
import com.example.projekt.domain.*;
import com.example.projekt.rest.dto.CreateOglasDTO;
import com.example.projekt.rest.dto.OglasUpitiDTO;
import com.example.projekt.rest.dto.PutOglasDTO;
import com.example.projekt.service.*;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.function.Predicate;

@Service
public class OglasServiceImpl implements OglasService {

    @Autowired
    private OglasRepository oglasRepository;

    @Autowired
    private RegKorisnikService regKorisnikService;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private KolegijService kolegijService;
    @Autowired
    private UpitRepository upitRepository;
    @Autowired
    private UpitService upitService;

    @Override
    public List<Oglas> listSveOglase() {
        return oglasRepository.findAll();
    }

    @Override
    public List<Oglas> listSvihAktivnihOglasa() {
        return oglasRepository.findAllByAktivan(true);
    }

    @Override
    public List<Oglas> listSvihNeaktivnihOglasa() {
        return oglasRepository.findAllByAktivan(false);
    }

    @Override
    public List<Oglas> dohvatiOglasePoKorisniku(RegistriraniKorisnik registriraniKorisnik) {
        return oglasRepository.findByKreator(registriraniKorisnik);
    }

    @Override
    public boolean objaviOglas(CreateOglasDTO oglasDTO, User user) {
        RegistriraniKorisnik registriraniKorisnik;
        Kolegij kolegij;
        Kategorija kategorija = oglasDTO.getKategorija();
        Optional<RegistriraniKorisnik> postojiKorisnik = regKorisnikService.findByKorisnickoIme(user.getUsername());
        Optional<Kolegij> postojiKolegijSImenom = kolegijService.findByImeKolegija(oglasDTO.getKolegij_ime());

        if (!postojiKorisnik.isPresent()) {
            throw new NotFoundException("Ne postoji korisnik s korisničkim imenom: " + user.getUsername());
        } else {
            registriraniKorisnik = postojiKorisnik.get();
        }
        if (oglasDTO.getNaslov() == null || oglasDTO.getOpis() == null || oglasDTO.getKolegij_ime() == null || oglasDTO.getKategorija() == null) {
            throw new RequestDeniedException("Sva polja moraju biti ispunjena");
        }
        if (oglasDTO.getNaslov().isBlank() || oglasDTO.getOpis().isBlank()) {
            throw new RequestDeniedException("Polja ne smiju biti prazna");
        }
        if (!postojiKolegijSImenom.isPresent()) {
            throw new NotFoundException("Ne postoji kolegij s imenom: " + oglasDTO.getKolegij_ime());
        } else {
            kolegij = postojiKolegijSImenom.get();
        }
        Oglas oglas = new Oglas(oglasDTO.getNaslov(), oglasDTO.getOpis(), kolegij, kategorija, registriraniKorisnik, true, oglasDTO.isTrazimPomoc());

        oglasRepository.save(oglas);
        return true;
    }

    @Override
    public boolean promijeniOglas(Long id, PutOglasDTO noviOglas, User user) {
        boolean pristup = provjeraPristupa(id, user, "Samo aktivnim oglasima možete mijenjati naslov i opis");
        Oglas stariOglas;

        if (pristup) {
            stariOglas = oglasRepository.findById(id).get();
        } else {
            return false;
        }
        if (noviOglas.getNaslov().isBlank() || noviOglas.getNaslov() == null) {
            throw new RequestDeniedException("Naslov ne smije biti prazan");
        }
        if (noviOglas.getOpis().isBlank() || noviOglas.getOpis() == null) {
            throw new RequestDeniedException("Opis ne smije biti prazan");
        }
        stariOglas.setNaslov(noviOglas.getNaslov());
        stariOglas.setOpis(noviOglas.getOpis());

        oglasRepository.save(stariOglas);
        return true;
    }

    @Override
    public boolean obrisiOglas (Long id, User user, String poruka) throws MessagingException, UnsupportedEncodingException {
        Optional<Oglas> optionalOglas = oglasRepository.findById(id);

        RegistriraniKorisnik korisnikPoUsername = regKorisnikService.findByKorisnickoIme(user.getUsername()).get();
        if (korisnikPoUsername.isModerator()) {
            var upiti = upitService.listUpitByOglas(optionalOglas.get());
            for (Upit upit : upiti) {
                upitRepository.deleteById(upit.getId());
            }
            oglasRepository.deleteById(id);
            mailNakonObrisanog(optionalOglas.get(), poruka);
            return true;
        }
        else {
            boolean pristup = provjeraPristupa(id, user, "Samo aktivne oglase možete izbrisati");
            if (pristup) {
                var upiti = upitService.listUpitByOglas(optionalOglas.get());
                for (Upit upit : upiti) {
                    upitRepository.deleteById(upit.getId());
                }
                oglasRepository.deleteById(id);
                return true;
            } else {
                return false;
            }
        }
    }

    @Override
    public Optional<Oglas> dohvatiOglasPoId(Long id) {
        return oglasRepository.findById(id);
    }

    @Override
    public List<Oglas> filtrirajOglase(Smjer smjer, Kategorija kategorija, String kolegij_ime) {
        List<Oglas> filtriranaLista = oglasRepository.findAllByAktivan(true);
        Predicate<Oglas> poSmjeru = oglas -> oglas.getKolegij().getSmjer().equals(smjer);
        Predicate<Oglas> poKategoriji = oglas -> oglas.getKategorija().equals(kategorija);
        Predicate<Oglas> poKolegiju = oglas -> oglas.getKolegij().getIme().equals(kolegij_ime);

        if (smjer == null) {
        } else if (smjer.equals(Smjer.R) || smjer.equals(Smjer.E)) {
            filtriranaLista = filtriranaLista.stream().filter(poSmjeru).collect(Collectors.toList());
        } else {
            throw new RequestDeniedException("Smjer mora biti E ili R");
        }
        if (kategorija != null) {
            filtriranaLista = filtriranaLista.stream().filter(poKategoriji).collect(Collectors.toList());
        }
        if (kolegijService.getKolegiji().stream().map(Kolegij::getIme).toList().contains(kolegij_ime)) {
            filtriranaLista = filtriranaLista.stream().filter(poKolegiju).collect(Collectors.toList());
        } else if (kolegij_ime.equals("")) {
        } else {
            throw new NotFoundException("Odabrani kolegij se ne nalazi na popisu dostupnih kolegija");
        }

        return filtriranaLista;
    }

    public boolean provjeraPristupa (Long id, User user, String errMsg) {
        Optional<Oglas> postojiOglas = oglasRepository.findById(id);
        RegistriraniKorisnik autorOglasa;
        RegistriraniKorisnik korisnikPoUsername = regKorisnikService.findByKorisnickoIme(user.getUsername()).get();
        Oglas stariOglas;

        if (!postojiOglas.isPresent()) {
            return false;
        } else {
            stariOglas = postojiOglas.get();
        }
        if (!stariOglas.isAktivan()) {
            throw new RequestDeniedException(errMsg);
        }
        autorOglasa = stariOglas.getKreator();
        if (!autorOglasa.equals(korisnikPoUsername)) {
            throw new RequestDeniedException("Pokušali ste izmijeniti oglas korisnika " + autorOglasa.getKorisnickoIme()
                    + " prijavljeni kao " + user.getUsername());
        }
        return true;
    }

    public List<OglasUpitiDTO> aktivniOglasiUpiti(Long idKreatora, boolean aktivnost) {
        List<Oglas> aktivniOglasi = new ArrayList<>();

        List<OglasUpitiDTO> oglasiPlusUpiti = new ArrayList<>();

        if (aktivnost) {
            aktivniOglasi = listSvihAktivnihOglasa();
        } else {
            aktivniOglasi = listSvihNeaktivnihOglasa();
        }
        Optional<RegistriraniKorisnik> kreator = regKorisnikService.findById(idKreatora);
        List<Oglas> korisnikoviAktivni = new ArrayList<>();
        if (kreator.isEmpty()) {
            throw new RequestDeniedException("Ne postoji kreator oglasa!");
        }
        for(Oglas aktivniOglas : aktivniOglasi) {
            if (aktivniOglas.getKreator() == kreator.get()) {
                korisnikoviAktivni.add(aktivniOglas);
            }
        }
        if (korisnikoviAktivni == null) {
            throw new RequestDeniedException("Korisnik nema ni jedan aktivni oglas!");
        }
        for (Oglas korisnikovAktivan: korisnikoviAktivni) {
            List<Upit> upitiZaOglas = upitService.listUpitByOglas(korisnikovAktivan);
            OglasUpitiDTO zaJedanOglas = new OglasUpitiDTO();
            zaJedanOglas.setOglas(korisnikovAktivan);
            zaJedanOglas.setListaUpita(upitiZaOglas);
            oglasiPlusUpiti.add(zaJedanOglas);
        }
        return oglasiPlusUpiti;
    }

    public Oglas promijeniAktivnost(Long id) {
        Optional<Oglas> oglas = dohvatiOglasPoId(id);
        if (oglas.isEmpty()) {
            throw new RequestDeniedException("Ne postoji oglasa!");
        }
        if (oglas.get().isAktivan()) {
            oglas.get().setAktivan(false);
        } else {
            oglas.get().setAktivan(true);
        }
        return oglasRepository.save(oglas.get());
    }

    private void mailNakonObrisanog(Oglas idOglasa, String poruka) throws MessagingException, UnsupportedEncodingException {

        String fromAddress = "sinappsa.team@gmail.com";
        String senderName = "Sinappsa";
        String subject = "UKLONJEN POSTAVLJENI OGLAS";
        String content = "Dragi/a [[autorOglasa]],<br>"
                + "Obavještavamo Vas da je oglas <b>[[naslovOglasa]]</b> uklonjen od strane moderatora.<br>"
                + "Razlog uklanjanja: <b>[[poruka]]</b><br><br>"
                + "LP,<br>"
                + "Tvoj Sinappsa tim";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(idOglasa.getKreator().getEmail());
        helper.setSubject(subject);

        content = content.replace("[[autorOglasa]]", idOglasa.getKreator().getIme() + " " + idOglasa.getKreator().getPrezime());
        content = content.replace("[[naslovOglasa]]", idOglasa.getNaslov());
        content = content.replace("[[poruka]]", poruka);

        helper.setText(content, true);
        mailSender.send(message);
    }
}
