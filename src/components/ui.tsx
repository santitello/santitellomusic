import { motion, useReducedMotion } from "motion/react";
import type { ReactNode, SVGProps } from "react";
import { useLang } from "@/lib/lang";
import { whatsappUrl } from "@/lib/whatsapp";
import { COPY } from "@/content";

/** Íconos de trazo, en línea: no hace falta una librería para 16 dibujos. */
const PATHS: Record<string, string> = {
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z",
  list: "M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4.5l3 2",
  rings: "M9 15.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm6 3a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
  cake: "M4 21h16M5 21v-7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7M5 16c2 1.3 3.5 1.3 5 0s3-1.3 4.5 0 3 1.3 4.5 0M12 12V8m0-4.5c-.8 1-1.2 1.8-1.2 2.5a1.2 1.2 0 0 0 2.4 0c0-.7-.4-1.5-1.2-2.5Z",
  briefcase: "M3 8h18v12H3V8Zm5 0V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V8M3 13h18",
  glass: "M8 3h8l-1 7a3 3 0 0 1-6 0L8 3Zm4 10v8m-4 0h8",
  arrow: "M5 12h14m0 0-6-6m6 6-6 6",
  arrowDown: "M12 5v14m0 0 6-6m-6 6-6-6",
  chevron: "m6 9 6 6 6-6",
  play: "M8 5.5v13l11-6.5-11-6.5Z",
  quote: "M7 17c-2 0-3-1.5-3-3.5C4 10 6.5 7.5 9 7l.5 1.5C8 9.3 7.2 10.4 7 12c1.7 0 3 1.1 3 2.7S8.8 17 7 17Zm9 0c-2 0-3-1.5-3-3.5 0-3.5 2.5-6 5-6.5l.5 1.5c-1.5.8-2.3 1.9-2.5 3.5 1.7 0 3 1.1 3 2.7S17.8 17 16 17Z",
  instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 13.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM17.5 6.5h.01",
  tiktok: "M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.8 2.3 4.5 5 4.7",
  youtube: "M3 8.5C3 6.6 4.6 5 6.5 5h11C19.4 5 21 6.6 21 8.5v7c0 1.9-1.6 3.5-3.5 3.5h-11C4.6 19 3 17.4 3 15.5v-7ZM10 9v6l5-3-5-3Z",
  facebook: "M14 21v-7.5h2.5L17 10h-3V8.3c0-1 .3-1.6 1.7-1.6H17V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H8v3.5h2.6V21",
  whatsapp:
    "M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Z",
};

const SOLID = new Set(["whatsapp", "play", "quote"]);

export function Icon({ name, className = "size-5", ...props }: { name: string } & SVGProps<SVGSVGElement>) {
  const solid = SOLID.has(name);
  return (
    <svg
      viewBox="0 0 24 24"
      fill={solid ? "currentColor" : "none"}
      stroke={solid ? "none" : "currentColor"}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d={PATHS[name] ?? PATHS.spark} />
    </svg>
  );
}

/** Aparece al entrar en pantalla, una sola vez. Con reduced-motion, sin desplazamiento. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative px-5 py-20 sm:px-8 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">
        {(eyebrow || title) && (
          <Reveal className="mb-12 max-w-2xl sm:mb-16">
            {eyebrow && (
              <p className="mb-3 text-[12.5px] font-semibold tracking-[0.2em] text-amber uppercase">{eyebrow}</p>
            )}
            {title && <h2 className="text-[clamp(2rem,5.5vw,3.4rem)] leading-[1.02] font-bold">{title}</h2>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/** Botón principal: siempre lleva a WhatsApp con el mensaje de cotización. */
export function WaButton({ long = false, className = "" }: { long?: boolean; className?: string }) {
  const { lang, t } = useLang();
  return (
    <a
      href={whatsappUrl(lang)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-stage px-7 text-[16px] font-semibold text-ink shadow-[0_12px_40px_-12px_rgb(255_90_95/0.7)] transition-transform hover:scale-[1.03] active:scale-[0.98] ${className}`}
    >
      <Icon name="whatsapp" className="size-5" />
      {t(long ? COPY.cta.whatsappLong : COPY.cta.whatsapp)}
      <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}
