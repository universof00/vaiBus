package br.com.vaibus.interesseembarque.repository;

import br.com.vaibus.interesseembarque.entity.InteresseEmbarque;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InteresseEmbarqueRepository extends JpaRepository<InteresseEmbarque, Long> {

    boolean existsByAluno_IdAndParadaViagem_Id(Long alunoId, Long paradaViagemId);

    List<InteresseEmbarque> findByParadaViagemViagemId(
            Long viagemId
    );

    Optional<InteresseEmbarque>
    findFirstByAluno_IdAndParadaViagem_Viagem_Onibus_IdOrderByIdDesc(
            Long alunoId,
            Long onibusId
    );
}