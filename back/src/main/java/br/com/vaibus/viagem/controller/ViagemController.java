package br.com.vaibus.viagem.controller;

import br.com.vaibus.viagem.entity.Viagem;
import br.com.vaibus.viagem.service.ViagemIService;
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
@RequestMapping(path = "/viagens")
@RequiredArgsConstructor
public class ViagemController {

    private final ViagemIService viagemService;

    @PostMapping(
            path = "/save",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> save(@RequestBody Viagem viagem) {
        viagemService.save(viagem);
        return ResponseEntity.status(HttpStatus.CREATED).body(viagem);
    }
}