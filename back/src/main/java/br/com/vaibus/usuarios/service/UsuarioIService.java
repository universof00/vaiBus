package br.com.vaibus.usuarios.service;

import br.com.vaibus.usuarios.entity.Usuario;

public interface UsuarioIService {

    void save(Usuario usuario) throws RuntimeException;
}