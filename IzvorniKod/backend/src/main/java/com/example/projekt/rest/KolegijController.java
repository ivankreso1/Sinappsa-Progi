package com.example.projekt.rest;

import com.example.projekt.domain.Kolegij;
import com.example.projekt.rest.dto.CreateKolegijDTO;
import com.example.projekt.service.KolegijService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "https://sheeshmishi-fe.onrender.com")
@RestController
@RequestMapping("/kolegiji")
public class KolegijController {

    @Autowired
    private KolegijService kolegijService;

    @GetMapping
    public List<Kolegij> getKolegiji() {
        return kolegijService.getKolegiji();
    }

    @PostMapping
    @Secured("ROLE_ADMIN")
    public Kolegij postKolegij(@RequestBody CreateKolegijDTO kolegijDTO) {
        return kolegijService.napraviKolegij(kolegijDTO.getNazivKolegija(), kolegijDTO.getSmjer());        // ne slat CreateKolegijDTO klasu u service, za nju samo controller
    }

    @GetMapping("/smjer/{smjer}")
    public List<Kolegij> getKolegijiPoSmjeru(@PathVariable String smjer) {
        return kolegijService.getKolegijiPoSmjeru(smjer);
    }
}
