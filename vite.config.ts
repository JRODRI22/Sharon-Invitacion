import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages sirve en https://jrodri22.github.io/Sharon-Invitacion/
// base debe coincidir con el nombre del repo
export default defineConfig({
  base: "/Sharon-Invitacion/",
  plugins: [react(), tailwindcss()],
});