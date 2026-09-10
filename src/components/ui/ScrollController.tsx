interface ScrollControllerProps {
  active: boolean;
  onToggle: () => void;
}

/** Control flotante de auto-scroll: ▶/⏸ */
export function ScrollController({ active, onToggle }: ScrollControllerProps) {
  const label = active ? "Pausar auto-scroll" : "Iniciar auto-scroll";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className="fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-sm font-medium text-ink shadow-lg shadow-blush-300/40 backdrop-blur transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
    >
      <span aria-hidden="true">{active ? "⏸" : "▶"}</span>
      <span>Auto-scroll</span>
    </button>
  );
}