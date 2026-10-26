package br.com.vaibus.onibus.service;

import br.com.vaibus.onibus.entity.Onibus;
import br.com.vaibus.onibus.repository.OnibusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OnibusService implements OnibusIService {

    private final OnibusRepository onibusRepository;

    @Override
    public void save(Onibus onibus) throws RuntimeException {
        if (onibus == null) {
            throw new RuntimeException("Dados vazios");
        }

        if (onibus.getId() != null) {
            throw new RuntimeException("Não informe id ao cadastrar um ônibus");
        }

        onibusRepository.save(onibus);
    }
}