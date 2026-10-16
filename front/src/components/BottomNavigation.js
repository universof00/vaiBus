import React from "react";
import Icon from "./Icon";

const navigationItems = [
  { id: "inicio", label: "Início", icon: "home" },
  { id: "mapa", label: "Mapa", icon: "map" },
  { id: "viagens", label: "Viagens", icon: "bus" },
  { id: "perfil", label: "Perfil", icon: "profile" },
];

function BottomNavigation({ activeTab, onChange }) {
  return (
    <nav className="bottom-navigation" aria-label="Navegação principal">
      {navigationItems.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            className={isActive ? "active" : ""}
            type="button"
            aria-current={isActive ? "page" : undefined}
            onClick={() => onChange(item.id)}
          >
            <Icon name={item.icon} size={25} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNavigation;