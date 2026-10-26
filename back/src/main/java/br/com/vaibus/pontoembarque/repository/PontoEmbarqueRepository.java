package br.com.vaibus.pontoembarque.repository;

import br.com.vaibus.onibus.entity.Onibus;
import br.com.vaibus.paradaviagem.enums.StatusParadaViagem;
import br.com.vaibus.pontoembarque.entity.PontoEmbarque;
import br.com.vaibus.viagem.enums.StatusViagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PontoEmbarqueRepository extends JpaRepository<PontoEmbarque, Long> {

    @Query("""
            SELECT DISTINCT v.onibus
            FROM ParadaViagem pv
            JOIN pv.viagem v
            WHERE pv.pontoEmbarque.id = :pontoId
              AND v.status IN :statusViagem
              AND pv.status IN :statusParada
            """)
    List<Onibus> findOnibusDisponiveis(
            @Param("pontoId") Long pontoId,
            @Param("statusViagem") List<StatusViagem> statusViagem,
            @Param("statusParada") List<StatusParadaViagem> statusParada
    );

}