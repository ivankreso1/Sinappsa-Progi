/* PRAVILA
     1. Ako nesto stavljate u insert, to isto mora bit deletano tu iznad inace bude error
        jer zelite stavit nesto s primary keyom koji vec postoji
     2. Deleteovi moraju ic ovim poretkom, prvo svi upiti pa svi oglasi pa svi kolegiji pa svi korisnici,
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
*/
delete from upit where id = -3;
delete from upit where id = -4;
delete from upit where id = -5;
delete from upit where id = -6;
delete from upit where id = -7;

delete from oglas where id = -2;
delete from oglas where id = -3;
delete from oglas where id = -4;
delete from oglas where id = -5;
delete from oglas where id = -6;

delete from kolegij where id = -1;
delete from kolegij where id = -2;
delete from kolegij where id = -3;
delete from kolegij where id = -4;
delete from kolegij where id = -5;
delete from kolegij where id = -6;
delete from kolegij where id = -7;
delete from kolegij where id = -8;
delete from kolegij where id = -9;
delete from kolegij where id = -10;
delete from kolegij where id = -11;

delete from registrirani_korisnik where id = -1;
delete from registrirani_korisnik where id = -5;
delete from registrirani_korisnik where id = -3;
delete from registrirani_korisnik where id = -4;
delete from registrirani_korisnik where id = -6;
delete from registrirani_korisnik where id = -7;
delete from registrirani_korisnik where id = -8;
delete from registrirani_korisnik where id = -9;
delete from registrirani_korisnik where id = -10;
delete from registrirani_korisnik where id = -11;
delete from registrirani_korisnik where id = -12;
delete from registrirani_korisnik where id = -13;
delete from registrirani_korisnik where id = -14;
delete from registrirani_korisnik where id = -15;
delete from registrirani_korisnik where id = -16;

insert into kolegij(id, ime, smjer) values(-1, 'Linearna algebra', 'R');
insert into kolegij(id, ime, smjer) values(-2, 'Baze podataka', 'R');
insert into kolegij(id, ime, smjer) values(-3, 'Osnove elektrotehnike', 'R');
insert into kolegij(id, ime, smjer) values(-4, 'Fizika 1', 'R');
insert into kolegij(id, ime, smjer) values(-5, 'Elektroenergetika', 'E');
insert into kolegij(id, ime, smjer) values(-6, 'Signali i sustavi', 'E');
insert into kolegij(id, ime, smjer) values(-7, 'Vjerojatnost i statistika', 'E');
insert into kolegij(id, ime, smjer) values(-8, 'Elektronika 2', 'E');
insert into kolegij(id, ime, smjer) values(-9, 'Komunikacijski sustavi', 'E');
insert into kolegij(id, ime, smjer) values(-10, 'Algoritmi i strukture podataka', 'R');
insert into kolegij(id, ime, smjer) values(-11, 'Digitalna logika', 'R');

insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija, enabled) values (-1, 'ivank', 'Ivan', 'Krešo', '2', 'ivan@fer.hr', '$2a$12$1rJXBrD9cwBzd0Akt5BDJ.2Xu2Y9s149tiJwWQXkzQkrim2Z97Mem', 'false', 1, 2, true);
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija, enabled) values (-5, 'admin', 'a', 'a', '1', 'admin@fer.hr', '$2a$10$7dR1nXFoZCc1I9UMEWxWDO4AIC7CRh66h5O90YlcNk7wo0GqaHoI6', true, 3, 10, true);     -- sifra = ivanivan
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija, enabled) values (-3, 'markop', 'Marko', 'Prosenjak', '3', 'mp@fer.hr', '$2a$12$Ax6JajgkLV9vIsfsjDdKvuVn8GKh06LCUXl13IjFx7iQ/kxeMSYGm', 'false', 4, 9, true);  -- sifra = markopros
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija, enabled) values (-4, 'petarl', 'Petar', 'Lopović', '2', 'pl@fer.hr', '$2a$12$/kHrBqy4gH5XEUgr7Q9Jue0b9uFaTr/DM5cPkiR6opDOv1df1uf2a', 'false', 0, 0, true);   -- sifra = petarlopov
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija, enabled) values (-6, 'lucijat', 'Lucija', 'Toto', '1', 'lt@fer.hr', '$2a$10$nxYU1X0/oibYTqcAjelo0eL5a/wlHSkw47eMpl/LygbNnFjXzVDNa', 'false', 0, 0, true);     -- ova sifra je bbbbb, samo enkriptirano
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija, enabled) values (-7, 'tamarag', 'Tamara', 'Golub', '3', 'bk53409@fer.hr', 'pticagolub', 'false', 0, 0, true);
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija, enabled) values (-8, 'ivank8', 'Ivan', 'Krešo', '2', 'ivan8@fer.hr', 'ivanivan', 'false', 5, 12, true);
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija, enabled) values (-9, 'ivank9', 'Ivan', 'Krešo', '2', 'ivan9@fer.hr', 'ivanivan', 'false', 4, 17, true);
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija, enabled) values (-10, 'ivank10', 'Ivan', 'Krešo', '2', 'ivan10@fer.hr', 'ivanivan', 'false', 2, 10, true);
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija, enabled) values (-11, 'ivank11', 'Ivan', 'Krešo', '2', 'ivan11@fer.hr', 'ivanivan', 'false', 3, 15, true);
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija, enabled) values (-12, 'ivank12', 'Ivan', 'Krešo', '2', 'ivan12@fer.hr', 'ivanivan', 'false', 0, 0, true);
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija, enabled) values (-13, 'ivank13', 'Ivan', 'Krešo', '2', 'ivan13@fer.hr', 'ivanivan', 'false', 12, 41, true);
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija, enabled) values (-14, 'ivank14', 'Ivan', 'Krešo', '2', 'ivan14@fer.hr', 'ivanivan', 'false', 5, 17, true);
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija, enabled) values (-15, 'ivank15', 'Ivan', 'Krešo', '2', 'ivan15@fer.hr', 'ivanivan', 'false', 1, 3, true);
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija, enabled) values (-16, 'ivank16', 'Ivan', 'Krešo', '2', 'ivan16@fer.hr', 'ivanivan', 'false', 2, 7, true);

insert into oglas(id, kreator_id, naslov, opis, kolegij_id, aktivan, kategorija, trazim_pomoc) values (-2, -1, 'Zelim error', 'ovo je da izazove error', -10, true, 'LABOS', true);
insert into oglas(id, kreator_id, naslov, opis, kolegij_id, aktivan, kategorija, trazim_pomoc) values (-3, -3, 'Linalg instrukcije', 'Nudim pomoć oko rješavanja zadataka', -1, true, 'GRADIVO', false);
insert into oglas(id, kreator_id, naslov, opis, kolegij_id, aktivan, kategorija, trazim_pomoc) values (-4, -4, 'Osnove prvi lab', 'Tražim pomoć za prvi labos iz osnova elektrotehnike', -3, true, 'LABOS', false);
insert into oglas(id, kreator_id, naslov, opis, kolegij_id, aktivan, kategorija, trazim_pomoc) values (-5, -6, 'baze dz', 'Tražim pomoć za prvu domaću zadaću iz baza podataka', -2, false, 'GRADIVO', true);
insert into oglas(id, kreator_id, naslov, opis, kolegij_id, aktivan, kategorija, trazim_pomoc) values (-6, -7, 'baze dz', 'Nudim pomoć oko rješavanja domaće zadaće iz baza podataka', -2, true, 'GRADIVO', false);

insert into upit(id, autor_upita_id, oglas_id, poruka, stanje_upita) values (-3, -1, -2, 'Ovo je poruka dobrog upita slovo č', 'U_TIJEKU');
insert into upit(id, autor_upita_id, oglas_id, poruka, stanje_upita) values (-4, -3, -6, 'Pomoć oko baza por favor', 'U_TIJEKU');
insert into upit(id, autor_upita_id, oglas_id, poruka, stanje_upita) values (-5, -6, -4, 'Meni treba pomoć oko labosa iz osnova', 'CEKA_OCJENJIVANJE');
insert into upit(id, autor_upita_id, oglas_id, poruka, stanje_upita) values (-6, -7, -5, 'Trebam pomoć oko matana', 'U_TIJEKU');
insert into upit(id, autor_upita_id, oglas_id, poruka, stanje_upita) values (-8, -8, -5, 'Novi upit', 'U_TIJEKU');
insert into upit(id, autor_upita_id, oglas_id, poruka, stanje_upita) values (-7, -7, -6, 'Pomozi mi oko matana', 'PRIHVACEN');
