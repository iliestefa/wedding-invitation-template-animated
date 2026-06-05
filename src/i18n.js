export const translations = {
  es: {
    // Intro
    wereGettingMarried: '¡Nos casamos!',
    saturday: 'SÁBADO',
    october: 'OCTUBRE',
    phrase: 'Nuestro feliz para siempre llegó.',
    ourSong: 'Nuestra canción — Those Eyes',
    playPause: 'Reproducir / pausar',
    // GreenSection
    countdown: 'FALTAN',
    days: 'Días',
    hours: 'Horas',
    min: 'Min',
    seg: 'Seg',
    story: 'Nuestra primera cita fue en el restaurante Palace Café. En nuestra segunda cita, Braydon me sorprendió invitándome a comer comida hondureña — quería probarla — y eso me mostró que estaba interesado. Y lo demás… es historia.',
    storyBy: '— Reli',
    // EventSection
    venueName: 'Jardín de nuestra casa',
    venueAddr: '29750 Farkas Lane, Albany, LA',
    viewLocation: 'Ver ubicación',
    ceremony: 'Ceremonia',
    reception: 'Recepción',
    // Itinerary
    itinerary: 'Itinerario',
    cocktail: 'Cóctel y fotos',
    firstDance: 'Primer baile',
    dinner: 'Cena',
    party: 'Fiesta',
    // GoodToKnow
    information: 'Información',
    dressCode: 'Vestimenta',
    dressCodeContent: [
      { label: 'Mujeres:', text: 'No usar vestidos blancos, beige o tonos similares al blanco. Tampoco color negro.' },
      { label: 'Hombres:', text: 'Les pedimos evitar blazers o sacos blancos y beige. Pueden usar camisa blanca sin problema, siempre que el blazer o saco sea de un color diferente.' },
      { label: 'Todos los invitados:', text: 'Evitar prendas estampadas.' },
    ],
    parking: 'Estacionamiento',
    parkingContent: 'Parqueo disponible en nuestro jardín (29750 Farkas Lane, Albany, LA).',
    children: 'Niños',
    childrenContent: 'Si durante la ceremonia un niño se inquieta o llora, agradecemos acompañarlo momentáneamente fuera del área principal.',
    gifts: 'Regalos',
    giftsContent: 'Su presencia es nuestro mejor regalo. Si desean tener un detalle con nosotros, pueden utilizar la siguiente opción:',
    giftsQr: 'Código QR\naquí',
    arrival: 'Llegada',
    arrivalContent: 'Te esperamos a partir de las 5:00 PM. Por favor, no llegar antes de esa hora.',
    photography: 'Fotografía',
    photographyContent: 'Nos encantará que tomen fotos. Si las comparten en redes sociales, les pedimos elegir imágenes favorecedoras para todos.',
    // RSVP
    rsvpTitle: 'Confirmación de asistencia',
    rsvpSubtitle: '¿Nos acompañas?',
    rsvpText: 'Por favor, confirma tu asistencia lo antes posible para reservar tu espacio y finalizar los detalles de la celebración.',
    rsvpBtn: 'Confirmar por WhatsApp',
    // Closing
    verse: '"El que no ama no conoce a Dios, porque Dios es amor."',
    verseRef: '1 Juan 4:8',
    // Hint
    scrollHint: 'Desliza para abrir',
    // Footer
    madeWith: 'Diseñado con ❤️ por ',
  },
  en: {
    // Intro
    wereGettingMarried: 'We\'re getting married!',
    saturday: 'SATURDAY',
    october: 'OCTOBER',
    phrase: 'Our happily ever after has arrived.',
    ourSong: 'Our song — Those Eyes',
    playPause: 'Play / pause',
    // GreenSection
    countdown: 'COUNTDOWN',
    days: 'Days',
    hours: 'Hours',
    min: 'Min',
    seg: 'Sec',
    story: 'Our first date was at Palace Café restaurant. On our second date, Braydon surprised me by taking me out for Honduran food — he wanted to try it — and that showed me he was interested. And the rest… is history.',
    storyBy: '— Reli',
    // EventSection
    venueName: 'Our Home Garden',
    venueAddr: '29750 Farkas Lane, Albany, LA',
    viewLocation: 'View location',
    ceremony: 'Ceremony',
    reception: 'Reception',
    // Itinerary
    itinerary: 'Itinerary',
    cocktail: 'Cocktail & photos',
    firstDance: 'First dance',
    dinner: 'Dinner',
    party: 'Party',
    // GoodToKnow
    information: 'Information',
    dressCode: 'Dress code',
    dressCodeContent: [
      { label: 'Women:', text: 'Please avoid white, beige or similar shades. No black either.' },
      { label: 'Men:', text: 'Please avoid white or beige blazers and jackets. A white shirt is perfectly fine, as long as it is paired with a blazer or jacket in a different color.' },
      { label: 'All guests:', text: 'Please avoid printed or patterned clothing.' },
    ],
    parking: 'Parking',
    parkingContent: 'Parking available at our garden (29750 Farkas Lane, Albany, LA).',
    children: 'Children',
    childrenContent: 'If a child becomes restless or cries during the ceremony, we kindly ask that you step outside the main area momentarily.',
    gifts: 'Gifts',
    giftsContent: 'Your presence is our greatest gift. If you\'d like to give us something, you may use the following option:',
    giftsQr: 'QR Code\nhere',
    arrival: 'Arrival',
    arrivalContent: 'Doors open at 5:00 PM. Please do not arrive before that time.',
    photography: 'Photography',
    photographyContent: 'We love that you\'ll take photos! If you share them on social media, we kindly ask that you choose flattering images of everyone.',
    // RSVP
    rsvpTitle: 'RSVP',
    rsvpSubtitle: 'Will you join us?',
    rsvpText: 'Please confirm your attendance as soon as possible so we can reserve your spot and finalize the celebration details.',
    rsvpBtn: 'Confirm via Text Message',
    // Closing
    verse: '"Whoever does not love does not know God, because God is love."',
    verseRef: '1 John 4:8',
    // Hint
    scrollHint: 'Scroll to open',
    // Footer
    madeWith: 'Designed with ❤️ by ',
  },
};

export function useLang() {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const lang = params.get('lang');
  return lang === 'en' ? 'en' : 'es';
}

export function useT() {
  const lang = useLang();
  return translations[lang];
}
