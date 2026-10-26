package br.com.vaibus.interesseembarque.controller;

import br.com.vaibus.interesseembarque.entity.InteresseEmbarque;
import br.com.vaibus.interesseembarque.service.InteresseEmbarqueIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/interesses-embarque")
@RequiredArgsConstructor
public class InteresseEmbarqueController {

    private final InteresseEmbarqueIService interesseEmbarqueService;

    @PostMapping(
            path = "/save",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> save(@RequestBody InteresseEmbarque interesseEmbarque) {
        interesseEmbarqueService.save(interesseEmbarque);
        return ResponseEntity.status(HttpStatus.CREATED).body(interesseEmbarque);
    }

    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(
            @RequestParam String email,
            @RequestParam Long pontoEmbarqueId,
            @RequestParam Long onibusId
    ) {
        try {
            interesseEmbarqueService.registrar(
                    email,
                    pontoEmbarqueId,
                    onibusId
            );

            return ResponseEntity.ok(
                    "Interesse de embarque registrado."
            );
        } catch (IllegalArgumentException error) {
            return ResponseEntity
                    .badRequest()
                    .body(error.getMessage());
        }
    }
}