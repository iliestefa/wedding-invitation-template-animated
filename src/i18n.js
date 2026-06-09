export const translations = {
  es: {
    // Intro
    wereGettingMarried: "¡Nos casamos!",
    saturday: "SÁBADO",
    september: "SEPTIEMBRE",
    october: "OCTUBRE",
    phrase: "El destino nos unió, el amor nos hizo inseparables....",
    ourSong: "Nuestra canción — Perfect",
    playPause: "Reproducir / pausar",
    // GreenSection
    countdown: "FALTAN",
    days: "Días",
    hours: "Horas",
    min: "Min",
    seg: "Seg",
    story: `Conocí a Juan en un viaje a la playa, empezamos a compartir
      conversaciones, risas y pequeñas experiencias que poco a poco
      fueron creando algo especial entre nosotros. Todo fluyó de forma
      auténtica, el resto, es historia...`,
    storyBy: "— Juana",
    // EventSection
    venueName: "Ex Convento de San Hipólito",
    venueAddr:
      "Av. Hidalgo 107, Centro Histórico, Guerrero, 06300 Ciudad de México, CDMX, México",
    viewLocation: "Ver ubicación",
    reception: "Recepción",
    // Itinerary
    itinerary: "Itinerario",
    ceremony: "Ceremonia",
    photoSession: "Sesión de fotos principal",
    toast: "Brindis y discursos",
    dinner: "Cena",
    firstDance: "Primer baile",
    bouquetToss: "Lanzar el ramo",
    cakeCutting: "Cortar el pastel",
    party: "Fiesta",
    farewell: "Despedida",
    // GoodToKnow
    information: "Información",
    dressCode: "Vestimenta",
    dressCodeContent: [
      {
        label: "Mujeres:",
        text: "Vestido de cocktail, traje sastre o conjunto elegante. Se recomiendan colores pastel, tonos joya o estampados sutiles. Evitar vestidos blancos, negros o demasiado cortos informales.",
      },
      {
        label: "Hombres:",
        text: "Traje formal o semi-formal con camisa y corbata (opcional). Se recomiendan colores claros o tonos oscuros. Evitar blazers o sacos blancos, jeans y ropa demasiado casual.",
      },
      {
        label: "Todos los invitados:",
        text: "Vestimenta elegante acorde a una boda formal. Evitar prendas con diseños llamativos, ropa deportiva, gorras y chanclas.",
      },
    ],
    gifts: "Regalos",
    giftsContent:
      "Su presencia es nuestro mejor regalo. Puedes enviar tus regalos antes, durante y después de la boda. Puedes darnos un detalle a través de nuestra cuenta bancaria: 1234567890.",
    photography: "Fotografía",
    photographyContent:
      "Las fotografías las tomarán profesionales, también les invitamos a subir sus fotos a nuestra galería compartida.",
    // RSVP
    rsvpTitle: "Confirmación de asistencia",
    rsvpSubtitle: "¿Nos acompañas?",
    rsvpText:
      "Por favor, confirma tu asistencia lo antes posible para reservar tu espacio y finalizar los detalles de la celebración.",
    rsvpBtn: "Confirmar por WhatsApp",
    // Closing
    verse:
      "El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso ni orgulloso.",
    verseRef: "1 Corintios 13:4",
    // Hint
    scrollHint: "Desliza para abrir",
    // Footer
    madeWith: "Diseñado con ❤️ por ",
  },
  en: {
    // Intro
    wereGettingMarried: "We're getting married!",
    saturday: "SATURDAY",
    september: "SEPTEMBER",
    october: "OCTOBER",
    phrase: "Destiny brought us together, love made us inseparable…",
    ourSong: "Our song — Perfect",
    playPause: "Play / pause",
    // GreenSection
    countdown: "COUNTDOWN",
    days: "Days",
    hours: "Hours",
    min: "Min",
    seg: "Sec",
    story: `I met Juan on a trip to the beach. We began sharing conversations, laughter,
      and small experiences that, little by little, created something special
      between us. Everything flowed naturally, and the rest is history...`,
    storyBy: "— María",
    // EventSection
    venueName: "Ex Convento de San Hipólito",
    venueAddr:
      "Av. Hidalgo 107, Centro Histórico, Guerrero, 06300 Mexico City, CDMX, Mexico",
    viewLocation: "View location",
    reception: "Reception",
    // Itinerary
    itinerary: "Itinerary",
    ceremony: "Ceremony",
    photoSession: "Main photo session",
    toast: "Toast and speeches",
    dinner: "Dinner",
    firstDance: "First dance",
    bouquetToss: "Bouquet toss",
    cakeCutting: "Cake cutting",
    party: "Party",
    farewell: "Farewell",
    // GoodToKnow
    information: "Information",
    dressCode: "Dress code",
    dressCodeContent: [
      {
        label: "Women:",
        text: "Cocktail dress, pantsuit, or elegant ensemble. Pastel colors, jewel tones, or subtle prints are recommended. Avoid white or black dresses, as well as overly casual or short attire.",
      },
      {
        label: "Men:",
        text: "Formal or semi-formal suit with shirt and tie (optional). Light or dark tones are recommended. Avoid white blazers or suit jackets, jeans, and overly casual clothing.",
      },
      {
        label: "All guests:",
        text: "Elegant attire appropriate for a formal wedding. Avoid loud patterns, sportswear, caps, and flip-flops.",
      },
    ],
    gifts: "Gifts",
    giftsContent:
      "Your presence is our greatest gift. You can send gifts before, during, or after the wedding. You may give us a token of your love through our bank account: 1234567890.",
    photography: "Photography",
    photographyContent:
      "Photos will be taken by professionals, but we invite you to upload your photos to our shared gallery too.",
    // RSVP
    rsvpTitle: "RSVP",
    rsvpSubtitle: "Will you join us?",
    rsvpText:
      "Please confirm your attendance as soon as possible so we can reserve your spot and finalize the celebration details.",
    rsvpBtn: "Confirm via Text Message",
    // Closing
    verse:
      "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
    verseRef: "1 Corinthians 13:4",
    // Hint
    scrollHint: "Scroll to open",
    // Footer
    madeWith: "Designed with ❤️ by ",
  },
};

export function useLang() {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : "",
  );
  const lang = params.get("lang");
  return lang === "en" ? "en" : "es";
}

export function useT() {
  const lang = useLang();
  return translations[lang];
}
