import React from "react";
import Icon from "./Icon";

function LoginRoleSelector({
  selectedRole,
  onChange,
}) {
  return (
    <div
      className="login-role-selector"
      role="group"
      aria-label="Escolha o tipo de usuário"
    >
      <button
        type="button"
        className={
          selectedRole === "student" ? "active" : ""
        }
        aria-pressed={selectedRole === "student"}
        onClick={() => onChange("student")}
      >
        <Icon name="graduation" size={26} />
        Aluno
      </button>

      <button
        type="button"
        className={
          selectedRole === "driver" ? "active" : ""
        }
        aria-pressed={selectedRole === "driver"}
        onClick={() => onChange("driver")}
      >
        <Icon name="steeringWheel" size={27} />
        Motorista
      </button>
    </div>
  );
}

export default LoginRoleSelector;