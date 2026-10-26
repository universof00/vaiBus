import React, { useEffect, useRef, useState } from "react";
import {
  Circle,
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import Icon from "./Icon";

// Localização inicial enquanto o GPS do usuário não responde
const IRECE_POSITION = [-11.3033, -41.8553];
const API_URL = "http://localhost:8080";

function MapController({ position, recenterRequest }) {
  const map = useMap();

  const initiallyCentered = useRef(false);
  const lastRecenterRequest = useRef(0);

  // Centraliza automaticamente quando encontra o usuário
  useEffect(() => {
    if (position && !initiallyCentered.current) {
      map.flyTo(
        [position.latitude, position.longitude],
        16
      );

      initiallyCentered.current = true;
    }
  }, [map, position]);

  // Centraliza quando o botão de localização é clicado
  useEffect(() => {
    if (
      position &&
      recenterRequest !== lastRecenterRequest.current
    ) {
      map.flyTo(
        [position.latitude, position.longitude],
        17
      );

      lastRecenterRequest.current = recenterRequest;
    }
  }, [map, position, recenterRequest]);

  return null;
}

function BusStopMarker({
  stop,
  selected,
  onSelect,
}) {
  return (
    <CircleMarker
      center={[stop.latitude, stop.longitude]}
      radius={15}
      pathOptions={{
        color: "#ffffff",
        fillColor: selected ? "#f59e0b" : "#16a34a",
        fillOpacity: 1,
        weight: 3,
      }}
      eventHandlers={{
        click: () => onSelect(stop),
      }}
    >
      <Tooltip
        direction="top"
        offset={[0, -12]}
      >
        {stop.name}
      </Tooltip>

      <Popup>
        <div className="stop-popup">
          <strong>{stop.name}</strong>

          <span>Ponto de embarque disponível</span>

          <button
            type="button"
            onClick={() => onSelect(stop)}
          >
            Escolher este ponto
          </button>
        </div>
      </Popup>
    </CircleMarker>
  );
}

function NearbyMap({ onSelectStop, onLocationChange }) {
  const [position, setPosition] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [recenterRequest, setRecenterRequest] = useState(0);

  // Estado para armazenar os pontos de ônibus próximos
  const [nearbyStops, setNearbyStops] = useState([]);
  const [stopsError, setStopsError] = useState("");
  const [loadingStops, setLoadingStops] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError(
        "Seu navegador não oferece suporte à localização."
      );

      return undefined;
    }

    // Atualiza a localização enquanto o usuário se movimenta
    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        const currentPosition = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
        };

        setPosition(currentPosition);

        if (onLocationChange) {
          onLocationChange(currentPosition);
        }

        setLocationError("");
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError(
            "Permita o acesso à sua localização."
          );
        } else if (
          error.code === error.POSITION_UNAVAILABLE
        ) {
          setLocationError(
            "Não foi possível encontrar sua localização."
          );
        } else {
          setLocationError(
            "A localização demorou para responder."
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

  useEffect(() => {
    async function loadStops() {
      try {
        setLoadingStops(true);
        setStopsError("");

        const response = await fetch(
          `${API_URL}/pontos-embarque`
        );

        if (!response.ok) {
          throw new Error("Não foi possível carregar os pontos.");
        }

        const data = await response.json();

        // Ajusta os nomes vindos do backend
        // para o padrão usado no mapa.
        const formattedStops = data.map((stop) => ({
          id: stop.id,
          name: stop.nome,
          latitude: stop.latitude,
          longitude: stop.longitude,
        }));

        setNearbyStops(formattedStops);
      } catch (error) {
        setStopsError(
          "Não foi possível carregar os pontos de embarque."
        );
      } finally {
        setLoadingStops(false);
      }
    }

    loadStops();
  }, []);

  function handleSelectStop(stop) {
    setSelectedStop(stop);

    // Permite que a página-pai receba o ponto escolhido
    if (onSelectStop) {
      onSelectStop(stop);
    }
  }

  function handleCenterLocation() {
    if (position) {
      setRecenterRequest((current) => current + 1);
    }
  }

  return (
    <section
      className="nearby-map"
      aria-label="Mapa dos pontos de ônibus próximos"
    >
      <MapContainer
        className="nearby-real-map"
        center={IRECE_POSITION}
        zoom={14}
        zoomControl={false}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {nearbyStops.map((stop) => (
          <BusStopMarker
            key={stop.id}
            stop={stop}
            selected={selectedStop?.id === stop.id}
            onSelect={handleSelectStop}
          />
        ))}

        {position && (
          <>
            {/* Margem de precisão informada pelo GPS */}
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

            {/* Posição atual do usuário */}
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
              <Tooltip
                permanent
                direction="top"
                offset={[0, -10]}
              >
                Você está aqui
              </Tooltip>

              <Popup>
                Sua localização atual
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

      <div className="nearby-map-information">
        {loadingStops ? (
          <span>Carregando pontos...</span>
        ) : stopsError ? (
          <span className="location-error">{stopsError}</span>
        ) : locationError ? (
          <span className="location-error">{locationError}</span>
        ) : selectedStop ? (
          <>
            <Icon name="bus" size={17} />

            <span>
              Selecionado: <strong>{selectedStop.name}</strong>
            </span>
          </>
        ) : (
          <>
            <Icon name="location" size={17} />

            <span>Selecione um ponto de embarque</span>
          </>
        )}
      </div>

      <button
        className="nearby-location-button"
        type="button"
        aria-label="Centralizar minha localização"
        onClick={handleCenterLocation}
        disabled={!position}
      >
        <Icon name="location" size={22} />
      </button>
    </section>
  );
}

export default NearbyMap;