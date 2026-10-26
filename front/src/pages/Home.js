import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import MapSection from "../components/MapSection";
import BottomNavigation from "../components/BottomNavigation";
import Icon from "../components/Icon";
import "../style/Home.css";


function Home() {
  const [activeTab, setActiveTab] = useState("inicio");
  const navigate = useNavigate();

  return (
    <main className="home">
      <MapSection />

      <section className="home-content">
        <span className="drag-handle" aria-hidden="true" />

        <div className="welcome">
          <h1>Boa noite, {localStorage.getItem("vaibus_user") ? JSON.parse(localStorage.getItem("vaibus_user")).nome : "usuário"}</h1>
          <p>Pronto para sua próxima viagem?</p>
        </div>

        <button
          className="choose-point-button"
          type="button"
          onClick={() => navigate("/nearby")}
        >
          <Icon name="walk" size={20} />
          Escolher Ponto de Embarque
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