import { useEffect, useRef, useState } from 'react';
import './App.css';
import { useT } from './i18n';
import { translations } from './i18n';
import { GROOM, BRIDE, IMAGE_HERO, IMAGE_EVENT, IMAGE_ITINERARY, IMAGE_CLOSING } from './config';
import { AnimatedTemplateProvider, useAnimated } from './context/AnimatedContext';

import Intro from './components/Intro';
import GreenSection from './components/GreenSection';
import EventSection from './components/EventSection';
import Itinerary from './components/Itinerary';
import GoodToKnow from './components/GoodToKnow';
import Rsvp from './components/Rsvp';
import Closing from './components/Closing';

const es = translations.es;

const STANDALONE_DATA = {
  groomName:        GROOM,
  brideName:        BRIDE,
  phrase:           es.phrase,
  songName:         es.ourSong,
  weddingDateIso:   '2026-09-12',
  weddingTime:      '17:30',
  weddingDateDisplay: '12 · 09 · 2026',
  story:            es.story,
  storyBy:          es.storyBy,
  venueName:        es.venueName,
  venueAddr:        es.venueAddr,
  mapsUrl:          'https://www.google.com/maps/search/?api=1&query=Ex+Convento+de+San+Hipolito%2C+Ciudad+de+Mexico%2C+Mexico',
  ceremonyTime:     '18:00',
  receptionTime:    '19:00',
  itineraryItems: [
    { id: 'ceremony',     time: '18:00', label: es.ceremony },
    { id: 'photoSession', time: '18:45', label: es.photoSession },
    { id: 'toast',        time: '19:30', label: es.toast },
    { id: 'dinner',       time: '20:00', label: es.dinner },
    { id: 'firstDance',   time: '21:00', label: es.firstDance },
    { id: 'bouquetToss',  time: '21:30', label: es.bouquetToss },
    { id: 'cakeCutting',  time: '21:45', label: es.cakeCutting },
    { id: 'party',        time: '22:00', label: es.party },
    { id: 'farewell',     time: '00:00', label: es.farewell },
  ],
  dressCodeItems:      es.dressCodeContent.map((d, i) => ({ id: `dc-${i}`, ...d })),
  giftsContent:        es.giftsContent,
  photographyContent:  es.photographyContent,
  goodToKnowItems:     [],
  verse:               es.verse,
  musicUrl:        `${import.meta.env.BASE_URL}music.mp3`,
  imageHero:       IMAGE_HERO,
  imageEvent:      IMAGE_EVENT,
  imageItinerary:  IMAGE_ITINERARY,
  imageClosing:    IMAGE_CLOSING,
};

export default function App() {
  return (
    <AnimatedTemplateProvider data={STANDALONE_DATA}>
      <AppInner />
    </AnimatedTemplateProvider>
  );
}

