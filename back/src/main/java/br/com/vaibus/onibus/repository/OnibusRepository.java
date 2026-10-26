package br.com.vaibus.onibus.repository;

import br.com.vaibus.onibus.entity.Onibus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OnibusRepository extends JpaRepository<Onibus, Long> {
}