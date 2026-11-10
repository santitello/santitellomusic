/**
 * TODO el contenido de la página vive aquí, en español e inglés.
 *
 * Para cambiar un texto, número o enlace, se edita este archivo y nada más.
 * Las secciones de fotos, video y testimonios se ocultan solas mientras sus
 * listas estén vacías: así nunca se publican recuadros vacíos.
 */

export type Lang = "es" | "en";
type T = Record<Lang, string>;

export const SITE = {
  /** Nombre artístico tal como debe verse. */
  name: "Santi Tello",
  /** WhatsApp con código de país, solo dígitos (ej. "593991234567"). El build falla si está vacío. */
  whatsapp: "",
  /** Redes: se muestran solo las que tengan enlace. */
  social: {
    instagram: "",
    tiktok: "",
    youtube: "",
    facebook: "",
  },
  /** Dónde tocas. Aparece en el hero y en el pie. */
  area: { es: "Ecuador", en: "Ecuador" } satisfies T,

  /**
   * Fotos de shows (en /public/media). La primera también es la del hero.
   * Ej.: { src: "/media/show-1.webp", alt: { es: "Santi en vivo en una boda", en: "Santi live at a wedding" } }
   */
  photos: [] as { src: string; alt: T }[],
  /** Video corto del show (mp4 en /public/media o enlace de YouTube). Vacío = sección oculta. */
  video: "",
  /** Testimonios reales de clientes. Vacío = sección oculta. */
  testimonials: [] as { name: string; event: T; text: T }[],
};

