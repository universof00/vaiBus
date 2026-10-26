import React from "react";
import Icon from "./Icon";

function BusStatus({ type, children }) {
  return (
    <span className={`bus-status bus-status-${type}`}>
      <span className="bus-status-dot" />
      {children}
    </span>
  );
}

function BusList({ buses, selectedBusId, onSelect }) {
  return (
    <section
      className="bus-list-container"
      aria-labelledby="bus-list-title"
    >
      <h2 id="bus-list-title" className="visually-hidden">
        Ônibus disponíveis
      </h2>

      <div className="bus-table-header" aria-hidden="true">
        <span>Ônibus</span>
        <span>Chegada</span>
        <span>Situação</span>
      </div>

      <div className="bus-list">
        {buses.map((bus) => {
          const selected = selectedBusId === bus.id;

          return (
            <label
              key={bus.id}
              className={`bus-row ${
                selected ? "bus-row-selected" : ""
              }`}
            >
              <input
                type="radio"
                name="selectedBus"
                value={bus.id}
                checked={selected}
                onChange={() => onSelect(bus.id)}
              />

              <span className="custom-radio" />

              <span className="bus-name">
                <span className="bus-icon">
                  <Icon name="bus" size={22} />
                </span>

                <strong>{bus.name}</strong>
              </span>

              <span className="bus-arrival">
                {bus.arrival}
              </span>

              <BusStatus type={bus.statusType}>
                {bus.status}
              </BusStatus>
            </label>
          );
        })}
      </div>
    </section>
  );
}

export default BusList;