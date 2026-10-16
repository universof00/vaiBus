import React from "react";
import Icon from "./Icon";

function PageHeader({ title, onBack }) {
  function handleBack() {
    if (onBack) {
      onBack();
      return;
    }

    window.history.back();
  }

  return (
    <header className="nearby-header">
      <button
        className="nearby-back-button"
        type="button"
        aria-label="Voltar"
        onClick={handleBack}
      >
        <Icon name="arrowLeft" size={24} />
      </button>

      <h1>{title}</h1>
    </header>
  );
}

export default PageHeader;