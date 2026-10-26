package br.com.vaibus.pontoembarque.service;

import br.com.vaibus.pontoembarque.entity.PontoEmbarque;
import br.com.vaibus.pontoembarque.repository.PontoEmbarqueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PontoEmbarqueService implements PontoEmbarqueIService {

    private final PontoEmbarqueRepository pontoEmbarqueRepository;

    @Override
    public void save(PontoEmbarque pontoEmbarque) throws RuntimeException {
        if (pontoEmbarque == null) {
            throw new RuntimeException("Dados vazios");
        }

        if (pontoEmbarque.getId() != null) {
            throw new RuntimeException("Não informe id ao cadastrar um ponto de embarque");
        }

        pontoEmbarqueRepository.save(pontoEmbarque);
    }
}