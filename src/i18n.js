export const translations = {
  es: {
    // Intro
    wereGettingMarried: "¡Nos casamos!",
    saturday: "SÁBADO",
    september: "SEPTIEMBRE",
    october: "OCTUBRE",
    phrase: "Nuestro feliz para siempre llegó.",
    ourSong: "Nuestra canción — Young and Beautiful",
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
    ceremony: "Ceremonia",
    reception: "Recepción",
    // Itinerary
    itinerary: "Itinerario",
    cocktail: "Cóctel y fotos",
    firstDance: "Primer baile",
    dinner: "Cena",
    party: "Fiesta",
    // GoodToKnow
    information: "Información",
    dressCode: "Vestimenta",
    dressCodeContent: [
      {
        label: "Mujeres:",
        text: "No usar vestidos blancos ni negros.",
      },
      {
        label: "Hombres:",
        text: "No usar blazers o sacos blancos.",
      },
      { label: "Todos los invitados:", text: "Evitar prendas con diseño." },
    ],
    parking: "Estacionamiento",
    parkingContent:
      "Valet Parking (una persona del lugar estaciona tu coche por ti).",
    children: "Niños",
    childrenContent:
      "Los niños no pueden ingresar, es una fiesta para adultos.",
    gifts: "Regalos",
    giftsContent:
      "Su presencia es nuestro mejor regalo. Si desean tener un detalle con nosotros, pueden utilizar la siguiente opción:",
    giftsQr: "Código QR\naquí",
    arrival: "Llegada",
    arrivalContent: "Te esperamos a las 18:00.",
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
    verse: '"El que no ama no conoce a Dios, porque Dios es amor."',
    verseRef: "1 Juan 4:8",
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
    phrase: "Our happily ever after has arrived.",
    ourSong: "Our song — Young and Beautiful",
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
    storyBy: "— Juana",
    // EventSection
    venueName: "Ex Convento de San Hipólito",
    venueAddr:
      "Av. Hidalgo 107, Centro Histórico, Guerrero, 06300 Mexico City, CDMX, Mexico",
    viewLocation: "View location",
    ceremony: "Ceremony",
    reception: "Reception",
    // Itinerary
    itinerary: "Itinerary",
    cocktail: "Cocktail & photos",
    firstDance: "First dance",
    dinner: "Dinner",
    party: "Party",
    // GoodToKnow
    information: "Information",
    dressCode: "Dress code",
    dressCodeContent: [
      {
        label: "Women:",
        text: "Please do not wear white or black dresses.",
      },
      {
        label: "Men:",
        text: "Please do not wear white blazers or suit jackets.",
      },
      {
        label: "All guests:",
        text: "Please avoid patterned clothing.",
      },
    ],
    parking: "Parking",
    parkingContent: "Valet Parking (an attendant will park your car for you).",
    children: "Children",
    childrenContent:
      "Children are not allowed; this is an adults-only celebration.",
    gifts: "Gifts",
    giftsContent:
      "Your presence is our greatest gift. If you'd like to give us something, you may use the following option:",
    giftsQr: "QR Code\nhere",
    arrival: "Arrival",
    arrivalContent:
      "Doors open at 5:00 PM. Please do not arrive before that time.",
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
    verse: '"Whoever does not love does not know God, because God is love."',
    verseRef: "1 John 4:8",
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
