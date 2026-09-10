import { invitation } from "../../config/invitation";
import { useReveal } from "../../hooks/useReveal";
import { Section } from "./Section";
import { Bow } from "../ui/Bow";

/**
 * Galería editorial — NO cuadrícula uniforme:
 * foto grande protagonista + pares asimétricos alternados.
 */
export function Gallery() {
  const ref = useReveal<HTMLDivElement>();

  const photos = invitation.photos;
  const slots = photos.length > 0 ? photos : Array.from({ length: 6 });

  return (
    <Section
      id="galeria"
      title={invitation.texts.galleryTitle}
      subtitle={invitation.texts.gallerySubtitle}
    >
      <div ref={ref} className="mx-auto max-w-md space-y-5 sm:max-w-lg">
        {slots.map((photo, i) => {
          const src = photos.length > 0 ? (photo as { src: string }).src : "";
          const alt = photos.length > 0 ? (photo as { alt: string }).alt : "";

          // Ritmo editorial: grande / par desplazado / mediana centrada
          const isHero = i % 5 === 0;
          const isPair = i % 5 === 1 || i % 5 === 2;
          const shift = i % 5 === 1 ? "sm:mr-16" : i % 5 === 2 ? "sm:ml-16" : "";

          return (
            <figure
              key={i}
              className={`reveal photo-frame relative overflow-hidden rounded-xl border-[6px] border-white bg-blush-100 ring-1 ring-gold-foil/30 ${
                isHero ? "mx-auto aspect-[4/5] w-3/4" : ""
              } ${isPair ? `inline-block w-[48%] aspect-square ${shift}` : ""} ${
                !isHero && !isPair ? "mx-auto aspect-[4/3] w-5/6" : ""
              }`}
              style={{ transitionDelay: `${(i % 3) * 120}ms` }}
            >
              {src ? (
                <img
                  src={src}
                  alt={alt}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blush-50 to-blush-200">
                  <span className="text-3xl opacity-60" aria-hidden="true">
                    🎀
                  </span>
                </div>
              )}
              {/* Lazito en la esquina — solo en fotos grandes */}
              {isHero && (
                <Bow
                  size={30}
                  className="absolute right-3 top-3 opacity-90 drop-shadow-sm"
                />
              )}
            </figure>
          );
        })}
      </div>
      {photos.length === 0 && (
        <p className="mt-6 text-xs font-medium text-ink-soft">
          Pronto compartiremos fotografías de Sharon 💕
        </p>
      )}
    </Section>
  );
}