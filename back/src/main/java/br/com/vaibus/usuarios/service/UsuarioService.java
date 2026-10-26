package br.com.vaibus.usuarios.service;

import br.com.vaibus.usuarios.entity.Usuario;
import br.com.vaibus.usuarios.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService implements UsuarioIService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public void save(Usuario usuario) throws RuntimeException {
        if (usuario == null) {
            throw new RuntimeException("Dados vazios");
        }

        if (usuario.getId() != null) {
            throw new RuntimeException("Não informe id ao cadastrar um usuário");
        }

        if (usuario.getNome() == null || usuario.getNome().isBlank()) {
            throw new RuntimeException("Informe o nome");
        }

        if (usuario.getTelefone() == null || usuario.getTelefone().isBlank()) {
            throw new RuntimeException("Informe o telefone");
        }

        if (usuario.getEmail() == null || usuario.getEmail().isBlank()) {
            throw new RuntimeException("Informe o e-mail");
        }

        if (usuario.getSenha() == null || usuario.getSenha().isBlank()) {
            throw new RuntimeException("Informe a senha");
        }

        if (usuario.getTipo() == null) {
            throw new RuntimeException("Informe o tipo de usuário");
        }

        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("Já existe um usuário com este e-mail");
        }

        usuarioRepository.save(usuario);
    }

    @Override
    public Usuario login(String email, String senha) {
        return usuarioRepository
                .findByEmailAndSenha(email, senha)
                .orElse(null);
    }
}