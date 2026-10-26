import React from "react";

const icons = {
  bus: (
    <>
      <rect x="5" y="3" width="14" height="17" rx="3" />
      <path d="M5 9h14M8 16h.01M16 16h.01M7 20v2M17 20v2" />
    </>
  ),

  qr: (
    <>
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" />
      <path d="M15 14h2v2h-2zM19 14h1v4h-4v2h-2v-6M18 18h2v2h-2z" />
    </>
  ),

  bell: (
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
  ),

  location: (
    <>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </>
  ),

  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),

  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
      <circle cx="16.5" cy="16.5" r="3.5" />
      <path d="M16.5 14.5v2l1.5 1" />
    </>
  ),

  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),

  history: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5M12 7v5l3 2" />
    </>
  ),

  chevron: <path d="m9 18 6-6-6-6" />,

  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v11h14V10M9 21v-7h6v7" />
    </>
  ),

  map: (
    <>
      <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z" />
      <path d="M9 3v15M15 6v15" />
    </>
  ),

  profile: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),

  signal: (
    <>
      <path d="M5 16a10 10 0 0 1 0-8M8 13a6 6 0 0 1 0-2" />
      <path d="M19 8a10 10 0 0 1 0 8M16 11a6 6 0 0 1 0 2" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),

  arrowLeft: <path d="m15 18-6-6 6-6" />,

pin: (
  <>
    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </>
),

walk: (
  <>
    <circle cx="13" cy="4" r="2" />
    <path d="m10 22 2-7-3-3 2-5 4 3 3 1" />
    <path d="m14 15 4 7M5 22l4-10" />
  </>
),

graduation: (
  <>
    <path d="m2 10 10-5 10 5-10 5z" />
    <path d="M6 12v5c3 2 9 2 12 0v-5M22 10v6" />
  </>
),

moon: (
  <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
),

checkCircle: (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 2.5 2.5L16 9" />
  </>
),

lock: (
  <>
    <rect x="5" y="10" width="14" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
  </>
),

eye: (
  <>
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </>
),

eyeOff: (
  <>
    <path d="m3 3 18 18" />
    <path d="M10.6 6.2A10.8 10.8 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-2.1 2.8" />
    <path d="M6.6 6.6C3.6 8.2 2 12 2 12s3.5 6 10 6a10 10 0 0 0 4.1-.8" />
  </>
),

steeringWheel: (
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="2" />
    <path d="M3.5 10h6.5M14 10h6.5M12 14v7" />
    <path d="m10.5 10-4-4M13.5 10l4-4" />
  </>
),

userPlus: (
  <>
    <circle cx="9" cy="8" r="4" />
    <path d="M2 21a7 7 0 0 1 14 0M19 8v6M16 11h6" />
  </>
),

shieldCheck: (
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </>
),

};

function Icon({ name, size = 24, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

export default Icon;