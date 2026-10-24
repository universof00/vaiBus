import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import NearbyMap from "../components/NearbyMap";
import NearbyPointCard from "../components/NearbyPointCard";
import BottomNavigation from "../components/BottomNavigation";
import "../style/NearbyPoints.css";

function NearbyPoints() {
  const [activeTab, setActiveTab] = useState("mapa");
  const [pointConfirmed, setPointConfirmed] = useState(false);

  const [userPosition, setUserPosition] =
    useState(null);

  const [selectedPoint, setSelectedPoint] =
    useState(null);

  const [confirmedPoint, setConfirmedPoint] =
    useState(null);

  function handleConfirmPoint(point) {
    setConfirmedPoint(point);

    // Futuramente você poderá salvar no backend:
    console.log("Ponto confirmado:", point);
  }

  return (
    <main className="nearby-page">
      <PageHeader title="Pontos próximos" />

      <NearbyMap
        onSelectStop={setSelectedPoint}
        onLocationChange={setUserPosition}
      />

      {selectedPoint ? (
        <NearbyPointCard
          point={selectedPoint}
          userPosition={userPosition}
          confirmed={
            confirmedPoint?.id === selectedPoint.id
          }
          onConfirm={handleConfirmPoint}
        />
      ) : (
        <p className="select-point-message">
          Toque em um ponto no mapa para visualizar
          suas informações.
        </p>
      )}

      <div className="nearby-empty-space" />

      <BottomNavigation
        activeTab={activeTab}
        onChange={setActiveTab}
      />
    </main>
  );
}

export default NearbyPoints;