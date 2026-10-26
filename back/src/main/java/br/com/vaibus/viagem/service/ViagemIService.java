package br.com.vaibus.viagem.service;

import br.com.vaibus.viagem.entity.Viagem;

public interface ViagemIService {

    void save(Viagem viagem) throws RuntimeException;
}