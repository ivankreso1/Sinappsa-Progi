import com.example.projekt.dao.RegKorisnikRepository;
import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.service.RegKorisnikService;
import com.example.projekt.service.RequestDeniedException;
import com.example.projekt.service.impl.RegKorisnikServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(MockitoExtension.class)
public class RegistracijaUnitTests {

    @Mock
    private RegKorisnikRepository regKorisnikRepository;

    RegKorisnikService regKorisnikService;

    List<RegistriraniKorisnik> korisnikArrayList;

    @BeforeEach
    void initService() {
        // service koji koristi umjetni repository kojem cemo rucno zadavat sto vraca
        regKorisnikService = new RegKorisnikServiceImpl(regKorisnikRepository, new BCryptPasswordEncoder());

        // mock podaci u bazi su ova tri korisnika, kad pisem 'when' naredbe, vracam rezultate kao sto bi se i zapravo vratili
        // da su u bazi ova 3 korisnika, npr. ak imamo countByKorisnickoIme("ivek44") to bi vratilo broj 1
        korisnikArrayList = Arrays.asList(new RegistriraniKorisnik("emailAna@fer.hr", "anchy123","Ana", "Anic", "tajnaLozinka", "1"),
                new RegistriraniKorisnik("emailIvo@fer.hr", "ivek44","Ivo", "Ivic", "tajnaLozinka", "2"),
                new RegistriraniKorisnik("emailBrane@fer.hr", "brat_99","Brane", "Branic", "tajnaLozinka", "2"));
    }

    @Test
    public void korisnickoImeNull() {
        Throwable exception = assertThrows(RequestDeniedException.class, () -> regKorisnikService.registriraj("emailLuka@fer.hr", null,"Luka", "Lukic", "tajnaLozinka", "4", "siteURL"));
        assertEquals("Sva polja moraju biti ispunjena", exception.getMessage());
    }

    @Test
    public void emailNull() {
        Throwable exception = assertThrows(RequestDeniedException.class, () -> regKorisnikService.registriraj(null, "lux","Luka", "Lukic", "tajnaLozinka", "4", "siteURL"));
        assertEquals("Sva polja moraju biti ispunjena", exception.getMessage());
    }
    // osim korisickog imena i emaila, null ne smiju biti ni ime, prezime, lozinka i avatar, ali smatram da nema potrebe
    // pisat sve te, skoro identicne, slucajeve pa cu stati na ova 2

    @Test
    public void korisnickoImeEmpty() {
        Throwable exception = assertThrows(RequestDeniedException.class, () -> regKorisnikService.registriraj("emailLuka@fer.hr", "","Luka", "Lukic", "tajnaLozinka", "4", "siteURL"));
        assertEquals("Polja ne smiju biti prazna", exception.getMessage());
    }
    // slicno kao u prethodnom testu, ovakav test bi se osim na korisnickoIme atributu
    // mogao jos provest na email, ime, prezime, lozinka i avatar i rezultat bi bio isti

    @Test
    public void prekratkaLozinka() {
        when(regKorisnikRepository.existsByEmail("emailLuka@fer.hr")).thenReturn(false);
        when(regKorisnikRepository.existsByKorisnickoIme("lux")).thenReturn(false);

        Throwable exception = assertThrows(RequestDeniedException.class, () -> regKorisnikService.registriraj("emailLuka@fer.hr", "lux","Luka", "Lukic", "abcd", "4", "siteURL"));
        assertEquals("Lozinka mora imati barem 5 znakova.", exception.getMessage());
    }

    @Test
    public void postojeciEmail() {
        when(regKorisnikRepository.existsByEmail("emailBrane@fer.hr")).thenReturn(true);

        Throwable exception = assertThrows(RequestDeniedException.class, () -> regKorisnikService.registriraj("emailBrane@fer.hr", "lux","Luka", "Lukic", "abcde", "4", "siteURL"));
        assertEquals("Ova e-mail adresa je vec iskoristena.", exception.getMessage());
    }

    @Test
    public void postojeceKorisnickoIme() {
        when(regKorisnikRepository.existsByKorisnickoIme("ivek44")).thenReturn(true);

        Throwable exception = assertThrows(RequestDeniedException.class, () -> regKorisnikService.registriraj("emailLuka@fer.hr", "ivek44","Luka", "Lukic", "abcde", "4", "siteURL"));
        assertEquals("Ovo korisnicko ime je vec zauzeto.", exception.getMessage());
    }

    @Test
    public void neispravanEmail() {
        Throwable exception = assertThrows(RequestDeniedException.class, () -> regKorisnikService.registriraj("emailLuka@gmail.com", "lux","Luka", "Lukic", "abcde", "4", "siteURL"));
        assertEquals("E-mail adresa " + "emailLuka@gmail.com" + " nije iz FER-ove domene.", exception.getMessage());
    }

    @Test
    public void uspjesanZapisUBazu() throws MessagingException, UnsupportedEncodingException {
        Long randomLong = ThreadLocalRandom.current().nextLong(10, 21);     // random broj izmedu 10 i 20 ukljucivo

        RegistriraniKorisnik korisnikUBazi = new RegistriraniKorisnik("emailLuka@fer.hr", "lux","Luka", "Lukic", "abcde", "4");
        korisnikUBazi.setId(randomLong);

        when(regKorisnikRepository.save(any(RegistriraniKorisnik.class))).thenReturn(korisnikUBazi);

        assertEquals(randomLong, regKorisnikService.registriraj("emailLuka@fer.hr", "lux","Luka", "Lukic", "abcde", "4", "siteURL").getId());
        // ako je to jednako, to znaci da se uspjesno izvrsila svaka linija, tj. da su se prosle sve provjere i da je korisnik zapisan u bazu
    }

}
