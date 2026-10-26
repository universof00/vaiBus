package br.com.vaibus.paradaviagem.repository;

import br.com.vaibus.paradaviagem.entity.ParadaViagem;
import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParadaViagemRepository extends JpaRepository<ParadaViagem, Long> {

    boolean existsByViagem_IdAndPontoEmbarque_Id(Long viagemId, Long pontoEmbarqueId);

    List<ParadaViagem> findByPontoEmbarque_Id(Long pontoEmbarqueId);
}