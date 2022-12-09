/* PRAVILA
     1. Ako nesto stavljate u insert, to isto mora bit deletano tu iznad inace bude error
        jer zelite stavit nesto s primary keyom koji vec postoji
     2. Deleteovi moraju ic ovim poretkom, prvo svi kolegiji pa svi upiti pa svi oglasi pa svi korisnici,
        inace npr da prvo obrisete korisnika, a ne oglas, bi vam bacilo error da brisete korisnika ciji id je
        neki atribut u oglas
     3. Insertovi moraju ic redom kolegij, korisnik, oglas, upit, jer nemrete stvorit oglas sa id-om
        nekog korisnika kojeg jos niste kreirali, tj. ajde to mozete ak koristite nekog korisnika kojeg ne kreirate tu
        neg ste ga vec napravili preko postmana/frontenda
     4. Kao id koristite negativne razlicite cijele brojeve, jer baza koristi pozitivne cijele brojeve za
        automatsko generiranje id-a, ovak izbjegavamo error da vise stvari ima isti id
     5. U postgresu mozete u bazi pogledat da se npr kreator atribut tamo zove kreator_id, to se tak automatski napravi
        i to je super jer onda samo tu kao vrijednost atributa kreator_id stavite id korisnika
     PROBLEM -> Tu je napisan npr korisnik s id-om -1, ako onda prek Postmana (ili frontenda kad bude ta opcija postojala)
            napravite npr Oglas ciji kreator je taj korisnik, to ce vam radit dobro sve dok ne pokrenete backend opet, onda ce se DELETEat taj korisnik,
            a vi cete dobit error narusavanja stranog kljuca jer sad sve sto napravite u postmanu ostaje u vasoj bazi ZAUVIJEK
     KOMENTAR -> salim se, ne ostaje zauvijek, al ostaje dok ne izbrisete, to vjerojatno mozete rucno u pg-adminu, al jednostavniji nacin
                je da odete u application.properties i tamo spring.jpa.hibernate.ddl-auto=update promijenite na spring.jpa.hibernate.ddl-auto=create,
                jednom onda pokrenete backend, to ce obrisat bazu od tih Postman dijelova koje ste dodali (al ce se opet stvorit ovi tu iz data.sql tak da nece
                bit skroz prazna tablica), i onda samo vratite na update da radite dalje s lijepom cistom bazom
bla*/

delete from kolegij where ime = 'Linearna Algebra';
delete from upit where id = -3;
delete from oglas where id = -2;
delete from registrirani_korisnik where id = -1;
delete from registrirani_korisnik where id = -5;

insert into kolegij(ime, smjer) values ('Linearna Algebra', 'R');
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija, enabled) values (-1, 'ivank', 'Ivan', 'Krešo', '2', 'ivan@fer.hr', 'ivanivan', 'false', 0, 0, false);
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija, enabled) values (-5, 'admin', 'a', 'a', '1', 'admin@fer.hr', '$2a$10$7dR1nXFoZCc1I9UMEWxWDO4AIC7CRh66h5O90YlcNk7wo0GqaHoI6', true, 0, 0, false);
insert into oglas(id, kreator_id, naslov, opis, aktivan, kategorija, trazim_pomoc) values (-2, -1, 'Zelim error', 'ovo je da izazove error', true, 'LABOS', true);
insert into upit(id, autor_upita_id, oglas_id, poruka, stanje_upita) values (-3, -1, -2, 'Ovo je poruka dobrog upita slovo č', 'U_TIJEKU');