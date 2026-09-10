import { invitation } from "../../config/invitation";
import { useReveal } from "../../hooks/useReveal";
import { Bow } from "../ui/Bow";

/** Cierre elegante de la invitación */
export function Closing() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="reveal relative overflow-hidden bg-gradient-to-b from-blush-100 to-blush-200 py-16 text-center sm:py-20"
    >
      <Bow
        size={52}
        className="animate-float absolute left-[10%] top-[16%] opacity-40"
      />
      <Bow
        size={44}
        className="animate-float-slow absolute bottom-[14%] right-[10%] opacity-40"
      />

      <div className="relative z-10 mx-auto max-w-md px-6">
        <Bow size={56} className="animate-float-slow mx-auto mb-6" />

        <h2 className="font-display text-3xl font-semibold leading-snug text-ink sm:text-4xl">
          {invitation.texts.closingTitle}
        </h2>

        <p className="mt-4 font-display text-xl italic leading-relaxed text-ink-soft">
          {invitation.texts.closingMessage}
        </p>

        <p className="mt-8 font-script text-5xl text-rose-deep sm:text-6xl">
          {invitation.childName}
        </p>

        <p className="mt-2 font-display text-2xl italic text-ink">
          {invitation.age} añito
        </p>

        <div className="mt-10 flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px w-14 bg-rose-deep/40" />
          <span className="text-lg">🎀</span>
          <span className="h-px w-14 bg-rose-deep/40" />
        </div>
      </div>
    </section>
  );
}