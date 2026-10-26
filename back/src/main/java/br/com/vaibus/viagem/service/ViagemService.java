package br.com.vaibus.viagem.service;

import br.com.vaibus.onibus.entity.Onibus;
import br.com.vaibus.onibus.repository.OnibusRepository;
import br.com.vaibus.usuarios.entity.Usuario;
import br.com.vaibus.usuarios.repository.UsuarioRepository;
import br.com.vaibus.viagem.entity.Viagem;
import br.com.vaibus.viagem.repository.ViagemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ViagemService implements ViagemIService {

    private final ViagemRepository viagemRepository;
    private final OnibusRepository onibusRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public void save(Viagem viagem) throws RuntimeException {
        if (viagem == null) {
            throw new RuntimeException("Dados vazios");
        }

        if (viagem.getId() != null) {
            throw new RuntimeException("Não informe id ao cadastrar uma viagem");
        }

        if (viagem.getDataHoraSaida() == null) {
            throw new RuntimeException("Informe a data e hora de saída");
        }

        if (viagem.getOnibus() == null || viagem.getOnibus().getId() == null) {
            throw new RuntimeException("Informe o ônibus da viagem");
        }

        if (viagem.getMotorista() == null || viagem.getMotorista().getId() == null) {
            throw new RuntimeException("Informe o motorista da viagem");
        }

        Onibus onibus = onibusRepository.findById(viagem.getOnibus().getId())
                .orElseThrow(() -> new RuntimeException("Ônibus não encontrado"));

        Usuario motorista = usuarioRepository.findById(viagem.getMotorista().getId())
                .orElseThrow(() -> new RuntimeException("Motorista não encontrado"));

        viagem.setOnibus(onibus);
        viagem.setMotorista(motorista);

        viagemRepository.save(viagem);
    }
}