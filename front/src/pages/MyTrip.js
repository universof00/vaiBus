import React, { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import ScreenHeader from "../components/ScreenHeader";
import StudentInformation from "../components/StudentInformation";
import TripQrScanner from "../components/TripQrScanner";
import BoardingProgress from "../components/BoardingProgress";
import BottomNavigation from "../components/BottomNavigation";
import Icon from "../components/Icon";

import "../style/MyTrip.css";

const student = {
  id: 15,
  name: "Lucas Almeida",
  course: "Ciência da Computação",
};

function MyTrip() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedBus = location.state?.selectedBus;

  const [boardingConfirmed, setBoardingConfirmed] =
    useState(false);

  const [scanMessage, setScanMessage] = useState("");

  function handleQrCodeScanned(decodedText) {
    if (!selectedBus) {
      setScanMessage(
        "Nenhum ônibus foi selecionado."
      );
      return;
    }

    /*
     * Exemplo:
     * o QR Code do ônibus 1 deve conter:
     * vaibus:bus:1
     */
    const expectedQrCode =
      `vaibus:bus:${selectedBus.id}`;

    if (decodedText !== expectedQrCode) {
      setScanMessage(
        `Este QR Code não pertence ao ${selectedBus.name}.`
      );

      return;
    }

    setBoardingConfirmed(true);
    setScanMessage(
      `Presença confirmada no ${selectedBus.name}.`
    );

    /*
     * Futuramente, envie a confirmação ao backend:
     *
     * fetch("/embarques/confirmar", {
     *   method: "POST",
     *   headers: {
     *     "Content-Type": "application/json",
     *   },
     *   body: JSON.stringify({
     *     studentId: student.id,
     *     busId: selectedBus.id,
     *     qrCode: decodedText,
     *   }),
     * });
     */
  }

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

  if (!selectedBus) {
    return (
      <main className="my-trip-page">
        <ScreenHeader title="Minha viagem" />

        <section className="no-bus-selected">
          <Icon name="bus" size={40} />

          <h2>Nenhum ônibus escolhido</h2>

          <p>
            Escolha um ponto e um ônibus antes de
            confirmar o embarque.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/available-buses")
            }
          >
            Escolher ônibus
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="my-trip-page">
      <ScreenHeader
        title="Confirmar embarque"
        onNotifications={() => {
          console.log("Abrir notificações");
        }}
      />

      <section className="my-trip-content">
        <StudentInformation student={student} />

        <article className="trip-selected-bus">
          <span className="point-bus-icon">
            <Icon name="bus" size={22} />
          </span>

          <div>
            <h2>{selectedBus.name}</h2>
            <p>
              Destino: {selectedBus.destination}
            </p>
            <p>
              Previsão: {selectedBus.arrival}
            </p>
          </div>
        </article>

        {!boardingConfirmed ? (
          <>
            <div className="trip-scanner-container">
              <h2>Leia o QR Code do ônibus</h2>

              <p>
                Abra a câmera e aponte para o código
                localizado dentro do ônibus.
              </p>

              <TripQrScanner
                onScan={handleQrCodeScanned}
              />
            </div>

            {scanMessage && (
              <div className="scan-result scan-error">
                <Icon name="warning" size={20} />
                {scanMessage}
              </div>
            )}
          </>
        ) : (
          <div className="scan-result scan-success">
            <Icon name="check" size={28} />

            <div>
              <h2>Presença confirmada!</h2>
              <p>{scanMessage}</p>
            </div>
          </div>
        )}

        <div className="trip-divider" />

        <BoardingProgress
          boarded={boardingConfirmed ? 19 : 18}
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