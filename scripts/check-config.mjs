/**
 * Corre antes del build: si falta el número de WhatsApp, todos los botones de la
 * página llevarían a un enlace roto. Mejor que el build falle y no se publique.
 */
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../src/content.ts", import.meta.url), "utf8");
const match = src.match(/whatsapp:\s*"([^"]*)"/);
const number = match?.[1] ?? "";

if (!/^\d{10,15}$/.test(number)) {
  console.error(
    "✖ Falta el WhatsApp en src/content.ts (SITE.whatsapp): solo dígitos, con código de país, ej. \"593991234567\".\n" +
      "  Sin él, los botones de la página no funcionan, así que no se publica.",
  );
  process.exit(1);
}
console.log(`✓ WhatsApp configurado (+${number})`);
