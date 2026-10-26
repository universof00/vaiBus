import React from "react";
import Icon from "./Icon";

function ScreenHeader({ title, onNotifications, onBack }) {
  
  function handleBack() {
    if (onBack) {
      onBack();
      return;
    }

    window.history.back();
  }
  

  return (
    <header className="bus-screen-header">
      <button
        className="nearby-back-button"
        type="button"
        aria-label="Voltar"
        onClick={handleBack}
      >
        <Icon name="arrowLeft" size={24} />
      </button>

      <h1>{title}</h1>

      <button
        type="button"
        aria-label="Abrir notificações"
        onClick={onNotifications}
      >
        <Icon name="bell" size={21} />
      </button>
    </header>
  );
}

export default ScreenHeader;