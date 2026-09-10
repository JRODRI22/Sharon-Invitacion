import { invitation } from "../../config/invitation";
import { useReveal } from "../../hooks/useReveal";
import { Bow } from "../ui/Bow";

/**
 * Consejos de la familia (mezcla A+B): tono cálido con iconos.
 * Va después de la ubicación — el invitado ya piensa en logística.
 */
export function Tips() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="reveal relative mx-auto w-full max-w-xl px-6 py-10 text-center sm:py-12"
      aria-labelledby="tips-title"
    >
      <div className="mx-auto max-w-md rounded-3xl border border-gold-foil/35 bg-ivory px-6 py-7 shadow-sm sm:px-8">
        <Bow size={38} className="animate-float-slow mx-auto mb-4" />

        <h3
          id="tips-title"
          className="font-display text-2xl font-semibold text-ink sm:text-3xl"
        >
          {invitation.texts.tipsTitle}
        </h3>

        <div className="mt-5 space-y-4 text-left">
          <div className="flex items-start gap-3.5 rounded-2xl border border-blush-200 bg-white/85 px-4 py-3.5">
            <span className="text-2xl leading-none" aria-hidden="true">
              🏊‍♀️
            </span>
            <p className="font-body text-sm leading-relaxed text-ink sm:text-base">
              {invitation.texts.tipsPool}
            </p>
          </div>

          <div className="flex items-start gap-3.5 rounded-2xl border border-blush-200 bg-white/85 px-4 py-3.5">
            <span className="text-2xl leading-none" aria-hidden="true">
              🪑
            </span>
            <p className="font-body text-sm leading-relaxed text-ink sm:text-base">
              {invitation.texts.tipsChair}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}