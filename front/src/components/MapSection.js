import React from "react";
import Icon from "./Icon";

function MapButton({ icon, label, notification = false }) {
  return (
    <button className="map-button" type="button" aria-label={label}>
      <Icon name={icon} />

      {notification && (
        <span className="notification-dot" aria-hidden="true" />
      )}
    </button>
  );
}

function MapSection() {
  return (
    <section className="map-section" aria-label="Localização do ônibus">
      <div className="map-background" aria-hidden="true" />

      <header className="map-header">
        <div className="brand">
          <span className="brand-icon">
            <Icon name="bus" size={22} />
          </span>

          <span className="brand-name">
            Vai<span>Bus</span>
          </span>
        </div>

        <div className="map-actions">
          <MapButton icon="qr" label="Abrir leitor de QR Code" />

          <MapButton
            icon="bell"
            label="Abrir notificações"
            notification
          />
        </div>
      </header>

      <svg
        className="route-map"
        viewBox="0 0 430 380"
        role="img"
        aria-label="Rota entre a praça e a faculdade"
      >
        <path className="street" d="M-20 65 460 290" />
        <path className="street" d="M50-20 390 400" />
        <path className="street" d="M-20 300 440 72" />
        <path className="street" d="M0 180 430 340" />

        <polyline
          className="route-shadow"
          points="97,292 180,285 225,265 245,220 270,226 285,186 269,152 275,112 250,93 258,55"
        />

        <polyline
          className="route-line"
          points="97,292 180,285 225,265 245,220 270,226 285,186 269,152 275,112 250,93 258,55"
        />

        <circle className="route-point" cx="97" cy="292" r="7" />
        <circle className="route-point" cx="258" cy="55" r="7" />

        <text className="map-label" x="67" y="250">
          Praça da
        </text>

        <text className="map-label" x="67" y="268">
          Prefeitura
        </text>

        <text className="map-label" x="225" y="30">
          Faculdade
        </text>

        <g transform="translate(278 185)">
          <circle className="bus-halo" r="27" />
          <circle className="bus-marker" r="19" />

          <g className="map-bus-icon" transform="translate(-10 -10) scale(.84)">
            <rect x="5" y="3" width="14" height="17" rx="3" />
            <path d="M5 9h14M8 16h.01M16 16h.01M7 20v2M17 20v2" />
          </g>
        </g>

        <g transform="translate(195 329)">
          <circle className="user-halo" r="22" />
          <circle className="user-position" r="9" />
        </g>
      </svg>

      <div className="map-status">
        <Icon name="bus" size={16} />
        Ônibus a caminho
      </div>

      <button
        className="location-button"
        type="button"
        aria-label="Centralizar minha localização"
      >
        <Icon name="location" size={25} />
      </button>
    </section>
  );
}

export default MapSection;