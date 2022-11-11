package com.example.projekt.service;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@ResponseStatus(BAD_REQUEST)
public class RequestDeniedException extends RuntimeException {
    public RequestDeniedException(String message) {
        super(message);
    }
}