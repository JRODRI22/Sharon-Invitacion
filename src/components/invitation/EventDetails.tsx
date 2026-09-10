import { invitation } from "../../config/invitation";
import { Section } from "./Section";

/** Fecha y hora del evento — muestra "por definir" si no hay datos */
export function EventDetails() {
  const { date, time } = invitation.event;
  const hasDate = date !== "";
  const hasTime = time !== "";

  return (
    <Section id="fecha" title={invitation.texts.eventTitle}>
      <div className="mx-auto grid max-w-md grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-blush-200 bg-white/80 px-6 py-6 shadow-sm">
          <p className="text-2xl" aria-hidden="true">
            📅
          </p>
          <h3 className="mt-2 font-body text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">
            Fecha
          </h3>
          <p className="mt-2 font-display text-xl font-medium text-ink">
            {hasDate
              ? new Date(`${date}T12:00:00`).toLocaleDateString("es-CR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Por definir"}
          </p>
        </div>

        <div className="rounded-2xl border border-blush-200 bg-white/80 px-6 py-6 shadow-sm">
          <p className="text-2xl" aria-hidden="true">
            🕐
          </p>
          <h3 className="mt-2 font-body text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">
            Hora
          </h3>
          <p className="mt-2 font-display text-xl font-medium text-ink">
            {hasTime ? time : "Por definir"}
          </p>
        </div>
      </div>

      {(!hasDate || !hasTime) && (
        <p className="mt-6 font-display text-lg italic text-ink-soft">
          {invitation.texts.pendingDetails}
        </p>
      )}
    </Section>
  );
}