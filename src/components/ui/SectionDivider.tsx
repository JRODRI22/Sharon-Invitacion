import { Bow } from "./Bow";

interface SectionDividerProps {
  className?: string;
}

/** Separador elegante con lazo central — usado entre secciones */
export function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div
      className={`flex items-center justify-center gap-4 py-2 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-blush-300 sm:w-24" />
      <Bow size={34} className="animate-float-slow" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-blush-300 sm:w-24" />
    </div>
  );
}