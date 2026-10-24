import React from "react";
import Icon from "./Icon";

import { useNavigate } from "react-router-dom";

function calculateDistance(userPosition, pointPosition) {
  if (!userPosition || !pointPosition) {
    return null;
  }

  const earthRadius = 6371;

  const userLatitude = userPosition.latitude;
  const userLongitude = userPosition.longitude;

  const pointLatitude = pointPosition.latitude;
  const pointLongitude = pointPosition.longitude;

  const latitudeDifference =
    ((pointLatitude - userLatitude) * Math.PI) / 180;

  const longitudeDifference =
    ((pointLongitude - userLongitude) * Math.PI) / 180;

  const firstLatitude = (userLatitude * Math.PI) / 180;
  const secondLatitude = (pointLatitude * Math.PI) / 180;

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(firstLatitude) *
      Math.cos(secondLatitude) *
      Math.sin(longitudeDifference / 2) ** 2;

  const distance =
    2 *
    earthRadius *
    Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return distance;
}

function formatDistance(distanceInKm) {
  if (distanceInKm === null) {
    return "Calculando distância...";
  }

  if (distanceInKm < 1) {
    return `${Math.round(distanceInKm * 1000)} metros`;
  }

  return `${distanceInKm
    .toFixed(1)
    .replace(".", ",")} km`;
}

function NearbyPointCard({
  point,
  userPosition,
  confirmed,
  onConfirm,
}) {
  const distance = calculateDistance(
    userPosition,
    point
  );

  const navigate = useNavigate();

function handleChoosePoint() {
    // Confirma o ponto na página anterior
    onConfirm(point);

    // Abre a tela de ônibus e envia o ponto escolhido
    navigate("/buses", {
      state: {
        selectedPoint: point,
      },
    });
  }

  return (
    <section className="nearby-point-section">
      <article className="nearby-point-card">
        <span className="point-bus-icon">
          <Icon name="bus" size={19} />
        </span>

        <div className="point-information">
          <h2>{point.name}</h2>

          <p>
            <Icon name="walk" size={15} />
            {formatDistance(distance)} de distância
          </p>

          <p>
            <Icon name="bus" size={15} />
            Próximo ônibus:{" "}
            {point.nextBus || "Horário não disponível"}
          </p>
        </div>
      </article>

      <button
        className="use-point-button"
        type="button"
        onClick={handleChoosePoint}
      >
        <Icon name="bus" size={20} />
        Ver ônibus disponíveis
      </button>
      
    </section>
  );
}

export default NearbyPointCard;