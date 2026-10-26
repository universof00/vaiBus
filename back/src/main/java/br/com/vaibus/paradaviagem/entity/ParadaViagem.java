package br.com.vaibus.paradaviagem.entity;

import br.com.vaibus.infraestructure.entity.PersistenceEntity;
import br.com.vaibus.paradaviagem.enums.StatusParadaViagem;
import br.com.vaibus.pontoembarque.entity.PontoEmbarque;
import br.com.vaibus.viagem.entity.Viagem;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(
        name = "paradas_viagem",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"viagem_id", "ponto_embarque_id"})
        }
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ParadaViagem extends PersistenceEntity implements Serializable {

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusParadaViagem status = StatusParadaViagem.AGUARDANDO_ONIBUS;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "viagem_id", nullable = false)
    private Viagem viagem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ponto_embarque_id", nullable = false)
    private PontoEmbarque pontoEmbarque;
}