package com.example.projekt.rest;

import com.example.projekt.domain.RegistriraniKorisnik;
import com.example.projekt.service.RegKorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;

// pribavlja detalje korisnika na temelju usernamea (koji je kod nas i zapravo username tj. korisnickoIme)
@Service
public class KorisnikUserDetailsService implements UserDetailsService {

    @Value("${progi.admin.password}")          // pise u application.properties -> property injection, taj hash je 'passs'
    private String adminPasswordHash;

    @Autowired
    private RegKorisnikService regKorisnikService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new User(username, dohvatiKodiranuLozinku(username), authorities(username));
    }

    private String dohvatiKodiranuLozinku(String username) {
        if ("admin".equals(username))
            return adminPasswordHash;

        RegistriraniKorisnik regKorisnik = regKorisnikService.findByKorisnickoIme(username).orElseThrow(
                () -> new UsernameNotFoundException("Ne postoji korisnik s korisnickim imenom: " + username)
        );
        return regKorisnik.getLozinka();
    }

    private List<GrantedAuthority> authorities(String username) {

        if ("admin".equals(username))
            return commaSeparatedStringToAuthorityList("ROLE_ADMIN");

        RegistriraniKorisnik regKorisnik = regKorisnikService.findByKorisnickoIme(username).orElseThrow(
                () -> new UsernameNotFoundException("Ne postoji korisnik s korisnickim imenom: " + username)
        );

        if(regKorisnik.isModerator())
            return commaSeparatedStringToAuthorityList("ROLE_ADMIN");

        return commaSeparatedStringToAuthorityList("ROLE_STUDENT_KORISNIK");
    }
}
