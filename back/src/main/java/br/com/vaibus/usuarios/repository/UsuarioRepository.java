package br.com.vaibus.usuarios.repository;

import br.com.vaibus.usuarios.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    boolean existsByEmail(String email);

    Optional<Usuario> findByEmailAndSenha(
            String email,
            String senha
    );

    Optional<Usuario> findByEmail(String email);
}