import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { COPY, SITE } from "@/content";
import type { Lang } from "@/content";
import { useLang } from "@/lib/lang";
import { whatsappUrl } from "@/lib/whatsapp";
import { Icon } from "./ui";

const NAV = [
  { href: "#eventos", label: COPY.nav.events },
  { href: "#show", label: COPY.nav.show },
  { href: "#reservar", label: COPY.nav.how },
  { href: "#preguntas", label: COPY.nav.faq },
];

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex rounded-full bg-white/[0.06] p-0.5 ring-1 ring-line" role="group" aria-label="Idioma / Language">
      {(["es", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 text-[12.5px] font-bold uppercase transition-colors ${
            lang === l ? "bg-fg text-ink" : "text-muted hover:text-fg"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

/** Transparente sobre el hero; gana fondo al bajar para no tapar el contenido. */
export function Header() {
  const { lang, t } = useLang();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-300 ${
        solid ? "border-b border-line bg-ink/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-5 sm:px-8">
        <a href="#top" className="font-display text-[19px] font-bold tracking-tight">
          {SITE.name}
          <span className="text-stage">.</span>
        </a>

        <div className="ml-auto hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-[14.5px] text-muted transition-colors hover:text-fg">
              {t(n.label)}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2.5 md:ml-6">
          <LangToggle />
          <a
            href={whatsappUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center gap-2 rounded-full bg-fg px-4 text-[14px] font-semibold text-ink transition-opacity hover:opacity-90 sm:inline-flex"
          >
            <Icon name="whatsapp" className="size-4" />
            {t(COPY.cta.whatsapp)}
          </a>
        </div>
      </nav>
    </header>
  );
}

const SOCIAL_LABEL: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  facebook: "Facebook",
};

export function Footer() {
  const { t } = useLang();
  const socials = Object.entries(SITE.social).filter(([, url]) => url);

  return (
    <footer className="border-t border-line px-5 pt-12 pb-28 sm:px-8 sm:pb-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xl font-bold">
            {SITE.name}
            <span className="text-stage">.</span>
          </p>
          <p className="mt-1 text-[14px] text-muted">
            {t(COPY.hero.eyebrow)} · {t(SITE.area)}
          </p>
        </div>

        {socials.length > 0 && (
          <div className="flex gap-2">
            {socials.map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={SOCIAL_LABEL[key]}
                className="grid size-11 place-items-center rounded-full ring-1 ring-line transition-colors hover:bg-white/[0.06] hover:text-amber"
              >
                <Icon name={key} className="size-5" />
              </a>
            ))}
          </div>
        )}
      </div>
      <p className="mx-auto mt-8 w-full max-w-6xl text-[13px] text-muted">
        © {new Date().getFullYear()} {SITE.name}. {t(COPY.footer.rights)}
      </p>
    </footer>
  );
}

/** WhatsApp siempre a mano en el celular, donde se decide la mayoría de las reservas. */
export function WhatsAppFab() {
  const { lang, t } = useLang();
  return (
    <motion.a
      href={whatsappUrl(lang)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t(COPY.cta.whatsappLong)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 22, delay: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="fixed right-4 bottom-5 z-40 grid size-14 place-items-center rounded-full bg-wa text-white shadow-[0_10px_30px_-8px_rgb(37_211_102/0.6)] sm:right-6 sm:bottom-6"
    >
      <Icon name="whatsapp" className="size-7" />
    </motion.a>
  );
}
