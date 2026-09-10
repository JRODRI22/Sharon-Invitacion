/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIGURACIÓN CENTRAL DE LA INVITACIÓN — Sharon Rodríguez
 * ─────────────────────────────────────────────────────────────
 *  TODO el contenido editable de la invitación vive aquí.
 *  Los componentes NUNCA contienen datos del evento.
 *
 *  ⚠️ DATOS PENDIENTES: deja "" o null donde no haya información
 *  confirmada. La invitación mostrará "Próximamente confirmaremos
 *  los detalles" automáticamente. NO inventar datos.
 * ─────────────────────────────────────────────────────────────
 */

export type LocationMode = "primary" | "secondary" | "pending";

export interface Photo {
  src: string;
  alt: string;
}

export const invitation = {
  childName: "Sharon Rodríguez",
  age: 1,

  event: {
    /** Fecha del evento en formato ISO "2026-12-31". "" = por definir */
    date: "2026-10-04",
    /** Hora del evento, ej. "3:00 pm". "" = por definir */
    time: "11:00 am",
    /** Nombre del salón o lugar. "" = por definir */
    locationName: "Piscina San Martín",
    /** Dirección textual. "" = por definir */
    address: "Los Cebos",
    /** URL directa de Google Maps del lugar definitivo. "" = por definir */
    mapsUrl: "https://maps.app.goo.gl/47GTbruLLGEnGryj8",
    /** URL directa de Waze. "" = se construye desde coordenadas si existen */
    wazeUrl: "",
    /** Coordenadas para construir la URL de Waze. null = por definir */
    latitude: 10.338288 as number | null,
    longitude: -84.266563 as number | null,
  },

  /**
   * Ubicación activa:
   *  - "pending"   → muestra "Ubicación por confirmar"
   *  - "primary"    → usa primaryLocation (Street View / 360°)
   *  - "secondary"  → usa secondaryLocation (GPS)
   * Ambas URLs son el MISMO lugar (una es Street View, otra GPS).
   */
  activeLocation: "secondary" as LocationMode,

  primaryLocation: {
    mapsUrl: "https://www.google.com/maps/@10.3382164,-84.2665242,3a,75y,244.88h,87.72t/data=!3m7!1e1!3m5!1sHDuskb--ttiz2z3V1Nt8BA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D2.2778977034187307%26panoid%3DHDuskb--ttiz2z3V1Nt8BA%26yaw%3D244.87866660796564!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDkwNi4wIKXMDSoASAFQAw%3D%3D",
    label: "Ver la entrada en 360° (Street View)",
  },

  secondaryLocation: {
    mapsUrl: "https://maps.app.goo.gl/47GTbruLLGEnGryj8",
    label: "Ver en Google Maps (ubicación GPS)",
  },

  rsvp: {
    /** Número de WhatsApp con código de país, sin "+", espacios ni guiones.
     *  Ej. "50661969427". "" = confirmación deshabilitada temporalmente */
    whatsappNumber: "50689610814",
    /** Máximo de personas por confirmación */
    maxGuests: 6,
    /** Fecha límite de confirmación en ISO "2026-12-31".
     *  Después de esta fecha el formulario se cierra solo. "" = sin límite */
    rsvpDeadline: "2026-09-27",
    /** URL del Web App de Apps Script (termina en /exec).
     *  Instrucciones: apps-script-rsvp.gs en la raíz del proyecto.
     *  "" = envío directo al Sheet deshabilitado (solo WhatsApp) */
    sheetsEndpoint:
      "https://script.google.com/macros/s/AKfycbxlP5GpWsV-LZbEoC3MGE8aefOhWBXfvxALT0NL6tfQoIKMJl2y-2iRjpu3TMi3KmSf/exec",
  },

  music: {
    enabled: true,
    /** Música vía YouTube IFrame API (reproductor invisible).
     *  Solo el ID del video, ej. "tFK2Y_p7MwM".
     *  Suena tras pulsar "Abrir invitación" (política de autoplay). */
    youtubeVideoId: "tFK2Y_p7MwM",
  },

  /**
   * Fotografías de Sharon. Archivos en public/images/.
   * La galería usa un ritmo editorial: la 1ª foto es la protagonista.
   * BASE_URL respeta el subpath del deploy (GitHub Pages: /Sharon-Invitacion/).
   */
  photos: [
    { src: `${import.meta.env.BASE_URL}images/sharon-hero.jpg`, alt: "Sharon" },
    { src: `${import.meta.env.BASE_URL}images/sharon-02.jpg`, alt: "Sharon" },
    { src: `${import.meta.env.BASE_URL}images/sharon-03.jpg`, alt: "Sharon" },
    { src: `${import.meta.env.BASE_URL}images/sharon-04.jpg`, alt: "Sharon" },
    {
      src: `${import.meta.env.BASE_URL}images/sharon-05.jpg`,
      alt: "Sharon con su hermanita",
    },
  ] as Photo[],

  /** Todos los textos de la invitación — editables */
  texts: {
    heroSubtitle: "Cumple 1 añito",
    heroButton: "Abrir invitación",

    envelopeHint: "Una invitación especial para ti",
    letterIntro: "Con mucho amor queremos invitarte a celebrar",
    scrollHint: "desliza",

    welcomeTitle: "Hace un añito…",
    welcomeMessage:
      "Hace un añito llegó a nuestras vidas una pequeña princesa que llená cada día de amor, sonrisas y momentos inolvidables.",

    galleryTitle: "Nuestros recuerdos",
    gallerySubtitle: "Cada sonrisa suya es un tesoro que guardamos en el corazón",

    eventTitle: "Un día para celebrar",
    pendingDetails: "Próximamente confirmaremos los detalles.",

    countdownTitle: "Cuenta regresiva",
    countdownPending: "Pronto comenzará nuestra cuenta regresiva.",
    countdownToday: "¡HOY CELEBRAMOS A SHARON!",
    countdownPast: "Gracias por haber sido parte de este día tan especial.",

    locationTitle: "¿Dónde será la celebración?",
    locationPending: "La ubicación será confirmada próximamente.",

    tipsTitle: "Un consejito de la familia",
    tipsPool: "El lugar cuenta con piscina, así que ven preparados para mojarse 💦",
    tipsChair: "Te recomendamos traer tu silla plegable, ya que en el lugar hay poquitos asientos 🤗",

    rsvpTitle: "¿Nos acompañas?",
    rsvpSubtitle: "Confirma antes del domingo 27 de septiembre",
    rsvpButton: "Confirmar asistencia",
    rsvpPending: "La confirmación estará disponible muy pronto 🎀",
    rsvpClosed: "La confirmación ya cerró 🎀 ¡Gracias a todos por el amor mostrado!",

    closingTitle: "Gracias por acompañarnos a celebrar",
    closingMessage: "Tu presencia hará que este día sea aún más especial.",
    closingTagline: "Mi primer añito",
  },
};

/** URL de Waze: usa la directa si existe, si no construye desde coordenadas */
export function getWazeUrl(): string {
  if (invitation.event.wazeUrl) return invitation.event.wazeUrl;
  const { latitude, longitude } = invitation.event;
  if (latitude !== null && longitude !== null) {
    return `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
  }
  return "";
}

/** URL de Google Maps según la ubicación activa */
export function getActiveMapsUrl(): string {
  switch (invitation.activeLocation) {
    case "primary":
      return invitation.primaryLocation.mapsUrl;
    case "secondary":
      return invitation.secondaryLocation.mapsUrl;
    default:
      return invitation.event.mapsUrl;
  }
}