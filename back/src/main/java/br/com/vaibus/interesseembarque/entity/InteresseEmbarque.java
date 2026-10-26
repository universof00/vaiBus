package br.com.vaibus.interesseembarque.entity;

import br.com.vaibus.infraestructure.entity.PersistenceEntity;
import br.com.vaibus.interesseembarque.enums.StatusInteresseEmbarque;
import br.com.vaibus.paradaviagem.entity.ParadaViagem;
import br.com.vaibus.usuarios.entity.Usuario;
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
import java.time.LocalDateTime;

@Entity
@Table(
        name = "interesses_embarque",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"aluno_id", "parada_viagem_id"})
        }
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InteresseEmbarque extends PersistenceEntity implements Serializable {

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusInteresseEmbarque status = StatusInteresseEmbarque.PENDENTE;

    @Column(name = "horario_embarque")
    private LocalDateTime horarioEmbarque;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aluno_id", nullable = false)
    private Usuario aluno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parada_viagem_id", nullable = false)
    private ParadaViagem paradaViagem;
}