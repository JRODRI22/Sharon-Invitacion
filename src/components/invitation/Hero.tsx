import { useMemo } from "react";
import { invitation } from "../../config/invitation";
import { Bow } from "../ui/Bow";

interface HeroProps {
  onOpen: () => void;
  opening: boolean;
}

interface ConfettiPiece {
  id: number;
  tx: number;
  ty: number;
  rotate: number;
  delay: number;
  size: number;
  shape: "dot" | "bar";
  color: string;
}

const CONFETTI_COLORS = ["#d690a8", "#a85573", "#c9a96a", "#f0cfd9", "#fbe9ef"];

function buildConfetti(): ConfettiPiece[] {
  return Array.from({ length: 18 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 18 + Math.random() * 0.4;
    const distance = 120 + Math.random() * 140;
    return {
      id: i,
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance - 40,
      rotate: Math.random() * 480 - 240,
      delay: Math.random() * 0.25,
      size: 6 + Math.random() * 7,
      shape: i % 3 === 0 ? "bar" : "dot",
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    };
  });
}

const [firstName, ...restName] = invitation.childName.split(" ");
const lastName = restName.join(" ");

/**
 * Portada: sobre físico con solapa, pliegues y sello de lazo.
 * Al pulsar "Abrir invitación":
 *  1) el sello de lazo se desata
 *  2) la solapa se abre en 3D
 *  3) la carta emerge y sale del sobre
 *  4) confeti sutil + la escena se desvanece
 */
export function Hero({ onOpen, opening }: HeroProps) {
  const confetti = useMemo(() => buildConfetti(), []);

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blush-50 via-cream to-blush-100 px-6 text-center ${
        opening ? "animate-scene-recede" : ""
      }`}
      role="dialog"
      aria-label="Portada de la invitación"
    >
      {/* Viñeta radial suave para profundidad */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 38%, rgba(255,255,255,0.55) 0%, transparent 62%), radial-gradient(circle at 50% 100%, rgba(124,51,80,0.12) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* Lazos decorativos flotando en las esquinas */}
      <Bow
        size={72}
        className="animate-float absolute left-[8%] top-[12%] opacity-60"
      />
      <Bow
        size={52}
        className="animate-float-slow absolute right-[10%] top-[18%] opacity-50"
      />
      <Bow
        size={44}
        className="animate-float absolute bottom-[16%] left-[14%] opacity-40"
      />
      <Bow
        size={60}
        className="animate-float-slow absolute bottom-[12%] right-[8%] opacity-50"
      />

      {/* Confeti — solo visible durante la apertura */}
      {opening && (
        <div
          className="pointer-events-none absolute left-1/2 top-[40%] z-40"
          aria-hidden="true"
        >
          {confetti.map((p) => (
            <span
              key={p.id}
              className="animate-confetti absolute rounded-full"
              style={
                {
                  "--tx": `${p.tx}px`,
                  "--ty": `${p.ty}px`,
                  "--r": `${p.rotate}deg`,
                  "--delay": `${p.delay}s`,
                  width: p.shape === "bar" ? p.size * 1.8 : p.size,
                  height: p.shape === "bar" ? p.size * 0.5 : p.size,
                  backgroundColor: p.color,
                  borderRadius: p.shape === "bar" ? "2px" : "9999px",
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      {/* Texto sobre el sobre */}
      <p className="font-display text-xl font-semibold italic tracking-wide text-ink sm:text-2xl">
        {invitation.texts.envelopeHint}
      </p>

      {/* Sobre físico */}
      <div
        className={`relative mt-6 ${opening ? "pointer-events-none" : ""}`}
        style={{ perspective: "1200px" }}
      >
        <div
          className={`envelope ${opening ? "" : "transition-transform duration-300 hover:-translate-y-1.5"}`}
          onClick={opening ? undefined : onOpen}
          role="button"
          tabIndex={0}
          aria-label={`${invitation.texts.heroButton} — sobre de la invitación`}
          onKeyDown={(e) => {
            if (!opening && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              onOpen();
            }
          }}
        >
          {/* Interior del sobre */}
          <div className="envelope-inner" aria-hidden="true" />

          {/* Carta dentro — emerge al abrir */}
          <div
            className={`envelope-letter ${opening ? "animate-letter-out" : ""}`}
            aria-hidden="true"
          >
            <p className="font-script text-3xl text-rose-deep sm:text-4xl">
              {firstName}
            </p>
            <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ink">
              {lastName}
            </p>
          </div>

          {/* Pliegues laterales */}
          <div className="envelope-folds" aria-hidden="true" />

          {/* Solapa superior — se abre en 3D */}
          <div
            className={`envelope-flap ${opening ? "animate-flap-open" : ""}`}
            aria-hidden="true"
          />

          {/* Sello de lazo sobre la solapa — se desata al abrir */}
          <div
            className="absolute left-1/2 top-[38%] z-40 -translate-x-1/2 -translate-y-1/2"
            aria-hidden="true"
          >
            <div className={opening ? "animate-untie-left" : ""}>
              <Bow size={64} className="drop-shadow-md sm:hidden" />
              <Bow size={78} className="hidden drop-shadow-md sm:block" />
            </div>
            {opening && (
              <div className="animate-untie-right absolute left-0 top-0">
                <Bow size={64} className="drop-shadow-md sm:hidden" />
                <Bow size={78} className="hidden drop-shadow-md sm:block" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Botón de papelería */}
      <button
        type="button"
        onClick={onOpen}
        disabled={opening}
        className="btn-stationery mt-10 rounded-full px-10 py-4 font-body text-base font-semibold tracking-wide transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 disabled:opacity-60"
      >
        {invitation.texts.heroButton}
      </button>
    </div>
  );
}