export const COPY = {
  meta: {
    title: {
      es: "Santi Tello · Música en vivo para fiestas y eventos",
      en: "Santi Tello · Live music for parties and events",
    },
    description: {
      es: "Shows de música en vivo para bodas, cumpleaños y eventos corporativos. Energía de fiesta con la seriedad de un profesional. Cotiza por WhatsApp.",
      en: "Live music shows for weddings, birthdays and corporate events. Party energy with professional reliability. Get a quote on WhatsApp.",
    },
  },
  nav: {
    events: { es: "Eventos", en: "Events" },
    show: { es: "El show", en: "The show" },
    how: { es: "Cómo reservar", en: "How to book" },
    faq: { es: "Preguntas", en: "FAQ" },
  },
  cta: {
    whatsapp: { es: "Cotiza tu evento", en: "Get a quote" },
    whatsappLong: { es: "Cotiza tu evento por WhatsApp", en: "Get a quote on WhatsApp" },
    secondary: { es: "Conoce el show", en: "See the show" },
    message: {
      es: "Hola Santi 👋 Quiero cotizar música en vivo para mi evento.\nFecha: \nCiudad: \nTipo de evento: ",
      en: "Hi Santi 👋 I'd like a quote for live music at my event.\nDate: \nCity: \nType of event: ",
    },
  },
  hero: {
    eyebrow: { es: "Música en vivo", en: "Live music" },
    title1: { es: "La música en vivo", en: "The live music" },
    title2: { es: "que enciende tu fiesta", en: "that lights up your party" },
    lead: {
      es: "Shows en vivo para bodas, cumpleaños y eventos corporativos: toda la energía de una gran fiesta, con la puntualidad y el cuidado de un profesional.",
      en: "Live shows for weddings, birthdays and corporate events: all the energy of a great party, with the punctuality and care of a professional.",
    },
  },
  promises: [
    {
      icon: "spark",
      title: { es: "Energía que contagia", en: "Contagious energy" },
      body: { es: "Un show pensado para que nadie se quede sentado.", en: "A show built so nobody stays seated." },
    },
    {
      icon: "list",
      title: { es: "Repertorio a tu medida", en: "Setlist made for you" },
      body: { es: "Armamos juntos la música según tu evento y tu público.", en: "We build the music together around your event and guests." },
    },
    {
      icon: "clock",
      title: { es: "Puntual y profesional", en: "On time, every time" },
      body: { es: "Llego a tiempo, coordino con tu organizador y cumplo lo acordado.", en: "I arrive on time, coordinate with your planner and deliver what we agreed." },
    },
  ],
  events: {
    eyebrow: { es: "Para tu evento", en: "For your event" },
    title: { es: "Cada celebración tiene su música", en: "Every celebration has its soundtrack" },
    items: [
      {
        icon: "rings",
        title: { es: "Bodas", en: "Weddings" },
        body: {
          es: "De la ceremonia al último baile: la canción de entrada, el brindis y la fiesta que tus invitados van a recordar.",
          en: "From the ceremony to the last dance: the entrance song, the toast and the party your guests will remember.",
        },
      },
      {
        icon: "cake",
        title: { es: "Cumpleaños y fiestas", en: "Birthdays & parties" },
        body: {
          es: "Música en vivo que convierte cualquier reunión en una fiesta de verdad.",
          en: "Live music that turns any get-together into a real party.",
        },
      },
      {
        icon: "briefcase",
        title: { es: "Eventos corporativos", en: "Corporate events" },
        body: {
          es: "Lanzamientos, fiestas de fin de año y cenas de empresa, con la seriedad que tu marca necesita.",
          en: "Launches, year-end parties and company dinners, with the professionalism your brand needs.",
        },
      },
      {
        icon: "glass",
        title: { es: "Celebraciones privadas", en: "Private celebrations" },
        body: {
          es: "Aniversarios, graduaciones, pedidas de mano y sorpresas que merecen algo especial.",
          en: "Anniversaries, graduations, proposals and surprises that deserve something special.",
        },
      },
    ],
  },
  show: {
    eyebrow: { es: "El show", en: "The show" },
    title: { es: "Un show que acompaña cada momento", en: "A show for every moment of the night" },
    moments: [
      {
        n: "01",
        title: { es: "Recepción y cena", en: "Welcome & dinner" },
        body: { es: "Música suave y elegante para conversar y brindar.", en: "Smooth, elegant music to talk and toast." },
      },
      {
        n: "02",
        title: { es: "Momentos especiales", en: "Special moments" },
        body: {
          es: "La canción de entrada, el primer baile o la sorpresa: en vivo y en el momento exacto.",
          en: "The entrance song, the first dance or the surprise: live, right on cue.",
        },
      },
      {
        n: "03",
        title: { es: "La fiesta", en: "The party" },
        body: { es: "Los éxitos que todos cantan y bailan, hasta el final.", en: "The hits everyone sings and dances to, all night long." },
      },
    ],
    videoTitle: { es: "Míralo en vivo", en: "See it live" },
    galleryTitle: { es: "En el escenario", en: "On stage" },
  },
  how: {
    eyebrow: { es: "Cómo reservar", en: "How to book" },
    title: { es: "Reservar es simple", en: "Booking is simple" },
    steps: [
      {
        title: { es: "Escríbeme por WhatsApp", en: "Message me on WhatsApp" },
        body: { es: "Cuéntame la fecha, la ciudad y el tipo de evento.", en: "Tell me the date, city and type of event." },
      },
      {
        title: { es: "Recibe tu propuesta", en: "Get your proposal" },
        body: { es: "Te envío disponibilidad, formato del show y cotización.", en: "I'll send availability, show format and a quote." },
      },
      {
        title: { es: "Disfruta tu fiesta", en: "Enjoy your party" },
        body: { es: "Coordinamos los detalles y yo me encargo de la música.", en: "We sort out the details and I take care of the music." },
      },
    ],
  },
  testimonials: {
    eyebrow: { es: "Lo que dicen", en: "What clients say" },
    title: { es: "Fiestas que se recuerdan", en: "Parties people remember" },
  },
  faq: {
    eyebrow: { es: "Preguntas frecuentes", en: "FAQ" },
    title: { es: "Antes de reservar", en: "Before you book" },
    items: [
      {
        q: { es: "¿Cuánto cuesta el show?", en: "How much does the show cost?" },
        a: {
          es: "Depende de la fecha, la ciudad, la duración y el formato. Escríbeme por WhatsApp con esos datos y te envío una cotización sin compromiso.",
          en: "It depends on the date, city, length and format. Message me on WhatsApp with those details and I'll send you a no-obligation quote.",
        },
      },
      {
        q: { es: "¿Con cuánta anticipación debo reservar?", en: "How far in advance should I book?" },
        a: {
          es: "Mientras antes, mejor: las fechas de fin de semana y de temporada alta se ocupan primero. Escríbeme para confirmar disponibilidad.",
          en: "The earlier the better: weekends and peak-season dates fill up first. Message me to check availability.",
        },
      },
      {
        q: { es: "¿Puedo pedir canciones?", en: "Can I request songs?" },
        a: {
          es: "Sí. Armamos el repertorio juntos según tu evento y tu público, incluidas las canciones de los momentos especiales.",
          en: "Yes. We build the setlist together around your event and guests, including the songs for your special moments.",
        },
      },
    ],
  },
  final: {
    title: { es: "¿Tu fecha ya está libre en mi agenda?", en: "Is your date still open on my calendar?" },
    lead: { es: "Escríbeme y lo confirmamos hoy mismo.", en: "Message me and we'll confirm it today." },
  },
  footer: {
    rights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
  },
};