function AppInner() {
  const t = useT();
  const { initials, musicUrl } = useAnimated();
  const audioRef = useRef(null);
  const [playing, setPlaying]   = useState(false);
  const [scrollY, setScrollY]   = useState(0);
  const [dropped, setDropped]   = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setDropped(true), 80);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    function onScroll() { setScrollY(window.scrollY); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.querySelectorAll('[data-stagger]').forEach((s) => {
      [...s.querySelectorAll('.rv')].forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
      });
    });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }),
      { threshold: 0.1 },
    );
    document.querySelectorAll('.rv').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const vw = typeof window !== 'undefined' ? window.innerWidth  : 390;

  const p       = Math.min(1, scrollY / (vh * 0.75));
  const flapP   = Math.min(1, p / 0.6);
  const flapDeg = flapP * -180;

  const isDesk     = vw >= 768;
  const deskDropP  = isDesk ? Math.min(1, p / 0.5)                          : 0;
  const deskOpenP  = isDesk ? Math.min(1, Math.max(0, (p - 0.5) / 0.5))    : 0;
  const foldP      = isDesk ? deskOpenP                                      : 0;

  const envW0 = Math.min(vw * 0.88, 520);
  const envH0 = envW0 * (280 / 420);

  let envTYpx, envWidth, envRadius;
  if (isDesk) {
    const centerOffset = vh / 2 - envH0 / 2;
    const dropOffset   = dropped ? 0 : -(vh + envH0);
    envTYpx   = -(1 - deskDropP) * centerOffset + dropOffset;
    envWidth  = `min(calc(${envW0}px + ${p} * (100vw - ${envW0}px)), 100vw)`;
    envRadius = Math.round(4 * (1 - p));
  } else {
    const centerOffset = vh / 2 - envH0 / 2;
    const envTYpx1     = -(1 - p) * centerOffset;
    const extraScroll  = Math.max(0, scrollY - vh * 1.5);
    const dropOffset   = dropped ? 0 : -(vh + envH0);
    envTYpx   = envTYpx1 + extraScroll * 0.25 + dropOffset;
    envWidth  = `min(calc(88vw + ${p * 12}vw), calc(520px + ${p} * (100vw - 520px)))`;
    envRadius = Math.round(4 * (1 - p));
  }

  const dropRot = dropped ? 0 : 12;

  return (
    <>
      {musicUrl && (
        <audio ref={audioRef} loop preload="none">
          <source src={musicUrl} type="audio/mpeg" />
        </audio>
      )}

      {scrollY < vh * 2 && (
        <div className="cover-bg-dark" style={{ position: 'fixed', inset: 0, zIndex: 1 }} />
      )}

      {(!isDesk || deskOpenP < 1) && (
        <>
          <div
            className="env-box"
            style={{
              position: 'fixed', bottom: 0, left: '50%',
              transform: `translateX(-50%) translateY(${envTYpx}px) rotate(${dropRot}deg)`,
              width: envWidth, borderRadius: `${envRadius}px`, zIndex: 2, overflow: 'visible',
              transition: dropped && scrollY === 0 ? 'transform 1.1s cubic-bezier(0.22,1,0.36,1)' : 'none',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: '#f0ead8', borderRadius: `${envRadius}px`, boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 6px 20px rgba(0,0,0,0.4)' }} />
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} viewBox="0 0 420 280" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gt" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#e0d9c8" />
                  <stop offset="100%" stopColor="#ede7d6" />
                </linearGradient>
              </defs>
              <path d="M0 0 L420 0 L210 168 Z" fill="url(#gt)" />
              <line x1="0" y1="0" x2="210" y2="168" stroke="#b8b09c" strokeWidth="0.7" opacity="0.5" />
              <line x1="420" y1="0" x2="210" y2="168" stroke="#b8b09c" strokeWidth="0.7" opacity="0.5" />
            </svg>
            <div className="env-flap-scene">
              <div className="env-flap" style={{ transform: `rotateX(${flapDeg}deg)` }}>
                <svg className="env-flap-svg" viewBox="0 0 420 200" style={{ backfaceVisibility: 'hidden' }}>
                  <defs>
                    <linearGradient id="fg" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8d9773" />
                      <stop offset="100%" stopColor="#5e6a47" />
                    </linearGradient>
                  </defs>
                  <path d="M0 0 L420 0 L210 190 Z" fill="url(#fg)" />
                </svg>
                <svg className="env-flap-svg" viewBox="0 0 420 200" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <path d="M0 0 L420 0 L210 190 Z" fill="#e8e2d0" />
                  <path d="M0 0 L420 0 L210 190 Z" fill="none" stroke="#c4bba8" strokeWidth="0.8" />
                </svg>
              </div>
            </div>
          </div>

          <div
            className="env-box"
            style={{
              position: 'fixed', bottom: 0, left: '50%',
              transform: `translateX(-50%) translateY(${envTYpx}px) rotate(${dropRot}deg)`,
              width: envWidth, borderRadius: `${envRadius}px`, zIndex: 4, pointerEvents: 'none',
              transition: dropped && scrollY === 0 ? 'transform 1.1s cubic-bezier(0.22,1,0.36,1)' : 'none',
            }}
          >
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 420 280" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gl" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#d6cfbc" /><stop offset="100%" stopColor="#ede7d6" /></linearGradient>
                <linearGradient id="gr" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#cfc8b5" /><stop offset="100%" stopColor="#ede7d6" /></linearGradient>
                <linearGradient id="gb" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="#c8c1ae" /><stop offset="100%" stopColor="#ddd7c5" /></linearGradient>
              </defs>
              <path d="M0 0 L210 168 L0 280" fill="url(#gl)" style={{ transformOrigin: '0px 140px', transform: `scaleX(${1 - foldP * 0.95})` }} />
              <path d="M420 0 L210 168 L420 280" fill="url(#gr)" style={{ transformOrigin: '420px 140px', transform: `scaleX(${1 - foldP * 0.95})` }} />
              <path d="M0 280 L210 168 L420 280" fill="url(#gb)" style={{ transformOrigin: '210px 280px', transform: `scaleY(${1 - foldP * 0.95})` }} />
              <g style={{ transformOrigin: '210px 280px', transform: `scaleY(${1 - foldP * 0.95})` }}>
                <circle cx="210" cy="168" r="42" fill="#6b7550" />
                <circle cx="210" cy="168" r="36" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
                <text x="210" y="178" textAnchor="middle" fontFamily="'Great Vibes', cursive" fontSize="24" letterSpacing="4" fill="rgba(255,255,255,0.9)">
                  {initials}
                </text>
              </g>
            </svg>
          </div>
        </>
      )}

      <div
        className="env-hint"
        style={{ position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 20, opacity: p < 0.05 ? 1 : Math.max(0, 1 - p * 20), pointerEvents: 'none' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
          <path d="M19 9l-7 7-7-7" />
        </svg>
        <span>{t.scrollHint}</span>
      </div>

      <div style={{ height: isDesk ? '80vh' : '195vh' }} />

      <div
        className="invite-content"
        style={{
          position: 'relative', zIndex: 3,
          opacity: isDesk ? (deskDropP < 1 ? 0 : 1) : 1,
          transform: isDesk ? `scaleX(${envW0 / vw + (1 - envW0 / vw) * deskOpenP})` : undefined,
          transformOrigin: isDesk ? 'top center' : undefined,
        }}
      >
        <Intro audioRef={audioRef} playing={playing} setPlaying={setPlaying} />
        <GreenSection />
        <EventSection />
        <Itinerary />
        <GoodToKnow />
        <Rsvp />
        <Closing />
      </div>

      <div style={{ textAlign: 'center', padding: '20px 0', zIndex: 3, position: 'relative' }}>
        <a
          href="https://www.instagram.com/wedya.digital?igsh=cXl0MmIxNDZiNTdm&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '12px', letterSpacing: '0.22em', color: 'rgba(245,240,228,0.55)', textDecoration: 'none', fontFamily: 'Cormorant Garamond, serif' }}
        >
          {t.madeWith}
          <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Wedya</span>
        </a>
      </div>
    </>
  );
}
