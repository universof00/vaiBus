package br.com.vaibus.paradaviagem.controller;

import br.com.vaibus.paradaviagem.entity.ParadaViagem;
import br.com.vaibus.paradaviagem.service.ParadaViagemIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/paradas-viagem")
@RequiredArgsConstructor
public class ParadaViagemController {

    private final ParadaViagemIService paradaViagemService;

    @PostMapping(
            path = "/save",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> save(@RequestBody ParadaViagem paradaViagem) {
        paradaViagemService.save(paradaViagem);
        return ResponseEntity.status(HttpStatus.CREATED).body(paradaViagem);
    }

    @GetMapping("/ponto/{pontoEmbarqueId}")
    public ResponseEntity<List<ParadaViagem>> buscarPorPontoEmbarque(
            @PathVariable Long pontoEmbarqueId
    ) {
        return ResponseEntity.ok(
                paradaViagemService.buscarPorPontoEmbarque(
                        pontoEmbarqueId
                )
        );
    }
}