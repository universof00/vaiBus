import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginHero from "../components/LoginHero";
import LoginRoleSelector from "../components/LoginRoleSelector";
import LoginForm from "../components/LoginForm";
import Icon from "../components/Icon";

import "../style/Login.css";

function Login() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] =
    useState("student");

  const [error, setError] = useState("");

  async function handleLogin(loginData) {
    try {
      setError("");

      const formData = new URLSearchParams();

      formData.append("email", loginData.identifier);
      formData.append("senha", loginData.password);

      const response = await fetch(
        "http://localhost:8080/usuarios/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const message = await response.text();

        throw new Error(
          message || "E-mail ou senha inválidos."
        );
      }

      const data = await response.json();

      const user = {
        id: data.id,
        nome: data.nome,
        email: data.email,
        tipo: data.tipo,
      };

      const storage = loginData.keepConnected
        ? localStorage
        : sessionStorage;

      // Remove uma possível sessão anterior
      localStorage.removeItem("vaibus_user");
      localStorage.removeItem("vaibus_user_role");
      localStorage.removeItem("vaibus_logado");

      sessionStorage.removeItem("vaibus_user");
      sessionStorage.removeItem("vaibus_user_role");
      sessionStorage.removeItem("vaibus_logado");

      storage.setItem(
        "vaibus_user",
        JSON.stringify(user)
      );

      storage.setItem(
        "vaibus_user_role",
        loginData.role
      );

      storage.setItem("vaibus_logado", "true");

      storage.setItem(
        "vaibus_user_email",
        loginData.identifier
      );

      if (loginData.role === "driver") {
        navigate("/driver/boarding");
        return;
      }

      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  }

  function handleCreateAccount() {
    navigate(`/register?role=${selectedRole}`);
  }

  function handleForgotPassword() {
    navigate("/forgot-password");
  }

  return (
    <main className="login-page">
      <LoginHero />

      <section className="login-card">
        <LoginRoleSelector
          selectedRole={selectedRole}
          onChange={setSelectedRole}
        />

        <LoginForm
          role={selectedRole}
          onLogin={handleLogin}
          onCreateAccount={handleCreateAccount}
          onForgotPassword={handleForgotPassword}
        />

        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}

        <footer className="login-footer">
          <div className="protected-data">
            <span>
              <Icon name="shieldCheck" size={27} />
            </span>

            <p>Seus dados estão protegidos.</p>
          </div>

          <nav aria-label="Informações legais">
            <button type="button">
              Ajuda
            </button>

            <span />

            <button type="button">
              Termos de uso
            </button>
          </nav>
        </footer>
      </section>
    </main>
  );
}

export default Login;