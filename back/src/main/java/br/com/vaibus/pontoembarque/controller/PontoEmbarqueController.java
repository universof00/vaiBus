package br.com.vaibus.pontoembarque.controller;

import br.com.vaibus.onibus.entity.Onibus;
import br.com.vaibus.pontoembarque.entity.PontoEmbarque;
import br.com.vaibus.pontoembarque.service.PontoEmbarqueIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<PontoEmbarque>> listar() {
        return ResponseEntity.ok(pontoEmbarqueService.listarTodos());
    }

    @GetMapping(
            path = "/{pontoId}/onibus",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<Onibus>> findOnibusDisponiveis(
            @PathVariable Long pontoId
    ) {
        List<Onibus> onibus = pontoEmbarqueService.findOnibusDisponiveis(pontoId);

        return ResponseEntity.ok(onibus);
    }
}