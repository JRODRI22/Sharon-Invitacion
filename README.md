# 🎀 Invitación Web — 1er Cumpleaños de Sharon Rodríguez

Invitación digital interactiva, tema **Coquette / Lazos / Baby Girl**.

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4
- Cero dependencias de UI externas (lazos en SVG propio)

## Comandos

```bash
npm install     # instalar dependencias
npm run dev     # servidor de desarrollo
npm run build   # build de producción (dist/)
npm run preview # previsualizar el build
```

## ⚙️ Configuración del evento

**Todo el contenido editable vive en un solo archivo:**

```
src/config/invitation.ts
```

Ahí se configuran (cuando estén confirmados):

| Dato | Campo |
|---|---|
| Fecha del evento | `event.date` (formato `"2026-12-31"`) |
| Hora | `event.time` |
| Nombre del salón | `event.locationName` |
| Dirección | `event.address` |
| Ubicación activa | `activeLocation`: `"pending"` / `"primary"` / `"secondary"` |
| WhatsApp RSVP | `rsvp.whatsappNumber` (ej. `"50661969427"`) |
| Máximo personas | `rsvp.maxGuests` |
| Fotos | `photos: [{ src, alt }]` — archivos en `public/images/` |
| Música | `public/music/invitation.mp3` |

Mientras un dato esté vacío (`""` / `null`), la invitación muestra
*"Próximamente confirmaremos los detalles"* — nunca datos ficticios.

### Ubicaciones

Ambas URLs de Google Maps son el **mismo lugar**:

- `primaryLocation` → Street View / 360°
- `secondaryLocation` → ubicación GPS

Cambiar `activeLocation` a `"primary"` o `"secondary"` cuando se confirme.

## Estructura

```
src/
├── components/
│   ├── invitation/   # Hero, Welcome, AgeHighlight, Gallery,
│   │                 # EventDetails, Countdown, Location, RSVP, Closing
│   └── ui/           # Bow (SVG), SectionDivider, MusicButton, ScrollController
├── config/           # invitation.ts — TODO el contenido editable
├── hooks/            # useCountdown, useAutoScroll, useMusic, useReveal
├── styles/           # main.css (tema Coquette)
└── App.tsx
```

## Notas técnicas

- Música inicia **solo** tras pulsar "Abrir invitación" (política autoplay móvil).
- Auto-scroll se pausa automáticamente si el usuario hace scroll manual.
- Animaciones respetan `prefers-reduced-motion`.
- Imágenes con `loading="lazy"`.
- RSVP genera mensaje de WhatsApp con confirmación previa del usuario.