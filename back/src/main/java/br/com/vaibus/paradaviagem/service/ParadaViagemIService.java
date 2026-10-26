package br.com.vaibus.paradaviagem.service;

import br.com.vaibus.paradaviagem.entity.ParadaViagem;

import java.util.List;

public interface ParadaViagemIService {

    void save(ParadaViagem paradaViagem) throws RuntimeException;

    List<ParadaViagem> buscarPorPontoEmbarque(Long pontoEmbarqueId);
}