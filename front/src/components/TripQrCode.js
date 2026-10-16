import React, { useMemo } from "react";

const QR_SIZE = 25;

function createMatrix(value) {
  const matrix = Array.from(
    { length: QR_SIZE },
    () => Array(QR_SIZE).fill(false)
  );

  const reserved = Array.from(
    { length: QR_SIZE },
    () => Array(QR_SIZE).fill(false)
  );

  function createFinderPattern(originX, originY) {
    for (let y = 0; y < 7; y += 1) {
      for (let x = 0; x < 7; x += 1) {
        const positionX = originX + x;
        const positionY = originY + y;

        const outerBorder =
          x === 0 ||
          x === 6 ||
          y === 0 ||
          y === 6;

        const center =
          x >= 2 &&
          x <= 4 &&
          y >= 2 &&
          y <= 4;

        matrix[positionY][positionX] =
          outerBorder || center;

        reserved[positionY][positionX] = true;
      }
    }
  }

  createFinderPattern(0, 0);
  createFinderPattern(QR_SIZE - 7, 0);
  createFinderPattern(0, QR_SIZE - 7);

  let seed = 2166136261;

  for (const character of value) {
    seed ^= character.charCodeAt(0);
    seed = Math.imul(seed, 16777619);
  }

  for (let y = 0; y < QR_SIZE; y += 1) {
    for (let x = 0; x < QR_SIZE; x += 1) {
      if (reserved[y][x]) {
        continue;
      }

      seed = Math.imul(seed, 1664525) + 1013904223;

      const randomBit = (seed >>> 28) & 1;
      const positionBit = (x + y) % 3 === 0 ? 1 : 0;

      matrix[y][x] = Boolean(
        randomBit ^ positionBit
      );
    }
  }

  return matrix;
}

function TripQrCode({ value }) {
  const matrix = useMemo(
    () => createMatrix(value),
    [value]
  );

  return (
    <svg
      className="trip-qr-code"
      viewBox={`0 0 ${QR_SIZE + 4} ${QR_SIZE + 4}`}
      role="img"
      aria-label="QR Code para confirmação de embarque"
      shapeRendering="crispEdges"
    >
      <rect
        width={QR_SIZE + 4}
        height={QR_SIZE + 4}
        fill="#ffffff"
      />

      {matrix.map((row, y) =>
        row.map((filled, x) =>
          filled ? (
            <rect
              key={`${x}-${y}`}
              x={x + 2}
              y={y + 2}
              width="1"
              height="1"
              fill="#071517"
            />
          ) : null
        )
      )}
    </svg>
  );
}

export default TripQrCode;