package br.com.vaibus.interesseembarque.service;

import br.com.vaibus.interesseembarque.entity.InteresseEmbarque;
import br.com.vaibus.interesseembarque.enums.StatusInteresseEmbarque;
import br.com.vaibus.interesseembarque.repository.InteresseEmbarqueRepository;
import br.com.vaibus.paradaviagem.entity.ParadaViagem;
import br.com.vaibus.paradaviagem.repository.ParadaViagemRepository;
import br.com.vaibus.usuarios.entity.Usuario;
import br.com.vaibus.usuarios.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class InteresseEmbarqueService implements InteresseEmbarqueIService {

    private final InteresseEmbarqueRepository interesseEmbarqueRepository;
    private final UsuarioRepository usuarioRepository;
    private final ParadaViagemRepository paradaViagemRepository;

    @Override
    public void save(InteresseEmbarque interesseEmbarque) throws RuntimeException {
        if (interesseEmbarque == null) {
            throw new RuntimeException("Dados vazios");
        }

        if (interesseEmbarque.getId() != null) {
            throw new RuntimeException("Não informe id ao demonstrar interesse");
        }

        if (interesseEmbarque.getAluno() == null
                || interesseEmbarque.getAluno().getId() == null) {
            throw new RuntimeException("Informe o aluno");
        }

        if (interesseEmbarque.getParadaViagem() == null
                || interesseEmbarque.getParadaViagem().getId() == null) {
            throw new RuntimeException("Informe a parada da viagem");
        }

        Long alunoId = interesseEmbarque.getAluno().getId();
        Long paradaViagemId = interesseEmbarque.getParadaViagem().getId();

        if (interesseEmbarqueRepository.existsByAluno_IdAndParadaViagem_Id(
                alunoId, paradaViagemId)) {
            throw new RuntimeException("O aluno já demonstrou interesse nesta parada");
        }

        Usuario aluno = usuarioRepository.findById(alunoId)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        ParadaViagem paradaViagem = paradaViagemRepository.findById(paradaViagemId)
                .orElseThrow(() -> new RuntimeException("Parada da viagem não encontrada"));

        interesseEmbarque.setAluno(aluno);
        interesseEmbarque.setParadaViagem(paradaViagem);

        interesseEmbarqueRepository.save(interesseEmbarque);
    }

    @Override
    public InteresseEmbarque registrar(
            String email,
            Long pontoEmbarqueId,
            Long onibusId
    ) {
        Usuario usuario = usuarioRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Usuário não encontrado."
                        )
                );

        ParadaViagem paradaViagem = paradaViagemRepository
                .findFirstByPontoEmbarqueIdAndViagemOnibusId(
                        pontoEmbarqueId,
                        onibusId
                )
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Esse ônibus não passa pelo ponto escolhido."
                        )
                );

        boolean jaRegistrado = interesseEmbarqueRepository
                .existsByAluno_IdAndParadaViagem_Id(
                        usuario.getId(),
                        paradaViagem.getId()
                );

        if (jaRegistrado) {
            throw new IllegalArgumentException(
                    "Você já registrou interesse neste embarque."
            );
        }

        InteresseEmbarque interesse =
                new InteresseEmbarque();

        interesse.setAluno(usuario);
        interesse.setParadaViagem(paradaViagem);

        return interesseEmbarqueRepository.save(interesse);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> buscarControleEmbarque(
            Long viagemId
    ) {
        List<InteresseEmbarque> interesses =
                interesseEmbarqueRepository
                        .findByParadaViagemViagemId(
                                viagemId
                        );

        long confirmaram = interesses.size();

        long embarcaram = interesses.stream()
                .filter(interesse ->
                        interesse.getStatus()
                                == StatusInteresseEmbarque.EMBARCADO
                )
                .count();

        long aindaNaoChegaram = confirmaram - embarcaram;

        int percentual = confirmaram == 0
                ? 0
                : (int) ((embarcaram * 100) / confirmaram);

        List<Map<String, Object>> alunosFaltantes =
                interesses.stream()
                        .filter(interesse ->
                                interesse.getStatus()
                                        != StatusInteresseEmbarque.EMBARCADO
                        )
                        .map(interesse -> {
                            Map<String, Object> aluno =
                                    new HashMap<>();

                            aluno.put(
                                    "interesseId",
                                    interesse.getId()
                            );

                            aluno.put(
                                    "nome",
                                    interesse.getAluno().getNome()
                            );

                            aluno.put(
                                    "ponto",
                                    interesse.getParadaViagem()
                                            .getPontoEmbarque()
                                            .getNome()
                            );

                            aluno.put(
                                    "status",
                                    interesse.getStatus().name()
                            );

                            return aluno;
                        })
                        .toList();

        Map<String, Object> resultado = new HashMap<>();

        resultado.put("confirmaram", confirmaram);
        resultado.put("embarcaram", embarcaram);
        resultado.put(
                "aindaNaoChegaram",
                aindaNaoChegaram
        );
        resultado.put("percentual", percentual);
        resultado.put(
                "alunosFaltantes",
                alunosFaltantes
        );

        return resultado;
    }

    @Override
    public void atualizarStatus(
            Long interesseId,
            StatusInteresseEmbarque status
    ) {
        InteresseEmbarque interesse =
                interesseEmbarqueRepository
                        .findById(interesseId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Interesse não encontrado."
                                )
                        );

        interesse.setStatus(status);

        interesseEmbarqueRepository.save(interesse);
    }
}