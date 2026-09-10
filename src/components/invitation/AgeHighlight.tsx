import { invitation } from "../../config/invitation";
import { useReveal } from "../../hooks/useReveal";
import { Bow } from "../ui/Bow";

const [firstName, ...restName] = invitation.childName.split(" ");
const lastName = restName.join(" ");

/** "Sharon cumple 1" — nombre legible: script para el nombre, serif para el apellido */
export function AgeHighlight() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="reveal-scale relative overflow-hidden bg-gradient-to-b from-blush-50 to-blush-100 py-16 text-center sm:py-20"
    >
      <Bow
        size={56}
        className="animate-float absolute left-[6%] top-[14%] opacity-40"
      />
      <Bow
        size={48}
        className="animate-float-slow absolute bottom-[10%] right-[8%] opacity-40"
      />

      <p className="font-body text-sm font-bold uppercase tracking-[0.3em] text-ink">
        Nuestra pequeña princesa
      </p>

      {/* Nombre: script legible + apellido en serif elegante */}
      <h2 className="mt-4 font-script text-6xl font-semibold leading-tight text-rose-deep sm:text-7xl md:text-8xl">
        {firstName}
      </h2>
      <p className="font-display text-xl font-semibold uppercase tracking-[0.28em] text-ink sm:text-2xl">
        {lastName}
      </p>

      <p className="mt-4 font-display text-2xl italic text-ink sm:text-3xl">
        cumple
      </p>

      <div className="relative mx-auto mt-6 flex h-36 w-36 items-center justify-center rounded-full border-2 border-gold-foil bg-white shadow-xl shadow-blush-200/50 ring-4 ring-gold-soft/60 sm:h-44 sm:w-44">
        {/* Número arábigo — Quicksand evita que el "1" parezca romano */}
        <span className="text-gold-gradient font-body text-7xl font-bold tabular-nums sm:text-8xl">
          {invitation.age}
        </span>
        <Bow size={36} className="absolute -top-3 left-1/2 -translate-x-1/2" />
      </div>

      <p className="mt-6 font-script text-4xl font-semibold text-rose-deep sm:text-5xl">
        añito
      </p>
    </section>
  );
}