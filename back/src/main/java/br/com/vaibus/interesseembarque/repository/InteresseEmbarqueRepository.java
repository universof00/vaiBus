package br.com.vaibus.interesseembarque.repository;

import br.com.vaibus.interesseembarque.entity.InteresseEmbarque;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InteresseEmbarqueRepository extends JpaRepository<InteresseEmbarque, Long> {

    boolean existsByAluno_IdAndParadaViagem_Id(Long alunoId, Long paradaViagemId);

}