import { invitation } from "../../config/invitation";
import { Section } from "./Section";

/** Mensaje de bienvenida: "Un añito de amor" */
export function Welcome() {
  return (
    <Section id="bienvenida" title={invitation.texts.welcomeTitle}>
      <p className="mx-auto max-w-md font-display text-xl italic leading-relaxed text-ink-soft sm:text-2xl">
        {invitation.texts.welcomeMessage}
      </p>
    </Section>
  );
}