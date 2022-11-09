package com.example.projekt.service.impl;

import com.example.projekt.dao.UpitRepository;
import com.example.projekt.service.UpitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpitServiceImpl implements UpitService {

    @Autowired
    private UpitRepository upitRepository;

}
