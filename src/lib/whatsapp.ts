import { COPY, SITE } from "@/content";
import type { Lang } from "@/content";

/** Enlace a WhatsApp con un mensaje ya escrito; por defecto, el de cotización en el idioma de la página. */
export const whatsappUrl = (lang: Lang, message: string = COPY.cta.message[lang]) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
