import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ScreenHeader from "../components/ScreenHeader";
import BusList from "../components/BusList";
import SelectedBusCard from "../components/SelectedBusCard";
import BottomNavigation from "../components/BottomNavigation";
import Icon from "../components/Icon";

import "../style/BusSelection.css";

const availableBuses = [
  {
    id: 1,
    name: "Ônibus 01",
    destination: "Faculdade",
    arrival: "18:10",
    status: "No horário",
    statusType: "on-time",
  },
  {
    id: 3,
    name: "Ônibus 03",
    destination: "Faculdade",
    arrival: "18:25",
    status: "5 min atrasado",
    statusType: "delayed",
  },
  {
    id: 7,
    name: "Ônibus 07",
    destination: "Centro",
    arrival: "18:42",
    status: "A caminho",
    statusType: "moving",
  },
];

function BusSelection() {
  const navigate = useNavigate();

  const [selectedBusId, setSelectedBusId] =
    useState(availableBuses[0].id);

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
          <h2>Boa noite, Lucke</h2>
          <p>
            Escolha o ônibus que deseja utilizar hoje.
          </p>
        </div>

        <Icon name="moon" size={25} />
      </section>

      <div className="bus-selection-content">
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