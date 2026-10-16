import React from "react";
import Icon from "./Icon";

function BoardingProgress({ boarded, total }) {
  const percentage = Math.round(
    (boarded / total) * 100
  );

  return (
    <section className="boarding-section">
      <div className="boarding-title">
        <h2>
          {boarded} de {total} alunos embarcaram
        </h2>

        <span>{percentage}%</span>
      </div>

      <div
        className="boarding-progress"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax={total}
        aria-valuenow={boarded}
        aria-label={`${boarded} de ${total} alunos embarcaram`}
      >
        <span
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="boarding-message">
        <span className="boarding-message-icon">
          <Icon name="users" size={25} />
        </span>

        <div>
          <strong>Viaje com mais tranquilidade</strong>

          <p>
            Confirme sua presença e saiba quem está
            esperando!
          </p>
        </div>
      </div>
    </section>
  );
}

export default BoardingProgress;