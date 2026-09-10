import { useEffect, useState } from "react";
import { invitation } from "../config/invitation";

export type CountdownStatus = "pending" | "counting" | "today" | "past";

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function computeValues(target: Date, now: Date): CountdownValues {
  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

/**
 * Parsea la hora del evento ("11:00 am", "3:30 pm", "15:00") a "HH:MM" 24h.
 * Si no hay hora configurada, usa medianoche.
 */
function parseEventTime(time: string): string {
  if (!time) return "00:00";
  const m = time.trim().toLowerCase().match(/^(\d{1,2}):(\d{2})\s*(am|pm)?$/);
  if (!m) return "00:00";
  let h = parseInt(m[1], 10);
  const min = m[2];
  const suffix = m[3];
  if (suffix === "pm" && h < 12) h += 12;
  if (suffix === "am" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${min}`;
}

/**
 * Cuenta regresiva del evento.
 * - Sin fecha configurada  → "pending"
 * - El día del evento      → "today"
 * - Evento pasado          → "past"
 * - Antes del evento       → "counting" + valores
 */
export function useCountdown(): {
  status: CountdownStatus;
  values: CountdownValues;
} {
  const dateISO = invitation.event.date;
  const target = dateISO
    ? new Date(`${dateISO}T${parseEventTime(invitation.event.time)}:00`)
    : null;

  const read = (): { status: CountdownStatus; values: CountdownValues } => {
    const now = new Date();
    if (!target || Number.isNaN(target.getTime())) {
      return { status: "pending", values: computeValues(new Date(), now) };
    }
    if (isSameCalendarDay(target, now)) {
      return { status: "today", values: computeValues(target, now) };
    }
    if (target.getTime() < now.getTime()) {
      return { status: "past", values: computeValues(target, now) };
    }
    return { status: "counting", values: computeValues(target, now) };
  };

  const [state, setState] = useState(read);

  useEffect(() => {
    if (!target) return;
    const id = window.setInterval(() => setState(read()), 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateISO]);

  return state;
}