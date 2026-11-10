# Santi Tello · Música en vivo

Landing de servicios de música en vivo para fiestas y eventos, en español e inglés.
El contacto es por WhatsApp con un mensaje de cotización ya escrito.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # falla a propósito si falta el WhatsApp en src/content.ts
```

Para cambiar textos, número, redes, fotos o video: editar `src/content.ts`.
Las fotos y el video van en `public/media/`.

Stack: Vite + React + TypeScript + Tailwind v4 + motion. Publicada en Netlify (`netlify.toml`).
