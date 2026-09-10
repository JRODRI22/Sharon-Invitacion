import { invitation } from "../../config/invitation";
import { useCountdown } from "../../hooks/useCountdown";
import { Section } from "./Section";

/** Pieza editorial: número grande + etiqueta pequeña debajo */
function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-5xl font-semibold tabular-nums text-rose-deep sm:text-6xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-soft">
        {label}
      </span>
    </div>
  );
}

/** Cuenta regresiva editorial: FALTAN → días grandes → hh:mm:ss */
export function Countdown() {
  const { status, values } = useCountdown();

  return (
    <Section id="cuenta" title={invitation.texts.countdownTitle}>
      {status === "pending" && (
        <p className="font-display text-lg italic text-ink-soft">
          {invitation.texts.countdownPending}
        </p>
      )}

      {status === "counting" && (
        <div role="timer" aria-live="polite" aria-label="Cuenta regresiva del evento">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-ink-soft">
            Faltan
          </p>
          <div className="mt-3 flex items-baseline justify-center gap-2">
            <span className="font-display text-8xl font-semibold tabular-nums text-rose-deep sm:text-9xl">
              {values.days}
            </span>
            <span className="font-display text-2xl italic text-ink-soft">
              días
            </span>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3 sm:gap-5">
            <Unit value={values.hours} label="Hrs" />
            <span className="font-display text-3xl text-blush-300" aria-hidden="true">
              :
            </span>
            <Unit value={values.minutes} label="Min" />
            <span className="font-display text-3xl text-blush-300" aria-hidden="true">
              :
            </span>
            <Unit value={values.seconds} label="Seg" />
          </div>
        </div>
      )}

      {status === "today" && (
        <p className="font-script text-4xl font-semibold text-rose-deep sm:text-5xl">
          🎀 {invitation.texts.countdownToday} 🎀
        </p>
      )}

      {status === "past" && (
        <p className="font-display text-xl italic text-ink-soft">
          {invitation.texts.countdownPast}
        </p>
      )}
    </Section>
  );
}