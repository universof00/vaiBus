import React, { useState } from "react";
import MapSection from "../components/MapSection";
import TripCard from "../components/TripCard";
import BottomNavigation from "../components/BottomNavigation";
import Icon from "../components/Icon";
import "../style/Home.css";

const tripData = {
  origin: "Uibaí",
  destination: "Faculdade",
  arrival: "21:38",
  nextStop: "Praça da Prefeitura",
  status: "Ônibus a caminho",
};

function Home() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("inicio");
  const [presenceConfirmed, setPresenceConfirmed] = useState(false);

  function handleFollowBus() {
    console.log("Abrir acompanhamento do ônibus");
  }

  return (
    <main className="home">
      <MapSection />

      <section className="home-content">
        <span className="drag-handle" aria-hidden="true" />

        <div className="welcome">
          <h1>Boa noite, Lucas</h1>
          <p>Pronto para sua próxima viagem?</p>
        </div>

        <div className="search-container">
          <label className="search-field">
            <span className="visually-hidden">
              Buscar ponto ou rota
            </span>

            <Icon name="search" size={23} />

            <input
              type="search"
              value={search}
              placeholder="Buscar ponto ou rota"
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <button
            className="schedule-button"
            type="button"
            aria-label="Consultar horários"
          >
            <Icon name="calendar" size={25} />
          </button>
        </div>

        <TripCard
          trip={tripData}
          presenceConfirmed={presenceConfirmed}
          onConfirmPresence={() =>
            setPresenceConfirmed((current) => !current)
          }
          onFollowBus={handleFollowBus}
        />

        <button className="recent-stop" type="button">
          <span className="recent-stop-icon">
            <Icon name="history" size={25} />
          </span>

          <span className="recent-stop-text">
            <small>Último ponto utilizado</small>
            <strong>{tripData.nextStop}</strong>
          </span>

          <Icon name="chevron" size={22} />
        </button>
      </section>

      <BottomNavigation
        activeTab={activeTab}
        onChange={setActiveTab}
      />
    </main>
  );
}

export default Home;