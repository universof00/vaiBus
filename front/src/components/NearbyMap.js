import React from "react";
import Icon from "./Icon";

const nearbyStops = [
  { id: 1, top: "29%", left: "24%", name: "Ponto União" },
  { id: 2, top: "42%", left: "43%", name: "Ponto Avenida Central" },
  { id: 3, top: "42%", left: "63%", name: "Ponto Faculdade" },
  { id: 4, top: "74%", left: "67%", name: "Ponto Praça Sul" },
  { id: 5, top: "83%", left: "35%", name: "Ponto Rua Principal" },
];

function BusStopMarker({ top, left, name }) {
  return (
    <button
      className="nearby-map-marker"
      style={{ top, left }}
      type="button"
      aria-label={name}
    >
      <Icon name="bus" size={14} />
    </button>
  );
}

function NearbyMap() {
  return (
    <section
      className="nearby-map"
      aria-label="Mapa dos pontos de ônibus próximos"
    >
      <svg
        className="nearby-map-background"
        viewBox="0 0 430 330"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect width="430" height="330" fill="#e8eeec" />

        <path
          className="map-green-area"
          d="M0 0h92l35 76-53 44H0Z"
        />

        <path
          className="map-green-area"
          d="m323 212 107-55v173H362l-48-61Z"
        />

        <path
          className="map-green-area"
          d="m0 235 75-30 62 125H0Z"
        />

        <g className="map-road">
          <path d="M-10 119 442 120" />
          <path d="M28 330 320-10" />
          <path d="M89 330 380-8" />
          <path d="M167 337 439 22" />
          <path d="M-16 276 321 0" />
          <path d="M-15 228 270 0" />
          <path d="M73 329 430 111" />
          <path d="M10 169 288 330" />
          <path d="M70 80 400 286" />
          <path d="M126 10 430 228" />
          <path d="M175-10 430 165" />
          <path d="M216-10 430 107" />
        </g>

        <g className="map-road-thin">
          <path d="M39 151 218 329" />
          <path d="M93 92 355 329" />
          <path d="M144 52 430 308" />
          <path d="M21 296 302 25" />
          <path d="M123 330 419 50" />
        </g>
      </svg>

      <span className="map-region-label map-uniao">União</span>

      <span className="map-street-label street-one">
        Rua dos Ipês
      </span>

      <span className="map-street-label street-two">
        Av. São João
      </span>

      <div className="map-campus">
        <Icon name="graduation" size={17} />
        <span>Faculdade</span>
      </div>

      {nearbyStops.map((stop) => (
        <BusStopMarker
          key={stop.id}
          top={stop.top}
          left={stop.left}
          name={stop.name}
        />
      ))}

      <div className="current-location">
        <span className="current-location-pin">
          <Icon name="pin" size={25} />
        </span>

        <strong>Praça da</strong>
        <span>Prefeitura</span>
      </div>

      <div className="you-are-here">
        <span className="you-dot" />
        Você está aqui
      </div>

      <button
        className="nearby-location-button"
        type="button"
        aria-label="Centralizar minha localização"
      >
        <Icon name="location" size={22} />
      </button>
    </section>
  );
}

export default NearbyMap;