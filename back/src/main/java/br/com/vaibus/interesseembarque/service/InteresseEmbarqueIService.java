package br.com.vaibus.interesseembarque.service;

import br.com.vaibus.interesseembarque.entity.InteresseEmbarque;
import br.com.vaibus.interesseembarque.enums.StatusInteresseEmbarque;

import java.util.Map;

public interface InteresseEmbarqueIService {

    void save(InteresseEmbarque interesseEmbarque) throws RuntimeException;

    InteresseEmbarque registrar(
            String email,
            Long pontoEmbarqueId,
            Long onibusId
    );

    Map<String, Object> buscarControleEmbarque(
            Long viagemId
    );

    void atualizarStatus(
            Long interesseId,
            StatusInteresseEmbarque status
    );
}