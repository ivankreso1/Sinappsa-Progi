package com.example.projekt.rest;

import com.example.projekt.domain.Kolegij;
import com.example.projekt.rest.dto.CreateKolegijDTO;
import com.example.projekt.service.KolegijService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/kolegiji")
public class KolegijController {

    @Autowired
    private KolegijService kolegijService;

//    @GetMapping
//    public String testirajPut() {
//        return "Hello from backend!";
//    }

    @GetMapping
    // @Secured("ROLE_ADMIN")     //  - ak stavis ovo, onda samo sa Basic Auth parametrima admin, pass mozes ovo zvat, inace 401 Unauthorized
    public List<Kolegij> getKolegiji() {
        return kolegijService.getKolegiji();
    }


    @PostMapping
    public Kolegij postKolegij(@RequestBody CreateKolegijDTO kolegijDTO) {
        return kolegijService.napraviKolegij(kolegijDTO.getNazivKolegija(), kolegijDTO.getSmjer());        // ne slat CreateKolegijDTO klasu u service, za nju samo controller
    }

    @GetMapping("/smjer/{smjer}")
    public List<Kolegij> getKolegijiPoSmjeru(@PathVariable String smjer) {
        return kolegijService.getKolegijiPoSmjeru(smjer);
    }

    @DeleteMapping("/{ime}")
    public void deleteKolegij(@PathVariable String ime) {
        kolegijService.izbrisiKolegij(ime);
    }
}
