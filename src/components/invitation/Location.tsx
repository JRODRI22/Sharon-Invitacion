import {
  invitation,
  getWazeUrl,
} from "../../config/invitation";
import { Section } from "./Section";

/** Ubicación del evento según activeLocation: pending/primary/secondary */
export function Location() {
  const { activeLocation, event } = invitation;
  const isPending = activeLocation === "pending";

  const wazeUrl = getWazeUrl();
  const hasButtons = !isPending;

  return (
    <Section id="ubicacion" title={invitation.texts.locationTitle}>
      {isPending ? (
        <div className="mx-auto max-w-md rounded-2xl border border-blush-200 bg-white/80 px-6 py-8 shadow-sm">
          <p className="text-3xl" aria-hidden="true">
            📍
          </p>
          <p className="mt-3 font-display text-xl font-medium text-ink">
            {invitation.texts.locationPending}
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            {invitation.texts.pendingDetails}
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-md space-y-4">
          <div className="rounded-2xl border border-blush-200 bg-white/80 px-6 py-6 text-left shadow-sm">
            <p className="text-2xl" aria-hidden="true">
              📍
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">
              {event.locationName || invitation.texts.locationPending}
            </h3>
            {event.address && (
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                {event.address}
              </p>
            )}
          </div>

          {hasButtons && wazeUrl && (
            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-stationery flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-body text-sm font-semibold transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
            >
              <span aria-hidden="true">🚗</span> Abrir en Waze
            </a>
          )}

          {/* Vista 360° de la entrada (Street View) */}
          <a
            href={invitation.primaryLocation.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-full border border-gold-foil/40 bg-ivory px-6 py-3 font-body text-sm font-semibold text-ink transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
          >
            <span aria-hidden="true">🔭</span> Ver la entrada en 360°
          </a>
        </div>
      )}
    </Section>
  );
}