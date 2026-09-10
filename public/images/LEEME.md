# 📸 Carpeta de imágenes de Sharon

Coloca aquí las fotografías y luego agrégalas en
`src/config/invitation.ts` → array `photos`.

## Nombres recomendados

| Uso | Archivo | Detalle |
|---|---|---|
| Foto principal (sobre) | `sharon-hero.jpg` | Vertical, buena calidad |
| Galería | `sharon-01.jpg` … `sharon-06.jpg` | Mezcla verticales y cuadradas |
| Vista previa WhatsApp | `og-cover.jpg` | 1200×630 px |

## Después de colocar las fotos

En `src/config/invitation.ts`:

```ts
photos: [
  { src: "/images/sharon-01.jpg", alt: "Sharon sonriendo" },
  { src: "/images/sharon-02.jpg", alt: "Sharon en su moisés" },
  // …
],
```

Y para la foto del sobre, en `src/components/invitation/Hero.tsx`
reemplazar el placeholder por:

```tsx
<img src="/images/sharon-hero.jpg" alt="Sharon" />
```

## Formato

- JPG (más liviano que PNG para fotos)
- Máximo ~300 KB por imagen (comprimir con tinypng.com si pesan más)