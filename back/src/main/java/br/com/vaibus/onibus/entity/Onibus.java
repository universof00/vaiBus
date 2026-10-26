package br.com.vaibus.onibus.entity;

import br.com.vaibus.infraestructure.entity.PersistenceEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "onibus")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Onibus extends PersistenceEntity implements Serializable {

    @Column(name = "identificacao", nullable = false)
    private String identificacao;

    @Column(name = "placa", nullable = false, unique = true)
    private String placa;

    @Column(name = "codigo_qr", nullable = false, unique = true)
    private String codigoQr;
}