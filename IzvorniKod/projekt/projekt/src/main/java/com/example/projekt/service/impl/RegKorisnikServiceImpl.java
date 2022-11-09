package com.example.projekt.service.impl;

import com.example.projekt.dao.RegKorisnikRepository;
import com.example.projekt.service.RegKorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegKorisnikServiceImpl implements RegKorisnikService {

    @Autowired
    private RegKorisnikRepository regKorisnikRepository;
}
