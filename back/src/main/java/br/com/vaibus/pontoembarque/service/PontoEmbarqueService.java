package br.com.vaibus.pontoembarque.service;

import br.com.vaibus.onibus.entity.Onibus;
import br.com.vaibus.onibus.repository.OnibusRepository;
import br.com.vaibus.paradaviagem.enums.StatusParadaViagem;
import br.com.vaibus.pontoembarque.entity.PontoEmbarque;
import br.com.vaibus.pontoembarque.repository.PontoEmbarqueRepository;
import br.com.vaibus.viagem.enums.StatusViagem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<PontoEmbarque> listarTodos() {
        return pontoEmbarqueRepository.findAll();
    }

    @Override
    public List<Onibus> findOnibusDisponiveis(Long pontoId) throws RuntimeException {
        if (pontoId == null) {
            throw new RuntimeException("Informe o ponto de embarque");
        }

        if (!pontoEmbarqueRepository.existsById(pontoId)) {
            throw new RuntimeException("Ponto de embarque não encontrado");
        }

        return pontoEmbarqueRepository.findOnibusDisponiveis(
                pontoId,
                List.of(StatusViagem.AGENDADA, StatusViagem.EM_ANDAMENTO),
                List.of(
                        StatusParadaViagem.AGUARDANDO_ONIBUS,
                        StatusParadaViagem.ONIBUS_NO_PONTO
                )
        );
    }
}