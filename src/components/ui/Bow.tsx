import { useId, type CSSProperties } from "react";

interface BowProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
  /** aria-hidden por defecto — es decorativo */
  label?: string;
}

/**
 * Lazo de satín realista en SVG puro (sin dependencias externas).
 * Construido en capas: lazada + pliegue interior (sombra de tela),
 * nudo central con banda de brillo y cintas colgantes con volumen.
 * Sombra suave propia (feDropShadow) para sensación de profundidad.
 * Decorativo por defecto; pasar `label` solo si aporta significado.
 */
export function Bow({ size = 48, className = "", style, label }: BowProps) {
  const uid = useId().replace(/[:]/g, "");

  return (
    <svg
      width={size}
      height={size * 0.78}
      viewBox="0 0 120 94"
      fill="none"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id={`${uid}-loop`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#fbe9ef" />
          <stop offset="32%" stopColor="#eeb4c7" />
          <stop offset="68%" stopColor="#d0839f" />
          <stop offset="100%" stopColor="#a4597a" />
        </linearGradient>
        <linearGradient id={`${uid}-fold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3350" stopOpacity="0" />
          <stop offset="100%" stopColor="#6e2c47" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={`${uid}-knot`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eeb4c7" />
          <stop offset="55%" stopColor="#c4718f" />
          <stop offset="100%" stopColor="#8a4763" />
        </linearGradient>
        <filter
          id={`${uid}-shadow`}
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="2.6"
            floodColor="#7c3350"
            floodOpacity="0.28"
          />
        </filter>
      </defs>

      <g filter={`url(#${uid}-shadow)`}>
        {/* Cintas colgantes */}
        <path
          d="M52 53 C45 65 39 76 43 92 C49 84 54 70 55.5 55 Z"
          fill={`url(#${uid}-knot)`}
        />
        <path
          d="M52 53 C47 64 42 74 45 88 C49 81 52.5 69 54 55 Z"
          fill={`url(#${uid}-fold)`}
          opacity="0.55"
        />
        <path
          d="M68 53 C75 65 81 76 77 92 C71 84 66 70 64.5 55 Z"
          fill={`url(#${uid}-knot)`}
          opacity="0.96"
        />

        {/* Lazada izquierda: cuerpo + pliegue interior */}
        <path
          d="M58 47 C40 20 10 23 8 43 C7 58 30 64 58 47 Z"
          fill={`url(#${uid}-loop)`}
        />
        <path
          d="M58 47 C42 29 18 31 14 43 C33 41 50 45 58 47 Z"
          fill={`url(#${uid}-fold)`}
        />
        <path
          d="M22 37 C30 30 42 33 52 42"
          stroke="#fff"
          strokeOpacity="0.5"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Lazada derecha: cuerpo + pliegue interior */}
        <path
          d="M62 47 C80 20 110 23 112 43 C113 58 90 64 62 47 Z"
          fill={`url(#${uid}-loop)`}
        />
        <path
          d="M62 47 C78 29 102 31 106 43 C87 41 70 45 62 47 Z"
          fill={`url(#${uid}-fold)`}
        />
        <path
          d="M98 37 C90 30 78 33 68 42"
          stroke="#fff"
          strokeOpacity="0.5"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Nudo central envolvente */}
        <path
          d="M51 39 C51 33 69 33 69 39 L69 55 C69 61 51 61 51 55 Z"
          fill={`url(#${uid}-knot)`}
        />
        <rect
          x="56.4"
          y="36.5"
          width="2.6"
          height="21"
          rx="1.3"
          fill="#fbe9ef"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}
