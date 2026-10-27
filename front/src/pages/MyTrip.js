import React, {
  useRef,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import ScreenHeader from "../components/ScreenHeader";
import StudentInformation from "../components/StudentInformation";
import TripQrScanner from "../components/TripQrScanner";
import BottomNavigation from "../components/BottomNavigation";
import Icon from "../components/Icon";

import "../style/MyTrip.css";

const API_URL = "http://localhost:8080";

function getStoredStudent() {
  try {
    const storedUser =
      localStorage.getItem("vaibus_user") ||
      sessionStorage.getItem("vaibus_user");

    if (!storedUser) {
      return {
        id: null,
        name: "Usuário",
        email: "",
        type: "",
      };
    }

    const user = JSON.parse(storedUser);

    return {
      id: user.id ?? null,
      name: user.nome ?? "Usuário",
      email: user.email ?? "",
      type: user.tipo ?? "",
    };
  } catch (error) {
    console.error(
      "Erro ao recuperar usuário:",
      error
    );

    return {
      id: null,
      name: "Usuário",
      email: "",
      type: "",
    };
  }
}

function MyTrip() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedBus = location.state?.selectedBus;

  const [student] = useState(getStoredStudent);

  const [boardingConfirmed, setBoardingConfirmed] =
    useState(false);

  const [scanMessage, setScanMessage] =
    useState("");

  const scanInProgress = useRef(false);

  async function handleQrCodeScanned(decodedText) {
    if (scanInProgress.current) {
      return;
    }

    if (!selectedBus) {
      setScanMessage(
        "Nenhum ônibus foi selecionado."
      );
      return;
    }

    if (!student.id) {
      setScanMessage(
        "Não foi possível identificar o aluno. Entre novamente no sistema."
      );
      return;
    }

    const expectedQrCode = selectedBus.codigoQr;

    if (!expectedQrCode) {
      setScanMessage(
        "O ônibus selecionado não possui QR Code cadastrado."
      );
      return;
    }

    console.log("codigo do onibus: " + expectedQrCode);
    console.log("codigo escaneado: " + decodedText);

    const scannedCode = decodedText.trim();
    const busCode = expectedQrCode.trim();

    if (scannedCode !== busCode) {
      setScanMessage(
        `Este QR Code não pertence ao ${selectedBus.name}.`
      );
      return;
    }

    scanInProgress.current = true;

    try {
      setScanMessage(
        "Confirmando embarque..."
      );

      const formData = new URLSearchParams();

      formData.append(
        "usuarioId",
        student.id
      );

      formData.append(
        "onibusId",
        selectedBus.id
      );

      const response = await fetch(
        `${API_URL}/interesses-embarque/confirmar-embarque`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const message = await response.text();

        throw new Error(
          message ||
            "Não foi possível confirmar o embarque."
        );
      }

      setBoardingConfirmed(true);

      setScanMessage(
        `Presença confirmada no ${selectedBus.name}.`
      );
    } catch (error) {
      scanInProgress.current = false;
      setScanMessage(error.message);
    }
  }

  function handleNavigation(tab) {
    const routes = {
      inicio: "/home",
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
            <p>{selectedBus.placa}</p>
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