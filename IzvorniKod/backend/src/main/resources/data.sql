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
delete from kolegij where ime = 'Baze podataka';
delete from kolegij where ime = 'Osnove elektrotehnike';
delete from kolegij where ime = 'Fizika 1';
delete from kolegij where ime = 'Elektroenergetika';
delete from kolegij where ime = 'Signali i sustavi';
delete from kolegij where ime = 'Vjerojatnost i statistika';
delete from kolegij where ime = 'Elektronika 2';
delete from kolegij where ime = 'Komunikacijski sustavi';
delete from kolegij where ime = 'Algoritmi i strukture podataka';
delete from kolegij where ime = 'Digitalna logika';

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

delete from registrirani_korisnik where id = -1;
delete from registrirani_korisnik where id = -5;
delete from registrirani_korisnik where id = -3;
delete from registrirani_korisnik where id = -4;
delete from registrirani_korisnik where id = -6;
delete from registrirani_korisnik where id = -7;

insert into kolegij(ime, smjer) values ('Linearna Algebra', 'R');
insert into kolegij(ime, smjer) values('Baze podataka', 'R');
insert into kolegij(ime, smjer) values('Osnove elektrotehnike', 'R');
insert into kolegij(ime, smjer) values('Fizika 1', 'R');
insert into kolegij(ime, smjer) values('Elektroenergetika', 'E');
insert into kolegij(ime, smjer) values('Signali i sustavi', 'E');
insert into kolegij(ime, smjer) values('Vjerojatnost i statistika', 'E');
insert into kolegij(ime, smjer) values('Elektronika 2', 'E');
insert into kolegij(ime, smjer) values('Komunikacijski sustavi', 'E');
insert into kolegij(ime, smjer) values('Algoritmi i strukture podataka', 'R');
insert into kolegij(ime, smjer) values('Digitalna logika', 'R');

insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija) values (-1, 'ivank', 'Ivan', 'Krešo', '2', 'ivan@fer.hr', 'ivanivan', 'false', 0, 0);
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija) values (-5, 'admin', 'a', 'a', '1', 'admin@fer.hr', '$2a$10$7dR1nXFoZCc1I9UMEWxWDO4AIC7CRh66h5O90YlcNk7wo0GqaHoI6', true, 0, 0);
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija) values (-3, 'markop', 'Marko', 'Proserenjak', '3', 'mp@fer.hr', 'markokonj', 'false', 0, 0);
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija) values (-4, 'petarl', 'Petar', 'Lopović', '2', 'pl@fer.hr', 'petarlopov', 'false', 0, 0);
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija) values (-6, 'lucijat', 'Lucija', 'Toto', '1', 'lt@fer.hr', 'totolucija', 'false', 0, 0);
insert into registrirani_korisnik(id, korisnicko_ime, ime, prezime, avatar, email, lozinka, moderator, broj_primljenih_recenzija, suma_primljenih_recenzija) values (-7, 'tamarag', 'Tamara', 'Golub', '3', 'tg@fer.hr', 'pticagolub', 'false', 0, 0);

insert into oglas(id, kreator_id, naslov, opis, aktivan, kategorija, trazim_pomoc) values (-2, -1, 'Zelim error', 'ovo je da izazove error', true, 'LABOS', true);
insert into oglas(id, kreator_id, naslov, opis, aktivan, kategorija, trazim_pomoc) values (-3, -3, 'Matan1 instrukcije', 'Nudim pomoć oko rješavanja zadataka', true, 'GRADIVO', false);
insert into oglas(id, kreator_id, naslov, opis, aktivan, kategorija, trazim_pomoc) values (-4, -4, 'Osnove prvi lab', 'Tražim pomoć za prvi labos iz osnova elektrotehnike', true, 'LABOS', true);
insert into oglas(id, kreator_id, naslov, opis, aktivan, kategorija, trazim_pomoc) values (-5, -6, 'baze dz', 'Tražim pomoć za prvu domaću zadaću iz baza podataka', true, 'GRADIVO', true);
insert into oglas(id, kreator_id, naslov, opis, aktivan, kategorija, trazim_pomoc) values (-6, -7, 'baze dz', 'Nudim pomoć oko rješavanja domaće zadaće iz baza podataka', true, 'GRADIVO', false);

insert into upit(id, autor_upita_id, oglas_id, poruka, stanje_upita) values (-3, -1, -2, 'Ovo je poruka dobrog upita slovo č', 'U_TIJEKU');
insert into upit(id, autor_upita_id, oglas_id, poruka, stanje_upita) values (-4, -3, -6, 'Pomoć oko baza por favor', 'U_TIJEKU');
insert into upit(id, autor_upita_id, oglas_id, poruka, stanje_upita) values (-5, -6, -4, 'Mogu ti ja pomoći oko labosa iz osnova hihi', 'CEKA_OCJENJIVANJE');
insert into upit(id, autor_upita_id, oglas_id, poruka, stanje_upita) values (-6, -7, -3, 'Trebam pomoć oko matana', 'ODBIJEN');
insert into upit(id, autor_upita_id, oglas_id, poruka, stanje_upita) values (-7, -7, -6, 'Pomozi mi oko matana', 'PRIHVACEN');
