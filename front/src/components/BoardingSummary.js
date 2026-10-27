import React from "react";
import Icon from "./Icon";

function SummaryCard({
  type,
  value,
  label,
}) {
  return (
    <article className={`summary-card summary-card-${type}`}>
      <span className="summary-card-icon">
        <Icon name="user" size={24} />
      </span>

      <div>
        <strong>{value}</strong>
        <p>{label}</p>
      </div>
    </article>
  );
}

function BoardingSummary({
  confirmed,
  boarded,
}) {
  const missing = Math.max(
    confirmed - boarded,
    0
  );

  const progress =
    confirmed > 0
      ? Math.round((boarded / confirmed) * 100)
      : 0;

  return (
    <section
      className="boarding-summary"
      aria-labelledby="boarding-summary-title"
    >
      <h2 id="boarding-summary-title">
        Situação do embarque
      </h2>

      <div className="boarding-summary-cards">
        <SummaryCard
          type="confirmed"
          value={confirmed}
          label="Confirmaram"
        />

        <SummaryCard
          type="boarded"
          value={boarded}
          label="Embarcaram"
        />

        <SummaryCard
          type="missing"
          value={missing}
          label="Ainda não chegaram"
        />
      </div>

      <div className="boarding-progress">
        <div
          className="boarding-progress-track"
          role="progressbar"
          aria-label="Progresso do embarque"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={progress}
        >
          <div
            className="boarding-progress-value"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="boarding-progress-info">
          <strong>{progress}%</strong>

          <span>
            {boarded} de {confirmed} alunos no ônibus
          </span>
        </div>
      </div>
    </section>
  );
}

export default BoardingSummary;