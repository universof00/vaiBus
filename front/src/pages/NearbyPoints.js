import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import NearbyMap from "../components/NearbyMap";
import NearbyPointCard from "../components/NearbyPointCard";
import BottomNavigation from "../components/BottomNavigation";
import "../style/NearbyPoints.css";

const selectedPoint = {
  id: 1,
  name: "Ponto Praça da Prefeitura",
  distance: "320 m",
  nextBus: "10 min",
};

function NearbyPoints() {
  const [activeTab, setActiveTab] = useState("mapa");
  const [pointConfirmed, setPointConfirmed] = useState(false);

  function handleSelectPoint() {
    setPointConfirmed(true);

    // Futuramente, você poderá navegar para outra página:
    // navigate("/viagens");
  }

  return (
    <main className="nearby-page">
      <PageHeader title="Pontos próximos" />

      <NearbyMap />

      <NearbyPointCard
        point={selectedPoint}
        selected={pointConfirmed}
        onSelect={handleSelectPoint}
      />

      <div className="nearby-empty-space" />

      <BottomNavigation
        activeTab={activeTab}
        onChange={setActiveTab}
      />
    </main>
  );
}

export default NearbyPoints;