import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { COPY, SITE } from "@/content";
import { useLang } from "@/lib/lang";
import { Icon, Reveal, Section } from "./ui";

type Video = (typeof SITE.videos)[number];

const youtubeId = (src: string) => src.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/)?.[1];

/** Solo un video suena a la vez: al activar el sonido de uno, los demás se silencian. */
const SOUND_EVENT = "stm:sound";

/**
 * Video que arranca solo y sin sonido al entrar en pantalla (así lo permiten los
 * navegadores) y se pausa al salir, para no gastar datos. Un botón activa el sonido.
 * `frame="vertical"` recorta a 9:16 (portada); `"natural"` respeta el formato del video.
 */
export function VideoPlayer({ video, frame }: { video: Video; frame: "vertical" | "natural" }) {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [ratio, setRatio] = useState<number | null>(null);
  const yt = youtubeId(video.src);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? el.play().catch(() => {}) : el.pause()),
      { threshold: 0.35 },
    );
    io.observe(el);
    const onOther = (e: Event) => {
      if ((e as CustomEvent).detail !== el) {
        el.muted = true;
        setMuted(true);
      }
    };
    window.addEventListener(SOUND_EVENT, onOther);
    return () => {
      io.disconnect();
      window.removeEventListener(SOUND_EVENT, onOther);
    };
  }, [reduced]);

  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (!el.muted) {
      window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: el }));
      el.play().catch(() => {});
    }
  };

  const shell = "relative overflow-hidden rounded-3xl bg-surface ring-1 ring-line";

  if (yt) {
    const short = video.src.includes("/shorts/");
    return (
      <div className={`${shell} ${frame === "vertical" || short ? "aspect-[9/16]" : "aspect-video"}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${yt}?playsinline=1&rel=0`}
          title={t(video.title)}
          loading="lazy"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="size-full"
        />
      </div>
    );
  }

  return (
    <div
      className={`${shell} ${frame === "vertical" ? "aspect-[9/16]" : ratio ? "" : "aspect-[9/16]"}`}
      style={frame === "natural" && ratio ? { aspectRatio: ratio } : undefined}
    >
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="metadata"
        controls={!!reduced}
        aria-label={t(video.title)}
        onLoadedMetadata={(e) => setRatio(e.currentTarget.videoWidth / e.currentTarget.videoHeight || null)}
        className="size-full object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
      <p className="absolute bottom-3 left-4 right-14 truncate text-[13.5px] font-semibold text-white">{t(video.title)}</p>
      {!reduced && (
        <button
          onClick={toggleSound}
          aria-label={t(muted ? COPY.media.soundOn : COPY.media.soundOff)}
          className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-black/55 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-black/75"
        >
          <Icon name={muted ? "soundOff" : "soundOn"} className="size-5" />
        </button>
      )}
    </div>
  );
}

/** Los dos videos principales en la portada: lo primero que ve quien llega. */
export function HeroVideos() {
  const { t } = useLang();
  const videos = SITE.videos.slice(0, 2);
  if (!videos.length) return null;

  return (
    <Reveal delay={0.2} className="w-full">
      <p className="mb-3 flex items-center gap-2 text-[12.5px] font-semibold tracking-[0.18em] text-muted uppercase">
        <Icon name="play" className="size-3.5 text-accent" />
        {t(COPY.media.heroLabel)}
      </p>
      <div className={`grid gap-3 ${videos.length === 2 ? "grid-cols-2" : "mx-auto max-w-[280px] grid-cols-1"}`}>
        {videos.map((v, i) => (
          <div key={v.src} className={videos.length === 2 && i === 1 ? "lg:translate-y-10" : ""}>
            <VideoPlayer video={v} frame="vertical" />
          </div>
        ))}
      </div>
    </Reveal>
  );
}

type Tab = "photos" | "videos";

/** Galería con pestañas Fotos / Videos. Una pestaña sin contenido no aparece; sin nada, no hay sección. */
export function MediaGallery() {
  const { t } = useLang();
  const tabs = (["photos", "videos"] as Tab[]).filter((k) => (k === "photos" ? SITE.photos : SITE.videos).length);
  const [tab, setTab] = useState<Tab>(tabs[0] ?? "photos");
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!tabs.length) return null;
  const m = COPY.media;

  return (
    <Section id="galeria" eyebrow={t(m.eyebrow)} title={t(m.title)}>
      {tabs.length > 1 && (
        <div role="tablist" className="isolate mb-8 inline-flex rounded-full bg-fg/[0.05] p-1 ring-1 ring-line">
          {tabs.map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={`relative rounded-full px-6 py-2.5 text-[15px] font-semibold transition-colors ${
                tab === k ? "text-ink" : "text-muted hover:text-fg"
              }`}
            >
              {tab === k && (
                <motion.span layoutId="media-tab" className="absolute inset-0 -z-10 rounded-full bg-fg" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
              )}
              {t(m[k])} <span className="opacity-60">· {(k === "photos" ? SITE.photos : SITE.videos).length}</span>
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {tab === "photos" ? (
            <div className="columns-2 gap-3 lg:columns-3">
              {SITE.photos.map((p, i) => (
                <button
                  key={p.src}
                  onClick={() => setOpen(i)}
                  className="mb-3 block w-full overflow-hidden rounded-2xl ring-1 ring-line"
                >
                  <img
                    src={p.src}
                    alt={t(p.alt)}
                    loading="lazy"
                    decoding="async"
                    className="w-full transition-transform duration-500 hover:scale-[1.03]"
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 items-start gap-3 lg:grid-cols-3">
              {SITE.videos.map((v) => (
                <VideoPlayer key={v.src} video={v} frame="natural" />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t(SITE.photos[open].alt)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4"
          >
            <img src={SITE.photos[open].src} alt={t(SITE.photos[open].alt)} className="max-h-[90svh] max-w-full rounded-xl object-contain" />
            <button
              onClick={() => setOpen(null)}
              aria-label={t(m.close)}
              className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white/10 text-2xl leading-none text-white"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
