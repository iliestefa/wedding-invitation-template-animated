import { GROOM, BRIDE, INITIALS, INITIALS_DISPLAY } from "../config";

export default function Cover({ progress }) {
  // Solapa: abre entre progress 0 → 0.55
  const flapP = Math.min(1, progress / 0.55);
  const flapDeg = flapP * -180;

  // Texto del sobre: desaparece al abrirse
  const textOp = Math.max(0, 1 - flapP * 2.2);

  // Sello: desaparece rápido
  const sealOp = Math.max(0, 1 - flapP * 3);

  // Todo el sobre: fade out al final
  const envOp = progress > 0.8 ? Math.max(0, 1 - (progress - 0.8) / 0.2) : 1;

  return (
    <div className="cover-envelope" style={{ opacity: envOp }}>
      {/* Fondo oscuro detrás del sobre */}
      <div className="cover-bg-dark" />

      {/* ═══ EL SOBRE ═══ */}
      <div className="env-box">
        {/* Cuerpo del sobre */}
        <div className="env-body">
          {/* Pliegues laterales y fondo — SVG con viewBox correcto */}
          <svg
            className="env-folds"
            viewBox="0 0 420 280"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="gl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d6cfbc" />
                <stop offset="100%" stopColor="#ede7d6" />
              </linearGradient>
              <linearGradient id="gr" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#cfc8b5" />
                <stop offset="100%" stopColor="#ede7d6" />
              </linearGradient>
              <linearGradient id="gb" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#c8c1ae" />
                <stop offset="100%" stopColor="#ddd7c5" />
              </linearGradient>
            </defs>
            {/* Pliegue izquierdo */}
            <path d="M0 0 L210 168 L0 280" fill="url(#gl)" />
            {/* Pliegue derecho */}
            <path d="M420 0 L210 168 L420 280" fill="url(#gr)" />
            {/* Pliegue inferior */}
            <path d="M0 280 L210 168 L420 280" fill="url(#gb)" />
            {/* Líneas de pliegue */}
            <line
              x1="0"
              y1="0"
              x2="210"
              y2="168"
              stroke="#b8b09c"
              strokeWidth="0.7"
              opacity="0.6"
            />
            <line
              x1="420"
              y1="0"
              x2="210"
              y2="168"
              stroke="#b8b09c"
              strokeWidth="0.7"
              opacity="0.6"
            />
            <line
              x1="0"
              y1="280"
              x2="210"
              y2="168"
              stroke="#b8b09c"
              strokeWidth="0.7"
              opacity="0.6"
            />
            <line
              x1="420"
              y1="280"
              x2="210"
              y2="168"
              stroke="#b8b09c"
              strokeWidth="0.7"
              opacity="0.6"
            />
          </svg>

          {/* Texto centrado en el cuerpo */}
          <div className="env-txt" style={{ opacity: textOp }}>
            <div className="env-mono gv">{INITIALS_DISPLAY}</div>
            <div className="env-names">
              <span className="gv env-n">{GROOM}</span>
              <span className="env-a">&amp;</span>
              <span className="gv env-n">{BRIDE}</span>
            </div>
            <div className="env-d">12 · 09 · 2026</div>
            <div className="env-s">Nos casamos</div>
          </div>
        </div>

        {/* Solapa — se dobla hacia atrás con perspectiva 3D */}
        <div className="env-flap-scene">
          <div
            className="env-flap"
            style={{ transform: `rotateX(${flapDeg}deg)` }}
          >
            {/* Cara frontal (verde sage) */}
            <svg
              className="env-flap-svg front"
              viewBox="0 0 420 200"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                opacity: flapP < 0.5 ? 1 : Math.max(0, 1 - (flapP - 0.5) * 4),
              }}
            >
              <defs>
                <linearGradient id="fg" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8d9773" />
                  <stop offset="100%" stopColor="#5e6a47" />
                </linearGradient>
                <filter id="fsh">
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="8"
                    floodColor="#2a3010"
                    floodOpacity="0.35"
                  />
                </filter>
              </defs>
              <path
                d="M0 0 L420 0 L210 190 Z"
                fill="url(#fg)"
                filter="url(#fsh)"
              />
              {/* Borde de la solapa */}
              <path
                d="M0 0 L420 0 L210 190 Z"
                fill="none"
                stroke="#7a855f"
                strokeWidth="0.8"
                opacity="0.6"
              />

              {/* Sello de cera */}
              <g style={{ opacity: sealOp }}>
                <circle cx="210" cy="82" r="32" fill="#6b7550" />
                <circle
                  cx="210"
                  cy="82"
                  r="27"
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1.2"
                />
                <circle
                  cx="210"
                  cy="82"
                  r="22"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.7"
                />
                <text
                  x="210"
                  y="90"
                  textAnchor="middle"
                  fontFamily="'Great Vibes', cursive"
                  fontSize="24"
                  fill="rgba(255,255,255,0.9)"
                >
                  {INITIALS}
                </text>
              </g>
            </svg>

            {/* Cara trasera (interior del sobre, crema) */}
            <svg
              className="env-flap-svg back"
              viewBox="0 0 420 200"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                opacity: flapP > 0.5 ? Math.min(1, (flapP - 0.5) * 3) : 0,
              }}
            >
              <path d="M0 0 L420 0 L210 190 Z" fill="#e2dccb" />
              <path
                d="M0 0 L420 0 L210 190 Z"
                fill="none"
                stroke="#c4bba8"
                strokeWidth="0.8"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Hint scroll */}
      <div
        className="env-hint"
        style={{
          opacity:
            progress < 0.08 ? 1 : Math.max(0, 1 - (progress - 0.08) / 0.08),
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          width="20"
          height="20"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
        <span>Desliza para abrir</span>
      </div>
    </div>
  );
}
