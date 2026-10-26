import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ScreenHeader from "../components/ScreenHeader";
import BusList from "../components/BusList";
import SelectedBusCard from "../components/SelectedBusCard";
import BottomNavigation from "../components/BottomNavigation";
import Icon from "../components/Icon";

import "../style/BusSelection.css";

const API_URL = "http://localhost:8080";

function BusSelection() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedPoint = location.state?.selectedPoint;

  const [availableBuses, setAvailableBuses] = useState([]);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBuses() {
      if (!selectedPoint) {
        setError("Escolha um ponto de embarque antes.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        // Ajuste esta URL caso a sua rota tenha outro nome.
        const response = await fetch(
          `${API_URL}/pontos-embarque/${selectedPoint.id}/onibus`
        );

        if (!response.ok) {
          throw new Error("Não foi possível buscar os ônibus.");
        }

        const data = await response.json();

        const formattedBuses = data.map((bus) => ({
          id: bus.id,
          name: bus.identificacao,
          destination: "Destino será informado",
          arrival: "Horário não informado",
          status: "Disponível",
          statusType: "on-time",
          placa: bus.placa,
          codigoQr: bus.codigoQr,
        }));

        setAvailableBuses(formattedBuses);

        if (formattedBuses.length > 0) {
          setSelectedBusId(formattedBuses[0].id);
        }
      } catch (error) {
        setError(
          "Não foi possível carregar os ônibus deste ponto."
        );
      } finally {
        setLoading(false);
      }
    }

    loadBuses();
  }, [selectedPoint]);

  const selectedBus = availableBuses.find(
    (bus) => bus.id === selectedBusId
  );

  function handleSelectBus(busId) {
    setSelectedBusId(busId);
  }

  function handleConfirmBus() {
    if (!selectedBus) {
      return;
    }

    navigate("/my-trip", {
      state: {
        selectedBus,
        selectedPoint,
      },
    });
  }

  function handleNavigation(tab) {
    const routes = {
      inicio: "/",
      mapa: "/nearby",
      viagens: "/buses",
      perfil: "/profile",
    };

    if (routes[tab]) {
      navigate(routes[tab]);
    }
  }

  return (
    <main className="bus-selection-page">
      <ScreenHeader
        title="Ônibus que passam neste ponto"
        onNotifications={() => {
          console.log("Abrir notificações");
        }}
      />

      <section className="bus-greeting">
        <div>
          <h2>{localStorage.getItem("vaibus_user") ? JSON.parse(localStorage.getItem("vaibus_user")).nome : "usuário"}</h2>

          <p>
            {selectedPoint
              ? `Escolha um ônibus para ${selectedPoint.name}.`
              : "Escolha o ônibus que deseja utilizar hoje."}
          </p>
        </div>

        <Icon name="moon" size={25} />
      </section>

      <div className="bus-selection-content">
        {loading ? (
          <p>Carregando ônibus disponíveis...</p>
        ) : error ? (
          <p className="bus-error">{error}</p>
        ) : availableBuses.length === 0 ? (
          <p>
            Não existem ônibus disponíveis para este ponto.
          </p>
        ) : (
          <>
            <BusList
              buses={availableBuses}
              selectedBusId={selectedBusId}
              onSelect={handleSelectBus}
            />

            <SelectedBusCard bus={selectedBus} />

            <button
              className="choose-bus-button"
              type="button"
              onClick={handleConfirmBus}
            >
              <Icon name="qr" size={20} />
              Escolher ônibus
            </button>
          </>
        )}
      </div>

      <div className="bus-page-space" />

      <BottomNavigation
        activeTab="viagens"
        onChange={handleNavigation}
      />
    </main>
  );
}

export default BusSelection;