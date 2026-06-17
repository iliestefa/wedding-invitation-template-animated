import { useEffect, useRef, useState } from 'react';
import './App.css';
import { useT } from './i18n';
import { useAnimated } from './context/AnimatedContext';
import defaultMusicUrl from './assets/music.mp3';

import Intro from './components/Intro';
import GreenSection from './components/GreenSection';
import EventSection from './components/EventSection';
import Itinerary from './components/Itinerary';
import GoodToKnow from './components/GoodToKnow';
import Rsvp from './components/Rsvp';
import Closing from './components/Closing';

// CSS vars del template — normalmente en index.css standalone, aquí scoped al wrapper.
const TEMPLATE_CSS_VARS = {
  '--sage':      '#7e8862',
  '--sage-deep': '#6c7650',
  '--sage-soft': '#929c76',
  '--cream':     '#f4efe3',
  '--cream-2':   '#ece4d4',
  '--ink':       '#2c2a23',
  '--ink-soft':  '#5b5642',
  '--white':     '#fbf8f1',
  '--line':      'rgba(44, 42, 35, 0.15)',
  '--sh-sm':     '0 4px 14px -8px rgba(40,38,28,0.4)',
  '--sh-md':     '0 18px 38px -22px rgba(40,38,28,0.45)',
  '--sh-lg':     '0 34px 70px -34px rgba(40,38,28,0.55)',
};

