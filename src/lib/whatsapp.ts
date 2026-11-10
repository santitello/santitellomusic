import { COPY, SITE } from "@/content";
import type { Lang } from "@/content";

/** Enlace a WhatsApp con el mensaje de cotización ya escrito en el idioma de la página. */
export const whatsappUrl = (lang: Lang) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(COPY.cta.message[lang])}`;
