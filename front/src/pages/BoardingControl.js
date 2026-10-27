import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import ScreenHeader from "../components/ScreenHeader";
import BoardingSummary from "../components/BoardingSummary";
import MissingStudentsList from "../components/MissingStudentsList";
import BottomNavigation from "../components/BottomNavigation";

import "../style/BoardingControl.css";

const API_URL = "http://localhost:8080";

function BoardingControl() {
  const navigate = useNavigate();
  const location = useLocation();

  // Usa a viagem recebida pela navegação.
  // Caso não exista, utiliza a viagem 1 para teste.
  const viagemId =
    location.state?.viagemId || 2;

  const [boardingData, setBoardingData] = useState({
    confirmed: 0,
    boarded: 0,
    missingStudents: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let componentActive = true;

    async function loadBoardingData() {
      try {
        setError("");

        const response = await fetch(
          `${API_URL}/interesses-embarque/viagem/${viagemId}/controle`
        );

        if (!response.ok) {
          throw new Error(
            "Não foi possível carregar os dados do embarque."
          );
        }

        const data = await response.json();

        if (!componentActive) {
          return;
        }

        const formattedStudents =
          data.alunosFaltantes.map((student) => ({
            id: student.interesseId,
            name: student.nome,
            boardingPoint: student.ponto,
            phone: student.telefone || "",
            status:
              student.status === "AUSENTE"
                ? "absent"
                : "pending",
          }));

        setBoardingData({
          confirmed: data.confirmaram,
          boarded: data.embarcaram,
          missingStudents: formattedStudents,
        });
      } catch (error) {
        if (componentActive) {
          setError(error.message);
        }
      } finally {
        if (componentActive) {
          setLoading(false);
        }
      }
    }

    loadBoardingData();

    const intervalId = setInterval(
      loadBoardingData,
      5000
    );

    return () => {
      componentActive = false;
      clearInterval(intervalId);
    };
  }, [viagemId]);

  function handleNavigation(tab) {
    const routes = {
      inicio: "/driver/home",
      mapa: "/driver/map",
      viagens: "/driver/boarding",
      perfil: "/profile",
    };

    if (routes[tab]) {
      navigate(routes[tab]);
    }
  }

  return (
    <main className="boarding-control-page">
      <div className="boarding-control-header">
        <ScreenHeader
          title="Controle de embarque"
          onBack={() => navigate(-1)}
          onNotifications={() => {
            console.log("Abrir notificações");
          }}
        />
      </div>

      <section className="boarding-control-content">
        {loading ? (
          <p>Carregando dados do embarque...</p>
        ) : error ? (
          <p className="boarding-control-error">
            {error}
          </p>
        ) : (
          <>
            <BoardingSummary
              confirmed={boardingData.confirmed}
              boarded={boardingData.boarded}
            />

            <MissingStudentsList
              students={
                boardingData.missingStudents
              }
            />
          </>
        )}
      </section>

      <BottomNavigation
        activeTab="viagens"
        onChange={handleNavigation}
      />
    </main>
  );
}

export default BoardingControl;