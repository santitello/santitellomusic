import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { SITE } from "./src/content";

/** El tema va en el HTML servido, no en JS: así el fondo correcto aparece desde el primer pintado. */
const THEME_COLOR = { dark: "#0B0B0F", light: "#FAF6F0" };

const theme = () => ({
  name: "site-theme",
  transformIndexHtml: (html: string) =>
    html
      .replace("<html ", `<html data-theme="${SITE.theme}" `)
      .replace(/(name="theme-color" content=")[^"]*/, `$1${THEME_COLOR[SITE.theme]}`),
});

export default defineConfig({
  plugins: [react(), tailwindcss(), theme()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
