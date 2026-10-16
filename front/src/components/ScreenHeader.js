import React from "react";
import Icon from "./Icon";

function ScreenHeader({ title, onNotifications }) {
  return (
    <header className="bus-screen-header">
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