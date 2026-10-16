import React from "react";
import Icon from "./Icon";

function TripProgress({ origin, destination }) {
  return (
    <div
      className="trip-progress"
      aria-label={`Trajeto de ${origin} até ${destination}`}
    >
      <div className="progress-track">
        <span className="progress-complete" />
        <span className="progress-node origin-node" />
        <span className="progress-node user-node" />

        <span className="progress-bus">
          <Icon name="bus" size={18} />
        </span>

        <span className="progress-node destination-node" />
      </div>

      <div className="progress-labels">
        <span>{origin}</span>
        <span>Você</span>
        <span>{destination}</span>
      </div>
    </div>
  );
}

function TripCard({
  trip,
  presenceConfirmed,
  onConfirmPresence,
  onFollowBus,
}) {
  return (
    <article className="trip-card">
      <h2>Sua viagem de hoje</h2>

      <div className="trip-heading">
        <span className="trip-bus-icon">
          <Icon name="bus" size={27} />
        </span>

        <strong className="trip-route">
          {trip.origin}
          <span aria-hidden="true">↔</span>
          {trip.destination}
        </strong>

        <span className="trip-status">
          <Icon name="signal" size={16} />
          {trip.status}
        </span>
      </div>

      <div className="trip-details">
        <div>
          <span>Chegada prevista</span>
          <strong className="arrival-time">{trip.arrival}</strong>
        </div>

        <div>
          <span>Próximo ponto</span>
          <strong>{trip.nextStop}</strong>
        </div>
      </div>

      <TripProgress
        origin={trip.origin}
        destination={trip.destination}
      />

      <div className="trip-buttons">
        <button
          className="primary-button"
          type="button"
          onClick={onFollowBus}
        >
          <Icon name="bus" size={22} />
          Acompanhar ônibus
        </button>

        <button
          className={`secondary-button ${
            presenceConfirmed ? "confirmed" : ""
          }`}
          type="button"
          aria-pressed={presenceConfirmed}
          onClick={onConfirmPresence}
        >
          <Icon name="users" size={22} />

          {presenceConfirmed
            ? "Presença confirmada"
            : "Confirmar presença"}
        </button>
      </div>
    </article>
  );
}

export default TripCard;