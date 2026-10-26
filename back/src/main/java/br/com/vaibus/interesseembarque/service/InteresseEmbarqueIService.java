package br.com.vaibus.interesseembarque.service;

import br.com.vaibus.interesseembarque.entity.InteresseEmbarque;

public interface InteresseEmbarqueIService {

    void save(InteresseEmbarque interesseEmbarque) throws RuntimeException;

    InteresseEmbarque registrar(
            String email,
            Long pontoEmbarqueId,
            Long onibusId
    );
}