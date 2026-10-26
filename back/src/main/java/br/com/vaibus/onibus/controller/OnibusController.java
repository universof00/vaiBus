package br.com.vaibus.onibus.controller;

import br.com.vaibus.onibus.entity.Onibus;
import br.com.vaibus.onibus.service.OnibusIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/onibus")
@RequiredArgsConstructor
public class OnibusController {

    private final OnibusIService onibusService;

    @PostMapping(
            path = "/save",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> save(@RequestBody Onibus onibus) {
        onibusService.save(onibus);
        return ResponseEntity.status(HttpStatus.CREATED).body(onibus);
    }
}