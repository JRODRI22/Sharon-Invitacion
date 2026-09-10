import { useReveal } from "../../hooks/useReveal";
import { Bow } from "../ui/Bow";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Sección estándar de la invitación: título serif + lazo decorativo
 * + contenido con reveal on scroll.
 */
export function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id={id}
      ref={ref}
      className={`reveal relative mx-auto w-full max-w-xl px-6 py-14 text-center sm:py-16 ${className}`}
    >
      {title && (
        <header className="mb-8">
          <Bow size={40} className="mx-auto mb-4 animate-float-slow" />
          <h2 className="font-display text-3xl font-semibold tracking-wide text-ink sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-base font-medium text-ink sm:text-lg">
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}