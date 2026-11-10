import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Lang } from "@/content";

const KEY = "stm:lang";

/** Idioma inicial: el que eligió antes, si no el del navegador, si no español. */
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "es" || saved === "en") return saved;
  } catch { /* modo privado */ }
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
}

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void } | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch { /* modo privado */ }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang fuera de LangProvider");
  /** Traduce un par { es, en } al idioma actual. */
  const t = (s: Record<Lang, string>) => s[ctx.lang];
  return { ...ctx, t };
}
