import React, { useState } from "react";
import Icon from "./Icon";

function LoginForm({
  role,
  onLogin,
  onCreateAccount,
  onForgotPassword,
}) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [keepConnected, setKeepConnected] =
    useState(true);
  const [showPassword, setShowPassword] =
    useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!identifier.trim() || !password.trim()) {
      setError(
        "Preencha o e-mail ou CPF e a senha."
      );

      return;
    }

    setError("");

    onLogin({
      role,
      identifier,
      password,
      keepConnected,
    });
  }

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit}
    >
      <label
        className="login-field-label"
        htmlFor="login-identifier"
      >
        E-mail ou CPF
      </label>

      <div className="login-input-container">
        <Icon name="profile" size={25} />

        <input
          id="login-identifier"
          type="text"
          value={identifier}
          placeholder="Digite seu e-mail ou CPF"
          autoComplete="username"
          onChange={(event) =>
            setIdentifier(event.target.value)
          }
        />
      </div>

      <label
        className="login-field-label"
        htmlFor="login-password"
      >
        Senha
      </label>

      <div className="login-input-container">
        <Icon name="lock" size={25} />

        <input
          id="login-password"
          type={showPassword ? "text" : "password"}
          value={password}
          placeholder="Digite sua senha"
          autoComplete="current-password"
          onChange={(event) =>
            setPassword(event.target.value)
          }
        />

        <button
          className="password-visibility-button"
          type="button"
          aria-label={
            showPassword
              ? "Ocultar senha"
              : "Mostrar senha"
          }
          onClick={() =>
            setShowPassword((current) => !current)
          }
        >
          <Icon
            name={showPassword ? "eyeOff" : "eye"}
            size={25}
          />
        </button>
      </div>

      <div className="login-options">
        <label className="keep-connected">
          <input
            type="checkbox"
            checked={keepConnected}
            onChange={(event) =>
              setKeepConnected(event.target.checked)
            }
          />

          <span className="custom-checkbox">
            {keepConnected && (
              <Icon name="check" size={16} />
            )}
          </span>

          <span>Manter conectado</span>
        </label>

        <button
          className="forgot-password-button"
          type="button"
          onClick={onForgotPassword}
        >
          Esqueci minha senha
        </button>
      </div>

      {error && (
        <p className="login-error" role="alert">
          {error}
        </p>
      )}

      <button
        className="login-submit-button"
        type="submit"
      >
        Entrar
      </button>

      <div className="login-divider">
        <span />
        <p>ou</p>
        <span />
      </div>

      <button
        className="create-account-button"
        type="button"
        onClick={onCreateAccount}
      >
        <Icon name="userPlus" size={25} />
        Criar uma conta
      </button>
    </form>
  );
}

export default LoginForm;