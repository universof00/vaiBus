package br.com.vaibus.paradaviagem.service;

import br.com.vaibus.paradaviagem.entity.ParadaViagem;
import br.com.vaibus.paradaviagem.repository.ParadaViagemRepository;
import br.com.vaibus.pontoembarque.entity.PontoEmbarque;
import br.com.vaibus.pontoembarque.repository.PontoEmbarqueRepository;
import br.com.vaibus.viagem.entity.Viagem;
import br.com.vaibus.viagem.repository.ViagemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ParadaViagemService implements ParadaViagemIService {

    private final ParadaViagemRepository paradaViagemRepository;
    private final ViagemRepository viagemRepository;
    private final PontoEmbarqueRepository pontoEmbarqueRepository;

    @Override
    public void save(ParadaViagem paradaViagem) throws RuntimeException {
        if (paradaViagem == null) {
            throw new RuntimeException("Dados vazios");
        }

        if (paradaViagem.getId() != null) {
            throw new RuntimeException("Não informe id ao cadastrar uma parada");
        }

        if (paradaViagem.getViagem() == null || paradaViagem.getViagem().getId() == null) {
            throw new RuntimeException("Informe a viagem");
        }

        if (paradaViagem.getPontoEmbarque() == null
                || paradaViagem.getPontoEmbarque().getId() == null) {
            throw new RuntimeException("Informe o ponto de embarque");
        }

        Long viagemId = paradaViagem.getViagem().getId();
        Long pontoId = paradaViagem.getPontoEmbarque().getId();

        if (paradaViagemRepository.existsByViagem_IdAndPontoEmbarque_Id(viagemId, pontoId)) {
            throw new RuntimeException("Este ponto já foi adicionado à viagem");
        }

        Viagem viagem = viagemRepository.findById(viagemId)
                .orElseThrow(() -> new RuntimeException("Viagem não encontrada"));

        PontoEmbarque pontoEmbarque = pontoEmbarqueRepository.findById(pontoId)
                .orElseThrow(() -> new RuntimeException("Ponto de embarque não encontrado"));

        paradaViagem.setViagem(viagem);
        paradaViagem.setPontoEmbarque(pontoEmbarque);

        paradaViagemRepository.save(paradaViagem);
    }
}