import { useEffect } from "react";
import { COPY } from "@/content";
import { useLang } from "@/lib/lang";
import { Footer, Header, WhatsAppFab } from "@/components/Layout";
import { Events, Faq, FinalCta, Formats, Hero, How, Promises, Show, Testimonials } from "@/components/Sections";
import { MediaGallery } from "@/components/Media";

export default function App() {
  const { t } = useLang();

  // Título y descripción en el idioma elegido (pestaña del navegador y al compartir).
  useEffect(() => {
    document.title = t(COPY.meta.title);
    document.querySelector('meta[name="description"]')?.setAttribute("content", t(COPY.meta.description));
  }, [t]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Promises />
        <Formats />
        <MediaGallery />
        <Events />
        <Show />
        <How />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
