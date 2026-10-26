package br.com.vaibus.pontoembarque.service;

import br.com.vaibus.onibus.entity.Onibus;
import br.com.vaibus.pontoembarque.entity.PontoEmbarque;

import java.util.List;

public interface PontoEmbarqueIService {

    void save(PontoEmbarque pontoEmbarque) throws RuntimeException;

    List<PontoEmbarque> listarTodos() throws RuntimeException;

    List<Onibus> findOnibusDisponiveis(Long pontoId) throws RuntimeException;
}