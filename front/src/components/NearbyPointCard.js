import React from "react";
import Icon from "./Icon";

function NearbyPointCard({
  point,
  selected,
  onSelect,
}) {
  return (
    <section className="nearby-point-section">
      <article className="nearby-point-card">
        <span className="point-bus-icon">
          <Icon name="bus" size={19} />
        </span>

        <div className="point-information">
          <h2>{point.name}</h2>
          <p>{point.distance} de distância</p>
          <p>Próximo ônibus: {point.nextBus}</p>
        </div>
      </article>

      <button
        className={`use-point-button ${selected ? "selected" : ""}`}
        type="button"
        aria-pressed={selected}
        onClick={onSelect}
      >
        {selected ? (
          <>
            <Icon name="pin" size={20} />
            Ponto selecionado
          </>
        ) : (
          <>
            <Icon name="walk" size={20} />
            Usar este ponto
          </>
        )}
      </button>
    </section>
  );
}

export default NearbyPointCard;