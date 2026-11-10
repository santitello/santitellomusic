import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { COPY, FORMATS, SITE } from "@/content";
import { useLang } from "@/lib/lang";
import { whatsappUrl } from "@/lib/whatsapp";
import { HeroVideos } from "./Media";
import { Icon, Reveal, Section, WaButton } from "./ui";

/** Alturas y ritmos fijos (no aleatorios): el ecualizador se ve igual en cada carga. */
const BARS = [0.5, 0.9, 0.65, 1, 0.75, 0.55, 0.95, 0.7, 0.85, 0.6, 1, 0.8, 0.5, 0.9, 0.7];

export function Hero() {
  const { t } = useLang();
  const hasVideos = SITE.videos.length > 0;

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pt-24 pb-16 sm:px-8">
      {/* Luces de escenario */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-drift absolute -top-[20%] -left-[15%] size-[70vmax] rounded-full bg-amber/20 blur-[120px]" />
        <div className="animate-drift-slow absolute -right-[20%] top-[10%] size-[60vmax] rounded-full bg-coral/18 blur-[120px]" />
        <div className="animate-drift absolute bottom-[-30%] left-[20%] size-[55vmax] rounded-full bg-violet/14 blur-[130px]" />
      </div>

      <div
        className={`mx-auto grid w-full max-w-6xl items-center gap-12 ${
          hasVideos ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,430px)] lg:gap-14" : ""
        }`}
      >
        <div className="max-w-3xl">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-fg/[0.06] px-4 py-2 text-[13px] font-semibold tracking-[0.18em] text-fg uppercase ring-1 ring-line">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-coral opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-coral" />
              </span>
              {t(COPY.hero.eyebrow)} · {t(SITE.area)}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1
              className={`leading-[0.95] font-extrabold ${
                hasVideos ? "text-[clamp(2.8rem,8.5vw,5.3rem)]" : "text-[clamp(2.8rem,9vw,6.2rem)]"
              }`}
            >
              {t(COPY.hero.title1)}
              <br />
              <span className="text-stage">{t(COPY.hero.title2)}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-muted sm:text-[19px]">{t(COPY.hero.lead)}</p>
          </Reveal>

          <Reveal delay={0.15} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WaButton long className="w-full sm:w-auto" />
            <a
              href="#formatos"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full px-6 text-[15.5px] font-semibold text-fg ring-1 ring-line transition-colors hover:bg-fg/[0.06]"
            >
              {t(COPY.cta.secondary)}
              <Icon name="arrowDown" className="size-4" />
            </a>
          </Reveal>

          {!hasVideos && (
          <Reveal delay={0.2}>
            <div aria-hidden className="mt-14 flex h-12 items-end gap-1.5">
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className="eq-bar w-1.5 rounded-full bg-stage"
                  style={
                    {
                      height: `${h * 100}%`,
                      "--d": `${0.7 + (i % 5) * 0.18}s`,
                      "--delay": `${-(i * 0.13)}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          </Reveal>
          )}
        </div>
        <HeroVideos />
      </div>
    </section>
  );
}

export function Promises() {
  const { t } = useLang();
  return (
    <section className="border-y border-line bg-surface/60 px-5 py-10 sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-6 sm:grid-cols-3">
        {COPY.promises.map((p, i) => (
          <Reveal key={i} delay={i * 0.06} className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-fg/[0.05] text-accent ring-1 ring-line">
              <Icon name={p.icon} className="size-5" />
            </span>
            <div>
              <h3 className="text-[17px] font-bold">{t(p.title)}</h3>
              <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{t(p.body)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Events() {
  const { t } = useLang();
  const e = COPY.events;
  return (
    <Section id="eventos" eyebrow={t(e.eyebrow)} title={t(e.title)}>
      <div className="grid gap-4 sm:grid-cols-2">
        {e.items.map((item, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <article className="group relative h-full overflow-hidden rounded-3xl bg-surface p-7 ring-1 ring-line transition-colors hover:ring-accent/40 sm:p-8">
              <div
                aria-hidden
                className="absolute -top-20 -right-20 size-56 rounded-full bg-coral/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="relative mb-6 grid size-12 place-items-center rounded-2xl bg-stage text-on-stage">
                <Icon name={item.icon} className="size-6" />
              </span>
              <h3 className="relative text-[24px] font-bold">{t(item.title)}</h3>
              <p className="relative mt-2 text-[15.5px] leading-relaxed text-muted">{t(item.body)}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/** Foto del formato o, mientras no haya, su número grande sobre luces de escenario. */
function FormatPhoto({ src, alt, n, className = "" }: { src: string; alt: string; n: number; className?: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`aspect-[4/3] size-full object-cover lg:aspect-auto lg:min-h-[420px] ${className}`}
      />
    );
  }
  return (
    <div aria-hidden className={`relative isolate grid min-h-[200px] place-items-center overflow-hidden bg-ink/50 lg:min-h-[420px] ${className}`}>
      <div className="animate-drift absolute -top-1/3 -left-1/4 -z-10 size-[28rem] rounded-full bg-amber/20 blur-[90px]" />
      <div className="animate-drift-slow absolute -right-1/4 -bottom-1/3 -z-10 size-[24rem] rounded-full bg-coral/20 blur-[90px]" />
      <span className="font-display text-[clamp(6rem,16vw,11rem)] leading-none font-extrabold text-stage opacity-90">
        {String(n).padStart(2, "0")}
      </span>
    </div>
  );
}

function Included({ children, strong = false }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <li className="flex gap-3">
      <Icon name="check" className="mt-0.5 size-5 shrink-0 text-accent" />
      <span className={strong ? "text-[16.5px] font-semibold text-fg" : "text-[15px] leading-relaxed text-muted"}>{children}</span>
    </li>
  );
}

/** Formatos con su precio: cada bloque lleva a WhatsApp con el formato ya nombrado en el mensaje. */
export function Formats() {
  const { lang, t } = useLang();
  const f = COPY.formats;
  return (
    <Section id="formatos" eyebrow={t(f.eyebrow)} title={t(f.title)} lead={t(f.lead)}>
      <div className="space-y-6">
        {FORMATS.map((fm, i) => {
          const n = i + 1;
          const message = t(f.message).replace("{n}", String(n)).replace("{title}", t(fm.title));
          return (
            <Reveal key={n}>
              <article className="grid overflow-hidden rounded-[2rem] bg-surface ring-1 ring-line lg:grid-cols-2">
                <FormatPhoto src={fm.photo} alt={t(fm.title)} n={n} className={i % 2 ? "lg:order-last" : ""} />
                <div className="flex flex-col p-7 sm:p-10">
                  <p className="text-[12.5px] font-semibold tracking-[0.2em] text-accent uppercase">
                    {t(f.label)} {n}
                  </p>
                  <h3 className="mt-2 text-[clamp(1.7rem,3.4vw,2.4rem)] leading-[1.05] font-bold">{t(fm.title)}</h3>
                  <ul className="mt-6 space-y-3">
                    {fm.lineup.map((l, j) => (
                      <Included key={j} strong>
                        {t(l)}
                      </Included>
                    ))}
                    <Included>{t(f.common.tech)}</Included>
                    <Included>{t(f.common.length)}</Included>
                    <Included>{t(fm.repertoire)}</Included>
                    <Included>{t(f.common.gear)}</Included>
                    <Included>{t(f.common.transport)}</Included>
                  </ul>
                  <div className="mt-8 flex flex-col gap-5 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
                    {fm.price != null ? (
                      <p className="font-display text-[46px] leading-none font-extrabold">
                        <span className="text-stage">${fm.price}</span>
                      </p>
                    ) : (
                      <p className="max-w-[15rem] text-[18px] leading-snug font-bold">{fm.priceNote && t(fm.priceNote)}</p>
                    )}
                    <a
                      href={whatsappUrl(lang, message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-fg px-6 text-[15px] font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
                    >
                      <Icon name="whatsapp" className="size-[18px]" />
                      {t(f.cta)}
                      <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

export function Show() {
  const { t } = useLang();
  const s = COPY.show;
  return (
    <Section id="show" eyebrow={t(s.eyebrow)} title={t(s.title)} className="bg-surface/40">
      <div className="grid gap-4 md:grid-cols-3">
        {s.moments.map((m, i) => (
          <Reveal key={m.n} delay={i * 0.08}>
            <div className="h-full rounded-3xl p-7 ring-1 ring-line">
              <span className="font-display text-[44px] leading-none font-extrabold text-stage">{m.n}</span>
              <h3 className="mt-4 text-[21px] font-bold">{t(m.title)}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{t(m.body)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function How() {
  const { t } = useLang();
  const h = COPY.how;
  return (
    <Section id="reservar" eyebrow={t(h.eyebrow)} title={t(h.title)}>
      <ol className="grid gap-4 md:grid-cols-3">
        {h.steps.map((step, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <li className="relative h-full list-none rounded-3xl bg-surface p-7 ring-1 ring-line">
              <span className="grid size-10 place-items-center rounded-full bg-fg font-display text-[17px] font-extrabold text-ink">
                {i + 1}
              </span>
              <h3 className="mt-5 text-[20px] font-bold">{t(step.title)}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{t(step.body)}</p>
            </li>
          </Reveal>
        ))}
      </ol>
      <Reveal className="mt-10">
        <WaButton long className="w-full sm:w-auto" />
      </Reveal>
    </Section>
  );
}

export function Testimonials() {
  const { t } = useLang();
  if (!SITE.testimonials.length) return null;
  return (
    <Section eyebrow={t(COPY.testimonials.eyebrow)} title={t(COPY.testimonials.title)} className="bg-surface/40">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SITE.testimonials.map((r, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <figure className="h-full rounded-3xl bg-surface p-7 ring-1 ring-line">
              <Icon name="quote" className="size-7 text-accent" />
              <blockquote className="mt-4 text-[16px] leading-relaxed">{t(r.text)}</blockquote>
              <figcaption className="mt-5 text-[14px]">
                <strong className="font-semibold">{r.name}</strong>
                <span className="text-muted"> · {t(r.event)}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Faq() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);
  const f = COPY.faq;

  return (
    <Section id="preguntas" eyebrow={t(f.eyebrow)} title={t(f.title)}>
      <div className="divide-y divide-line overflow-hidden rounded-3xl ring-1 ring-line">
        {f.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <h3>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-fg/[0.03]"
                >
                  <span className="flex-1 text-[17px] font-semibold">{t(item.q)}</span>
                  <Icon
                    name="chevron"
                    className={`size-5 shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-[15.5px] leading-relaxed text-muted">{t(item.a)}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export function FinalCta() {
  const { t } = useLang();
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <Reveal className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] bg-surface px-6 py-16 text-center ring-1 ring-line sm:px-12 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -top-1/2 left-1/4 size-[40rem] rounded-full bg-amber/18 blur-[110px]" />
          <div className="animate-drift-slow absolute -bottom-1/2 right-1/4 size-[36rem] rounded-full bg-coral/18 blur-[110px]" />
        </div>
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-[clamp(2rem,5.5vw,3.6rem)] leading-[1.02] font-extrabold">
            {t(COPY.final.title)}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-muted">{t(COPY.final.lead)}</p>
          <WaButton long className="mt-9 w-full sm:w-auto" />
        </div>
      </Reveal>
    </section>
  );
}
