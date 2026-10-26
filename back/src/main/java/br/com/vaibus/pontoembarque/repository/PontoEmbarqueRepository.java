package br.com.vaibus.pontoembarque.repository;

import br.com.vaibus.pontoembarque.entity.PontoEmbarque;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PontoEmbarqueRepository extends JpaRepository<PontoEmbarque, Long> {
}