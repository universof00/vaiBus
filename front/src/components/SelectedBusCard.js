import React from "react";
import Icon from "./Icon";

function SelectedBusCard({ bus }) {
  if (!bus) {
    return null;
  }

  return (
    <section
      className="selected-bus-card"
      aria-live="polite"
    >
      <h2>Sua escolha</h2>

      <div className="selected-bus-content">
        <span className="selected-bus-icon">
          <Icon name="bus" size={30} />
        </span>

        <div>
          <strong>{bus.name}</strong>

          <p>
            Chegada prevista:
            <b>{bus.arrival}</b>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SelectedBusCard;