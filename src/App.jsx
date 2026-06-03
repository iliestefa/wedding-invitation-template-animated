import { useEffect, useRef, useState } from 'react';
import './App.css';

import Intro from './components/Intro';
import GreenSection from './components/GreenSection';
import EventSection from './components/EventSection';
import Itinerary from './components/Itinerary';
import GoodToKnow from './components/GoodToKnow';
import Rsvp from './components/Rsvp';
import Closing from './components/Closing';

export default function App() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function onScroll() { setScrollY(window.scrollY); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.querySelectorAll('[data-stagger]').forEach(s => {
      [...s.querySelectorAll('.rv')].forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
      });
    });
    const io = new IntersectionObserver(
      es => es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.rv').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const vw = typeof window !== 'undefined' ? window.innerWidth  : 390;

  // p: 0→1 durante los primeros 300vh de scroll
  const p = Math.min(1, scrollY / (vh * 3));

  // Solapa abre en p 0→0.6
  const flapP   = Math.min(1, p / 0.6);
  const flapDeg = flapP * -180;
  const sealOp  = Math.max(0, 1 - flapP * 2.5);

  // Sobre: bottom:0 fijo, sube para quedar centrado al inicio
  const envW0        = Math.min(vw * 0.88, 520);
  const envH0        = envW0 * (280 / 420);
  const centerOffset = vh / 2 - envH0 / 2;
  const envTYpx      = -(1 - p) * centerOffset;
  const envRadius    = Math.round(4 * (1 - p));
  const envWidth     = `min(calc(88vw + ${p * 12}vw), calc(520px + ${p} * (100vw - 520px)))`;

  // Sobre desaparece: empieza a 350vh, termina a 400vh
  const envOpacity = p < 1 ? 1 : Math.max(0, 1 - (scrollY - vh * 3.5) / (vh * 0.5));

  return (
    <>
      <audio ref={audioRef} loop preload="none">
        <source src="" type="audio/mpeg" />
      </audio>

      {/* Fondo oscuro — fixed, desaparece junto con el sobre */}
      <div
        className="cover-bg-dark"
        style={{
          position: 'fixed', inset: 0, zIndex: 1,
          opacity: envOpacity,
          pointerEvents: envOpacity <= 0 ? 'none' : 'auto',
        }}
      />


      {/* Sobre — fixed encima del contenido */}
      {envOpacity > 0 && (
        <div
          className="env-box"
          style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: `translateX(-50%) translateY(${envTYpx}px)`,
            width: envWidth,
            borderRadius: `${envRadius}px`,
            zIndex: 10,
            opacity: envOpacity,
          }}
        >
          <div className="env-body">
            <svg className="env-folds" viewBox="0 0 420 280" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gl" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d6cfbc"/><stop offset="100%" stopColor="#ede7d6"/>
                </linearGradient>
                <linearGradient id="gr" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#cfc8b5"/><stop offset="100%" stopColor="#ede7d6"/>
                </linearGradient>
                <linearGradient id="gb" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#c8c1ae"/><stop offset="100%" stopColor="#ddd7c5"/>
                </linearGradient>
              </defs>
              <path d="M0 0 L210 168 L0 280"    fill="url(#gl)"/>
              <path d="M420 0 L210 168 L420 280" fill="url(#gr)"/>
              <path d="M0 280 L210 168 L420 280" fill="url(#gb)"/>
              <line x1="0"   y1="0"   x2="210" y2="168" stroke="#b8b09c" strokeWidth="0.7" opacity="0.5"/>
              <line x1="420" y1="0"   x2="210" y2="168" stroke="#b8b09c" strokeWidth="0.7" opacity="0.5"/>
              <line x1="0"   y1="280" x2="210" y2="168" stroke="#b8b09c" strokeWidth="0.7" opacity="0.5"/>
              <line x1="420" y1="280" x2="210" y2="168" stroke="#b8b09c" strokeWidth="0.7" opacity="0.5"/>
            </svg>
          </div>

          <div className="env-flap-scene">
            <div className="env-flap" style={{ transform: `rotateX(${flapDeg}deg)` }}>
              <svg className="env-flap-svg front" viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg"
                style={{ opacity: flapP < 0.5 ? 1 : Math.max(0, 1 - (flapP - 0.5) * 4) }}>
                <defs>
                  <linearGradient id="fg" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8d9773"/><stop offset="100%" stopColor="#5e6a47"/>
                  </linearGradient>
                </defs>
                <path d="M0 0 L420 0 L210 190 Z" fill="url(#fg)"/>
                <g style={{ opacity: sealOp }}>
                  <circle cx="210" cy="78" r="30" fill="#6b7550"/>
                  <circle cx="210" cy="78" r="25" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
                  <text x="210" y="86" textAnchor="middle"
                    fontFamily="'Great Vibes', cursive" fontSize="22"
                    fill="rgba(255,255,255,0.88)">B&amp;R</text>
                </g>
              </svg>
              <svg className="env-flap-svg back" viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg"
                style={{ opacity: flapP > 0.5 ? Math.min(1, (flapP - 0.5) * 3) : 0 }}>
                <path d="M0 0 L420 0 L210 190 Z" fill="#e2dccb"/>
                <path d="M0 0 L420 0 L210 190 Z" fill="none" stroke="#c4bba8" strokeWidth="0.8"/>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Hint */}
      <div
        className="env-hint"
        style={{
          position: 'fixed', bottom: 28, left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          opacity: p < 0.05 ? 1 : Math.max(0, 1 - p * 20),
          pointerEvents: 'none',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
          <path d="M19 9l-7 7-7-7"/>
        </svg>
        <span>Desliza para abrir</span>
      </div>

      {/* Spacer de 400vh = sobre completamente abajo mucho antes de que salga el contenido */}
      <div style={{ height: '400vh' }} />

      {/* Contenido — flujo normal, empieza en scrollY=100vh */}
      <div className="invite-content">
        <Intro />
        <GreenSection audioRef={audioRef} playing={playing} setPlaying={setPlaying} />
        <EventSection />
        <Itinerary />
        <GoodToKnow />
        <Rsvp />
        <Closing />
      </div>
    </>
  );
}
