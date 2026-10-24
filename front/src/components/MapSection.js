import React, { useEffect, useRef, useState } from "react";
import {
  Circle,
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import Icon from "./Icon";

const IRECE_POSITION = [-11.3033, -41.8553];

function MapButton({
  icon,
  label,
  notification = false,
  onClick,
}) {
  return (
    <button
      className="map-button"
      type="button"
      aria-label={label}
      onClick={onClick}
    >
      <Icon name={icon} />

      {notification && (
        <span
          className="notification-dot"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

/*
 * Controla a câmera do mapa.
 * Na primeira localização encontrada, o mapa vai até o usuário.
 * Depois, ele só centraliza novamente quando o botão for clicado.
 */
function MapController({ position, recenterRequest }) {
  const map = useMap();
  const initiallyCentered = useRef(false);
  const lastRequest = useRef(0);

  useEffect(() => {
    if (position && !initiallyCentered.current) {
      map.flyTo([position.latitude, position.longitude], 17);
      initiallyCentered.current = true;
    }
  }, [map, position]);

  useEffect(() => {
    if (
      position &&
      recenterRequest !== lastRequest.current
    ) {
      map.flyTo([position.latitude, position.longitude], 17);
      lastRequest.current = recenterRequest;
    }
  }, [map, position, recenterRequest]);

  return null;
}

function MapSection() {
  const [position, setPosition] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [recenterRequest, setRecenterRequest] = useState(0);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError(
        "A localização não é suportada neste dispositivo."
      );
      return undefined;
    }

    /*
     * watchPosition acompanha a posição enquanto o usuário
     * estiver se movimentando.
     */
    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        setPosition({
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
        });

        setLocationError("");
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError(
            "Permita o acesso à localização para aparecer no mapa."
          );
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError(
            "Não foi possível determinar sua localização."
          );
        } else {
          setLocationError(
            "A localização demorou muito para responder."
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 5000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const handleCenterLocation = () => {
    if (position) {
      setRecenterRequest((current) => current + 1);
    }
  };

  return (
    <section
      className="map-section"
      aria-label="Localização do usuário"
    >
      <MapContainer
        className="real-map"
        center={IRECE_POSITION}
        zoom={14}
        zoomControl={false}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {position && (
          <>
            {/* Área aproximada de precisão do GPS */}
            <Circle
              center={[
                position.latitude,
                position.longitude,
              ]}
              radius={position.accuracy}
              pathOptions={{
                color: "#2563eb",
                fillColor: "#60a5fa",
                fillOpacity: 0.12,
                weight: 1,
              }}
            />

            {/* Marcador da posição do usuário */}
            <CircleMarker
              center={[
                position.latitude,
                position.longitude,
              ]}
              radius={9}
              pathOptions={{
                color: "#ffffff",
                fillColor: "#2563eb",
                fillOpacity: 1,
                weight: 4,
              }}
            >
              <Popup>
                <strong>Você está aqui</strong>
                <br />
                Precisão aproximada:{" "}
                {Math.round(position.accuracy)} metros
              </Popup>
            </CircleMarker>
          </>
        )}

        <MapController
          position={position}
          recenterRequest={recenterRequest}
        />
      </MapContainer>

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
          <MapButton
            icon="qr"
            label="Abrir leitor de QR Code"
          />

          <MapButton
            icon="bell"
            label="Abrir notificações"
            notification
          />
        </div>
      </header>

      <div
        className={
          locationError
            ? "map-status map-status-error"
            : "map-status"
        }
      >
        <Icon
          name={locationError ? "location" : "bus"}
          size={16}
        />

        {locationError ||
          (position
            ? "Sua localização foi encontrada"
            : "Procurando sua localização...")}
      </div>

      <button
        className="location-button"
        type="button"
        aria-label="Centralizar minha localização"
        onClick={handleCenterLocation}
        disabled={!position}
      >
        <Icon name="location" size={25} />
      </button>
    </section>
  );
}

export default MapSection;