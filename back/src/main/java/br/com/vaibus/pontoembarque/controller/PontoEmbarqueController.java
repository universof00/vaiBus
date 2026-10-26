package br.com.vaibus.pontoembarque.controller;

import br.com.vaibus.pontoembarque.entity.PontoEmbarque;
import br.com.vaibus.pontoembarque.service.PontoEmbarqueIService;
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
@RequestMapping(path = "/pontos-embarque")
@RequiredArgsConstructor
public class PontoEmbarqueController {

    private final PontoEmbarqueIService pontoEmbarqueService;

    @PostMapping(
            path = "/save",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> save(@RequestBody PontoEmbarque pontoEmbarque) {
        pontoEmbarqueService.save(pontoEmbarque);
        return ResponseEntity.status(HttpStatus.CREATED).body(pontoEmbarque);
    }
}