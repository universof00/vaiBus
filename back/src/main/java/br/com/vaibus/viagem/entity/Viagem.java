package br.com.vaibus.viagem.entity;

import br.com.vaibus.infraestructure.entity.PersistenceEntity;
import br.com.vaibus.onibus.entity.Onibus;
import br.com.vaibus.usuarios.entity.Usuario;
import br.com.vaibus.viagem.enums.StatusViagem;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "viagens")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Viagem extends PersistenceEntity implements Serializable {

    @Column(name = "data_hora_saida", nullable = false)
    private LocalDateTime dataHoraSaida;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusViagem status = StatusViagem.AGENDADA;

    @Column(name = "latitude_atual")
    private Double latitudeAtual;

    @Column(name = "longitude_atual")
    private Double longitudeAtual;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "onibus_id", nullable = false)
    private Onibus onibus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "motorista_id", nullable = false)
    private Usuario motorista;
}