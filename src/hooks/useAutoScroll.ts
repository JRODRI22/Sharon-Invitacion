import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_SPEED_PX_PER_FRAME = 0.55; // ≈ 33 px/s — ritmo cómodo de lectura

/**
 * Auto-scroll elegante:
 * - Avanza lentamente la página con requestAnimationFrame.
 * - Acumula píxeles fraccionarios y solo hace scrollBy con valores
 *   ENTEROS — Safari iOS y algunos navegadores redondean scrollBy
 *   fraccionario a 0 y la página nunca se movería.
 * - Se pausa automáticamente si el usuario hace scroll manual
 *   (wheel, touch o teclado) — nunca lucha contra el usuario.
 * - Se detiene al llegar al final de la página.
 * - Solo activo cuando `enabled` es true (tras abrir la invitación).
 */
export function useAutoScroll(enabled: boolean) {
  const [active, setActive] = useState(false);
  const rafRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const enabledRef = useRef(enabled);
  const accumRef = useRef(0); // píxeles fraccionarios acumulados
  const graceUntilRef = useRef(0); // eventos de usuario ignorados hasta esta fecha

  // Mantener enabledRef sincronizado en cada render — evita stale closures
  enabledRef.current = enabled;

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const loop = useCallback(() => {
    if (!activeRef.current) return;
    const doc = document.documentElement;
    const atBottom =
      window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
    if (atBottom) {
      activeRef.current = false;
      setActive(false);
      stopLoop();
      return;
    }
    // Acumular la velocidad fraccionaria y mover solo píxeles enteros
    accumRef.current += SCROLL_SPEED_PX_PER_FRAME;
    if (accumRef.current >= 1) {
      const whole = Math.floor(accumRef.current);
      accumRef.current -= whole;
      window.scrollBy({ top: whole, behavior: "auto" });
    }
    rafRef.current = requestAnimationFrame(loop);
  }, [stopLoop]);

  const start = useCallback(() => {
    if (!enabledRef.current) return;
    if (activeRef.current) return; // ya está corriendo
    activeRef.current = true;
    accumRef.current = 0;
    graceUntilRef.current = Date.now() + 1500; // ignorar scroll residual 1.5s
    setActive(true);
    rafRef.current = requestAnimationFrame(loop);
  }, [loop]);

  const pause = useCallback(() => {
    activeRef.current = false;
    setActive(false);
    stopLoop();
  }, [stopLoop]);

  const toggle = useCallback(() => {
    if (activeRef.current) pause();
    else start();
  }, [start, pause]);

  // El usuario hace scroll manual → pausar auto-scroll.
  // Teclado: solo las teclas que desplazan la página (permite escribir
  // en el formulario RSVP sin pausar el recorrido).
  useEffect(() => {
    if (!enabled) return;

    const onUserScroll = () => {
      if (Date.now() < graceUntilRef.current) return; // periodo de gracia
      if (activeRef.current) {
        activeRef.current = false;
        setActive(false);
        stopLoop();
      }
    };

    const SCROLL_KEYS = new Set([
      "ArrowUp",
      "ArrowDown",
      "PageUp",
      "PageDown",
      "Home",
      "End",
      " ",
    ]);

    const onKeyDown = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key)) onUserScroll();
    };

    const passive = { passive: true } as AddEventListenerOptions;
    window.addEventListener("wheel", onUserScroll, passive);
    window.addEventListener("touchmove", onUserScroll, passive);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchmove", onUserScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [enabled, stopLoop]);

  // Deshabilitado → asegurar detención
  useEffect(() => {
    if (!enabled) {
      activeRef.current = false;
      setActive(false);
      stopLoop();
    }
  }, [enabled, stopLoop]);

  // Limpieza al desmontar
  useEffect(() => stopLoop, [stopLoop]);

  return { active, start, pause, toggle };
}