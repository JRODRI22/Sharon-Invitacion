import { useState } from "react";
import { invitation } from "../../config/invitation";
import { Section } from "./Section";

interface FormState {
  name: string;
  attending: "yes" | "no" | "";
  guests: number;
  message: string;
}

interface FormErrors {
  name?: string;
  attending?: string;
  guests?: string;
}

type SubmitStatus = "idle" | "sending" | "sent" | "error";

/** RSVP con validaciones amigables. Envío directo al Google Sheet
 *  (Apps Script) con confirmación en pantalla + respaldo WhatsApp. */
export function RSVP() {
  const [form, setForm] = useState<FormState>({
    name: "",
    attending: "",
    guests: 1,
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const maxGuests = invitation.rsvp.maxGuests;
  const whatsappReady = invitation.rsvp.whatsappNumber !== "";
  const sheetsReady = invitation.rsvp.sheetsEndpoint !== "";

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (form.name.trim() === "") {
      next.name = "Por favor indícanos tu nombre 💕";
    }
    if (form.attending === "") {
      next.attending = "¿Nos podrás acompañar? Cuéntanos 💕";
    }
    if (form.attending === "yes" && form.guests < 1) {
      next.guests = "Debe acompañarnos al menos una persona 💕";
    }
    if (form.attending === "yes" && form.guests > maxGuests) {
      next.guests = `Máximo ${maxGuests} personas por confirmación 💕`;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildMessage = (): string => {
    const lines = [
      `Hola, confirmo mi asistencia al primer cumpleaños de ${invitation.childName}.`,
      "",
      `Nombre: ${form.name.trim()}`,
      `Asistencia: ${form.attending === "yes" ? "Sí" : "No"}`,
    ];
    if (form.attending === "yes") {
      lines.push(`Personas: ${form.guests}`);
    }
    if (form.message.trim() !== "") {
      lines.push("", "Mensaje:", form.message.trim());
    }
    return lines.join("\n");
  };

  const sendToSheet = async (): Promise<boolean> => {
    try {
      await fetch(invitation.rsvp.sheetsEndpoint, {
        method: "POST",
        mode: "no-cors", // Apps Script no envía CORS headers
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          nombre: form.name.trim(),
          asistencia: form.attending === "yes" ? "Sí" : "No",
          personas: form.attending === "yes" ? form.guests : 0,
          mensaje: form.message.trim(),
        }),
      });
      // Con no-cors la respuesta es opaca; asumimos éxito si no lanza error
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (sheetsReady) {
      setStatus("sending");
      const ok = await sendToSheet();
      setStatus(ok ? "sent" : "error");
      if (ok) return; // fila guardada en el Sheet — listo
      // si falla, cae a WhatsApp como respaldo
    }

    if (whatsappReady) {
      const url = `https://wa.me/${invitation.rsvp.whatsappNumber}?text=${encodeURIComponent(
        buildMessage(),
      )}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Section
      id="confirmacion"
      title={invitation.texts.rsvpTitle}
      subtitle={invitation.texts.rsvpSubtitle}
    >
      {whatsappReady ? (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto max-w-md space-y-6 text-left"
        >
          {/* Nombre */}
          <div>
            <label
              htmlFor="rsvp-name"
              className="mb-1.5 block font-body text-sm font-semibold text-ink"
            >
              Nombre
            </label>
            <input
              id="rsvp-name"
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Tu nombre"
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "rsvp-name-error" : undefined}
              className="input-line w-full px-1 py-2.5 font-body text-ink"
            />
            {errors.name && (
              <p id="rsvp-name-error" role="alert" className="mt-1.5 text-sm text-rose-deep">
                {errors.name}
              </p>
            )}
          </div>

          {/* Asistencia */}
          <fieldset>
            <legend className="mb-1.5 font-body text-sm font-semibold text-ink">
              ¿Podrás acompañarnos?
            </legend>
            <div className="space-y-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-blush-200 bg-white px-4 py-3 transition-colors has-checked:border-blush-400 has-checked:bg-blush-50">
                <input
                  type="radio"
                  name="rsvp-attending"
                  value="yes"
                  checked={form.attending === "yes"}
                  onChange={() => set("attending", "yes")}
                  className="h-4 w-4 accent-rose-deep"
                />
                <span className="font-body text-sm text-ink">
                  Sí, ahí estaremos
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-blush-200 bg-white px-4 py-3 transition-colors has-checked:border-blush-400 has-checked:bg-blush-50">
                <input
                  type="radio"
                  name="rsvp-attending"
                  value="no"
                  checked={form.attending === "no"}
                  onChange={() => set("attending", "no")}
                  className="h-4 w-4 accent-rose-deep"
                />
                <span className="font-body text-sm text-ink">
                  No podremos asistir
                </span>
              </label>
            </div>
            {errors.attending && (
              <p role="alert" className="mt-1.5 text-sm text-rose-deep">
                {errors.attending}
              </p>
            )}
          </fieldset>

          {/* Cantidad de personas */}
          {form.attending === "yes" && (
            <div>
              <span
                id="rsvp-guests-label"
                className="mb-1.5 block font-body text-sm font-semibold text-ink"
              >
                Número de personas
              </span>
              <div
                role="group"
                aria-labelledby="rsvp-guests-label"
                className="flex items-center justify-center gap-4"
              >
                <button
                  type="button"
                  onClick={() => set("guests", Math.max(1, form.guests - 1))}
                  aria-label="Quitar una persona"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-blush-300 bg-white font-display text-2xl text-rose-deep transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
                >
                  −
                </button>
                <span
                  className="min-w-12 text-center font-display text-3xl font-semibold tabular-nums text-ink"
                  aria-live="polite"
                >
                  {form.guests}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    set("guests", Math.min(maxGuests, form.guests + 1))
                  }
                  aria-label="Agregar una persona"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-blush-300 bg-white font-display text-2xl text-rose-deep transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
                >
                  +
                </button>
              </div>
              {errors.guests && (
                <p role="alert" className="mt-1.5 text-center text-sm text-rose-deep">
                  {errors.guests}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="btn-stationery w-full rounded-full px-6 py-4 font-body text-base font-semibold tracking-wide transition-transform hover:scale-[1.02] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending"
              ? "Enviando…"
              : status === "sent"
                ? "¡Gracias! 🎀"
                : invitation.texts.rsvpButton}
          </button>

          {/* Feedback de envío */}
          {status === "sent" && (
            <p
              role="status"
              className="rounded-2xl border border-gold-foil/40 bg-ivory px-5 py-4 text-center font-body text-sm text-ink"
            >
              ¡Tu confirmación fue recibida con amor! Te esperamos 💕
            </p>
          )}
          {status === "error" && (
            <p
              role="alert"
              className="rounded-2xl border border-blush-300 bg-blush-50 px-5 py-4 text-center font-body text-sm text-ink"
            >
              No pudimos guardar tu confirmación, pero abriremos WhatsApp
              para que nos la envíes 💕
            </p>
          )}
        </form>
      ) : (
        <p className="font-display text-lg italic text-ink-soft">
          {invitation.texts.rsvpPending}
        </p>
      )}
    </Section>
  );
}