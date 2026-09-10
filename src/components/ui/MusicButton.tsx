import { useMusic } from "../../hooks/useMusic";
import { invitation } from "../../config/invitation";

interface MusicButtonProps {
  /** Inicia la música (se conecta al hook singleton de App) */
  music: ReturnType<typeof useMusic>;
}

/** Control discreto de música: nota + barras equalizer cuando reproduce */
export function MusicButton({ music }: MusicButtonProps) {
  if (!invitation.music.enabled) return null;

  const label = music.playing ? "Silenciar música" : "Reproducir música";

  return (
    <button
      type="button"
      onClick={music.toggle}
      aria-label={label}
      title={label}
      className="fixed bottom-5 right-5 z-50 flex h-11 items-center gap-2 rounded-full bg-white/90 px-3.5 text-rose-deep shadow-lg shadow-blush-300/40 backdrop-blur transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
    >
      {music.playing ? (
        <span className="eq-on flex h-4 items-end gap-[3px]" aria-hidden="true">
          <span className="eq-bar" />
          <span className="eq-bar" />
          <span className="eq-bar" />
        </span>
      ) : (
        <span aria-hidden="true" className="text-base">
          ♪
        </span>
      )}
    </button>
  );
}