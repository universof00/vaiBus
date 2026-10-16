import React from "react";
import { useNavigate } from "react-router-dom";

import ScreenHeader from "../components/ScreenHeader";
import StudentInformation from "../components/StudentInformation";
import TripQrCode from "../components/TripQrCode";
import BoardingProgress from "../components/BoardingProgress";
import BottomNavigation from "../components/BottomNavigation";

import "../style/MyTrip.css";

const student = {
  id: 15,
  name: "Lucas Almeida",
  course: "Ciência da Computação",
};

function MyTrip() {
  const navigate = useNavigate();

  function handleNavigation(tab) {
    const routes = {
      inicio: "/",
      mapa: "/nearby",
      viagens: "/my-trip",
      perfil: "/profile",
    };

    if (routes[tab]) {
      navigate(routes[tab]);
    }
  }

  return (
    <main className="my-trip-page">
      <ScreenHeader
        title="Minha viagem"
        onNotifications={() => {
          console.log("Abrir notificações");
        }}
      />

      <section className="my-trip-content">
        <StudentInformation student={student} />

        <div className="trip-qr-container">
          <TripQrCode
            value={`student:${student.id};trip:1`}
          />

          <p>
            Apresente este QR Code ao motorista
            <br />
            no momento do embarque.
          </p>
        </div>

        <div className="trip-divider" />

        <BoardingProgress
          boarded={18}
          total={20}
        />
      </section>

      <div className="my-trip-empty-space" />

      <BottomNavigation
        activeTab="viagens"
        onChange={handleNavigation}
      />
    </main>
  );
}

export default MyTrip;