export default function AnimatedEditorApp({ scrollContainerRef }) {
  const t = useT();
  const { initials, musicUrl } = useAnimated();
  const audioSrc = musicUrl || defaultMusicUrl;

  // Resetea el estado de reproducción cuando cambia la fuente de audio
  useEffect(() => { setPlaying(false); }, [audioSrc]);
  const audioRef    = useRef(null);
  const outerRef    = useRef(null); // contenedor externo (overlay) — overflow:hidden, no scrollea
  const innerRef    = useRef(null); // contenedor interno (contenido) — overflow-y:auto, scrollea

  const [playing,       setPlaying]       = useState(false);
  const [scrollY,       setScrollY]       = useState(0);
  const [dropped,       setDropped]       = useState(false);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  // Entrada del sobre — delay 80ms para que el CSS transition lo anime desde arriba
  useEffect(() => {
    const id = setTimeout(() => setDropped(true), 80);
    return () => clearTimeout(id);
  }, []);

  // Dimensiones del viewport del canvas (outer div)
  useEffect(() => {
    const el = outerRef.current ?? scrollContainerRef?.current;
    if (!el) return;
    const update = () => setContainerSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [scrollContainerRef]);

  // Scroll tracked desde el inner div (el que realmente scrollea)
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const onScroll = () => setScrollY(el.scrollTop);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver y stagger — root = inner scroll div
  useEffect(() => {
    const root  = innerRef.current ?? null;
    const scope = root ?? document;

    scope.querySelectorAll('[data-stagger]').forEach((s) => {
      [...s.querySelectorAll('.rv')].forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
      });
    });

    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }),
      { threshold: 0.1, root },
    );
    scope.querySelectorAll('.rv').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const vh = containerSize.h || (typeof window !== 'undefined' ? window.innerHeight : 800);
  const vw = containerSize.w || (typeof window !== 'undefined' ? window.innerWidth  : 390);

  const p       = Math.min(1, scrollY / (vh * 0.75));
  const flapP   = Math.min(1, p / 0.6);
  const flapDeg = flapP * -180;

  const isDesk    = vw >= 768;
  const deskDropP = isDesk ? Math.min(1, p / 0.5)                       : 0;
  const deskOpenP = isDesk ? Math.min(1, Math.max(0, (p - 0.5) / 0.5)) : 0;
  const foldP     = isDesk ? deskOpenP                                   : 0;

  const envW0 = Math.min(vw * 0.88, 520);
  const envH0 = envW0 * (280 / 420);

  let envTYpx, envWidth, envRadius;
  if (isDesk) {
    const centerOffset = vh / 2 - envH0 / 2;
    const dropOffset   = dropped ? 0 : -(vh + envH0);
    envTYpx   = -(1 - deskDropP) * centerOffset + dropOffset;
    const envWNum = envW0 + p * (vw - envW0);
    envWidth  = `${Math.round(envWNum)}px`;
    envRadius = Math.round(4 * (1 - p));
  } else {
    const centerOffset = vh / 2 - envH0 / 2;
    const envTYpx1     = -(1 - p) * centerOffset;
    const extraScroll  = Math.max(0, scrollY - vh * 1.5);
    const dropOffset   = dropped ? 0 : -(vh + envH0);
    envTYpx   = envTYpx1 + extraScroll * 0.25 + dropOffset;
    const mobileW = Math.min(vw * 0.88 + p * vw * 0.12, Math.min(520 + p * (vw - 520), vw));
    envWidth  = `${Math.round(mobileW)}px`;
    envRadius = Math.round(4 * (1 - p));
  }

  const dropRot   = dropped ? 0 : 12;
  // Estilos compartidos para las dos capas del sobre
  const envBoxStyle = {
    position: 'absolute', bottom: 0, left: '50%',
    transform: `translateX(-50%) translateY(${envTYpx}px) rotate(${dropRot}deg)`,
    width: envWidth, borderRadius: `${envRadius}px`,
    transition: dropped && scrollY === 0 ? 'transform 1.1s cubic-bezier(0.22,1,0.36,1)' : 'none',
  };

  return (
    /*
     * Contenedor externo: position:relative + overflow:hidden
     * Los hijos position:absolute aquí son verdaderamente "fixed" dentro del canvas —
     * no scrollean porque el padre no tiene overflow:auto.
     */
    <div
      ref={outerRef}
      style={{
        ...TEMPLATE_CSS_VARS,
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#0e1109',
        fontFamily: "'Cormorant Garamond', serif",
        color: 'var(--ink)',
        WebkitFontSmoothing: 'antialiased',
        lineHeight: 1.6,
      }}
    >
      {/* ── Overlay oscuro de fondo ─────────────────────────────── */}
      {scrollY < vh * 2 && (
        <div
          className="cover-bg-dark"
          style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
        />
      )}

      {/* ── Sobre (dos capas: fondo z2 y frente z4) ─────────────── */}
      {(!isDesk || deskOpenP < 1) && (
        <>
          {/* Capa trasera del sobre — queda detrás del contenido (z2 < z3) */}
          <div className="env-box" style={{ ...envBoxStyle, zIndex: 2, overflow: 'visible', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', inset: 0, background: '#f0ead8', borderRadius: `${envRadius}px`, boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 6px 20px rgba(0,0,0,0.4)' }} />
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} viewBox="0 0 420 280" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gt-ed" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#e0d9c8" />
                  <stop offset="100%" stopColor="#ede7d6" />
                </linearGradient>
              </defs>
              <path d="M0 0 L420 0 L210 168 Z" fill="url(#gt-ed)" />
              <line x1="0" y1="0" x2="210" y2="168" stroke="#b8b09c" strokeWidth="0.7" opacity="0.5" />
              <line x1="420" y1="0" x2="210" y2="168" stroke="#b8b09c" strokeWidth="0.7" opacity="0.5" />
            </svg>
            <div className="env-flap-scene">
              <div className="env-flap" style={{ transform: `rotateX(${flapDeg}deg)` }}>
                <svg className="env-flap-svg" viewBox="0 0 420 200" style={{ backfaceVisibility: 'hidden' }}>
                  <defs>
                    <linearGradient id="fg-ed" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8d9773" />
                      <stop offset="100%" stopColor="#5e6a47" />
                    </linearGradient>
                  </defs>
                  <path d="M0 0 L420 0 L210 190 Z" fill="url(#fg-ed)" />
                </svg>
                <svg className="env-flap-svg" viewBox="0 0 420 200" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <path d="M0 0 L420 0 L210 190 Z" fill="#e8e2d0" />
                  <path d="M0 0 L420 0 L210 190 Z" fill="none" stroke="#c4bba8" strokeWidth="0.8" />
                </svg>
              </div>
            </div>
          </div>

          {/* Capa delantera del sobre — queda delante del contenido (z4 > z3) */}
          <div className="env-box" style={{ ...envBoxStyle, zIndex: 4, pointerEvents: 'none' }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 420 280" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gl-ed" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#d6cfbc" /><stop offset="100%" stopColor="#ede7d6" /></linearGradient>
                <linearGradient id="gr-ed" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#cfc8b5" /><stop offset="100%" stopColor="#ede7d6" /></linearGradient>
                <linearGradient id="gb-ed" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="#c8c1ae" /><stop offset="100%" stopColor="#ddd7c5" /></linearGradient>
              </defs>
              <path d="M0 0 L210 168 L0 280"    fill="url(#gl-ed)" style={{ transformOrigin: '0px 140px',   transform: `scaleX(${1 - foldP * 0.95})` }} />
              <path d="M420 0 L210 168 L420 280" fill="url(#gr-ed)" style={{ transformOrigin: '420px 140px', transform: `scaleX(${1 - foldP * 0.95})` }} />
              <path d="M0 280 L210 168 L420 280" fill="url(#gb-ed)" style={{ transformOrigin: '210px 280px', transform: `scaleY(${1 - foldP * 0.95})` }} />
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

      {/* ── Hint de scroll ──────────────────────────────────────── */}
      <div
        className="env-hint"
        style={{
          position: 'absolute', bottom: 28, left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          opacity: p < 0.05 ? 1 : Math.max(0, 1 - p * 20),
          pointerEvents: 'none',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
          <path d="M19 9l-7 7-7-7" />
        </svg>
        <span>{t.scrollHint}</span>
      </div>

      {/* ── Contenedor interno scrolleable ──────────────────────── */}
      <div
        ref={innerRef}
        style={{
          position: 'absolute',
          inset: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(196,152,90,0.3) transparent',
        }}
      >
        <audio key={audioSrc} ref={audioRef} loop preload="none">
          <source src={audioSrc} type="audio/mpeg" />
        </audio>

        {/* Espaciador: distancia necesaria para completar la animación del sobre */}
        <div style={{ height: isDesk ? `${Math.round(vh * 0.8)}px` : `${Math.round(vh * 1.95)}px` }} />

        {/* Contenido de la invitación — aparece como la "carta" saliendo del sobre */}
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
            href="https://www.instagram.com/wedya.digital"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '12px', letterSpacing: '0.22em', color: 'rgba(245,240,228,0.55)', textDecoration: 'none', fontFamily: 'Cormorant Garamond, serif' }}
          >
            {t.madeWith}
            <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Wedya</span>
          </a>
        </div>
      </div>
    </div>
  );
}
