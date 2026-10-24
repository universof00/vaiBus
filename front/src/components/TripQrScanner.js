import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

import Icon from "./Icon";

function TripQrScanner({ onScan }) {
  const scannerRef = useRef(null);
  const processingRef = useRef(false);

  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState("");

  async function stopScanner() {
    const scanner = scannerRef.current;

    if (!scanner) {
      return;
    }

    try {
      if (scanner.isScanning) {
        await scanner.stop();
      }

      scanner.clear();
    } catch (error) {
      console.error("Erro ao fechar câmera:", error);
    } finally {
      scannerRef.current = null;
      setScanning(false);
    }
  }

  async function startScanner() {
    setCameraError("");
    processingRef.current = false;

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError(
        "A câmera não está disponível neste navegador."
      );
      return;
    }

    const scanner = new Html5Qrcode("trip-qr-reader");

    scannerRef.current = scanner;
    setScanning(true);

    try {
      await scanner.start(
        {
          // Prefere a câmera traseira do celular
          facingMode: "environment",
        },
        {
          fps: 10,
          qrbox: {
            width: 240,
            height: 240,
          },
        },
        async (decodedText) => {
          // Impede a leitura repetida do mesmo QR Code
          if (processingRef.current) {
            return;
          }

          processingRef.current = true;

          await stopScanner();
          onScan(decodedText);
        },
        () => {
          // Erros normais enquanto ainda não encontrou um QR Code
        }
      );
    } catch (error) {
      console.error("Erro ao abrir câmera:", error);

      setCameraError(
        "Não foi possível abrir a câmera. Verifique a permissão."
      );

      setScanning(false);
      scannerRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      const scanner = scannerRef.current;

      if (scanner) {
        scanner
          .stop()
          .catch(() => {})
          .finally(() => {
            scanner.clear();
          });
      }
    };
  }, []);

  return (
    <section className="trip-scanner">
      <div id="trip-qr-reader" />

      {!scanning && (
        <button
          className="open-camera-button"
          type="button"
          onClick={startScanner}
        >
          <Icon name="qr" size={22} />
          Abrir câmera
        </button>
      )}

      {scanning && (
        <p className="scanner-instruction">
          Aponte a câmera para o QR Code do ônibus
        </p>
      )}

      {cameraError && (
        <p className="scanner-error">{cameraError}</p>
      )}
    </section>
  );
}

export default TripQrScanner;