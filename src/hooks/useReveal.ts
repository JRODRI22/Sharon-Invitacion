import { useEffect, useRef } from "react";

/**
 * Reveal on scroll: añade la clase `is-visible` cuando el elemento
 * (o cualquiera de sus descendientes con clase `reveal`) entra al
 * viewport (IntersectionObserver). Solo anima transform/opacity.
 * `prefers-reduced-motion` se respeta vía CSS.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets: Element[] = [el, ...el.querySelectorAll(".reveal")];

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return ref;
}