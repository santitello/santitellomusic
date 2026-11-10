# Santi Tello Music — reglas del proyecto

## Commit y push tras cada cambio

Al terminar cada cambio: `git add -A`, commit y `git push` a `main`, sin preguntar.
Netlify publica cada push a `main`. Solo `main`: nada de ramas de feature ni PRs
(si la sesión arranca en otra rama, pushea con `git push origin HEAD:main`).
Antes de pushear, `npm run typecheck` y `npm run build` deben pasar.
Mensajes de commit en español, explicando por qué además del qué.

## Dónde va cada cosa

| | |
|---|---|
| `src/content.ts` | **todo** el texto (ES/EN), WhatsApp, redes, fotos, video y testimonios |
| `src/components/Sections.tsx` | las secciones de la página |
| `src/components/Layout.tsx` | cabecera, pie y botón flotante de WhatsApp |
| `src/styles/theme.css` | colores, tipografías y animaciones |
| `public/media/` | fotos y video del show |

## Reglas

- **Nada inventado.** No se publican cifras, testimonios ni clientes que no sean reales.
  Las secciones de fotos, video y testimonios se ocultan solas si están vacías.
- **Todo texto va en los dos idiomas.** Cada string de `content.ts` es `{ es, en }`.
- **El build falla sin WhatsApp** (`scripts/check-config.mjs`): la página no sirve sin él.
