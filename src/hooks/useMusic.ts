import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Música ambiental vía YouTube IFrame API (reproductor invisible).
 * - Solo inicia tras interacción del usuario (botón "Abrir invitación")
 *   — requisito de las políticas de autoplay de YouTube/navegadores.
 * - Reproduce en loop (reinicia al terminar).
 * - Instancia única; el reproductor vive en un div oculto.
 * - Si la API de YouTube no carga (sin internet), la invitación
 *   sigue funcionando sin música.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;

/** Carga la IFrame API una sola vez */
function loadYouTubeApi(): Promise<void> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve();
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return apiPromise;
}

export function useMusic(enabled: boolean, videoId: string) {
  const playerRef = useRef<any>(null);
  const containerIdRef = useRef<string>("");
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);
  const wantPlayRef = useRef(false);

  // Crear el reproductor una vez al montar
  useEffect(() => {
    if (!enabled) return;

    const containerId = "yt-music-player";
    containerIdRef.current = containerId;
    if (document.getElementById(containerId)) return;

    const container = document.createElement("div");
    container.id = containerId;
    // Invisible pero con dimensiones (YouTube lo requiere)
    container.style.cssText =
      "position:fixed;width:1px;height:1px;left:-9999px;top:0;pointer-events:none;";
    document.body.appendChild(container);

    let cancelled = false;
    loadYouTubeApi().then(() => {
      if (cancelled || !window.YT?.Player) return;
      playerRef.current = new window.YT.Player(containerId, {
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          loop: 1,
          playlist: videoId, // requerido para loop
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            try {
              playerRef.current?.setVolume(50); // 50% de volumen
            } catch {
              /* noop */
            }
            if (wantPlayRef.current) {
              playerRef.current?.playVideo();
            }
          },
          onStateChange: (e: any) => {
            // 0 = ended → reiniciar (loop manual de respaldo)
            if (e.data === 0) {
              playerRef.current?.seekTo(0);
              playerRef.current?.playVideo();
            }
            // 1 = playing, 2 = paused
            setPlaying(e.data === 1);
          },
          onError: () => setAvailable(false),
        },
      });
    });

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        /* noop */
      }
      document.getElementById(containerId)?.remove();
    };
  }, [enabled, videoId]);

  const start = useCallback(() => {
    if (!enabled) return;
    wantPlayRef.current = true;
    try {
      playerRef.current?.unMute();
      playerRef.current?.playVideo();
    } catch {
      // Player aún no listo — onReady lo iniciará
    }
  }, [enabled]);

  const pause = useCallback(() => {
    wantPlayRef.current = false;
    try {
      playerRef.current?.pauseVideo();
    } catch {
      /* noop */
    }
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) pause();
    else start();
  }, [playing, start, pause]);

  return { playing, available, start, pause, toggle };
}