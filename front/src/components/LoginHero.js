import React from "react";
import Icon from "./Icon";

function LoginHero() {
  return (
    <section className="login-hero">
      <svg
        className="login-map-background"
        viewBox="0 0 430 340"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect width="430" height="340" fill="#edf6ff" />

        <path
          className="login-green-area"
          d="M28 75 73 62l26 37-17 52-49-15Z"
        />

        <path
          className="login-green-area"
          d="m362 62 46 13 10 45-42 23-31-35Z"
        />

        <path
          className="login-green-area"
          d="m371 260 59-22v78l-48-9Z"
        />

        <g className="login-road">
          <path d="M-20 50C65 75 48 145 97 190s64 96 84 170" />
          <path d="M160-20c-8 78 4 117 69 137s105 12 142 70 7 100 79 137" />
          <path d="M303-20c-14 86 14 113 70 130s58 58 67 95" />
          <path d="M-20 286c67-49 93-92 105-155s27-94 67-151" />
        </g>

        <path
          className="login-route"
          d="M27 265c43-42 59-73 62-118s15-85 42-111"
        />

        <path
          className="login-route"
          d="M282 42c13 55 55 42 81 69s21 69 36 106"
        />

        <g className="login-route-points">
          <circle cx="47" cy="244" r="7" />
          <circle cx="91" cy="142" r="7" />
          <circle cx="130" cy="37" r="7" />
          <circle cx="284" cy="44" r="7" />
          <circle cx="365" cy="109" r="7" />
          <circle cx="399" cy="216" r="7" />
        </g>
      </svg>

      <span className="login-map-bus bus-left">
        <Icon name="bus" size={20} />
      </span>

      <span className="login-map-bus bus-right">
        <Icon name="bus" size={20} />
      </span>

      <div className="login-brand">
        <span className="login-brand-icon">
          <Icon name="bus" size={35} />
        </span>

        <span className="login-brand-name">
          Vai<span>Bus</span>
        </span>
      </div>

      <div className="login-welcome">
        <h1>Bem-vindo de volta</h1>

        <p>
          Entre para acompanhar sua
          <br />
          próxima viagem.
        </p>
      </div>
    </section>
  );
}

export default LoginHero;