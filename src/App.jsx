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
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDropped(true), 80);
    return () => clearTimeout(t);
  }, []);

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

  // p: 0→1 durante los primeros 75vh de scroll
  const p = Math.min(1, scrollY / (vh * 0.75));

  // Solapa abre en p 0→0.6
  const flapP   = Math.min(1, p / 0.6);
  const flapDeg = flapP * -180;

  // Sobre: bottom:0 fijo, sube para quedar centrado al inicio
  const envW0        = Math.min(vw * 0.88, 520);
  const envH0        = envW0 * (280 / 420);
  const centerOffset = vh / 2 - envH0 / 2;
  const envTYpx1 = -(1 - p) * centerOffset;
  // Pausa 75vh→150vh, luego baja fuera de pantalla
  const extraScroll = Math.max(0, scrollY - vh * 1.5);
  // Caída inicial: arriba de pantalla → centro (antes del primer scroll)
  const dropOffset = dropped ? 0 : -(vh + envH0);
  const envTYpx  = envTYpx1 + extraScroll * 0.25 + dropOffset;
  // Rotación de hoja cayendo: 12° → 0° durante la caída
  const dropRot = dropped ? 0 : 12;
  const envRadius    = Math.round(4 * (1 - p));
  const envWidth     = `min(calc(88vw + ${p * 12}vw), calc(520px + ${p} * (100vw - 520px)))`;


  return (
    <>
      <audio ref={audioRef} loop preload="none">
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Fondo oscuro — solo visible mientras el contenido no ha subido a taparlo */}
      {scrollY < vh * 2 && (
        <div className="cover-bg-dark" style={{ position: 'fixed', inset: 0, zIndex: 1 }} />
      )}


      {<>

      {/* ── CAPA AZUL z:2 — solapa + pliegue superior (quedan DETRÁS del contenido) ── */}
      <div className="env-box" style={{ position:'fixed', bottom:0, left:'50%',
        transform:`translateX(-50%) translateY(${envTYpx}px) rotate(${dropRot}deg)`,
        width:envWidth, borderRadius:`${envRadius}px`, zIndex:2, overflow:'visible',
        transition: dropped && scrollY === 0 ? 'transform 1.1s cubic-bezier(0.22,1,0.36,1)' : 'none' }}>

        {/* Fondo blanco del sobre */}
        <div style={{ position:'absolute', inset:0, background:'#f0ead8',
          borderRadius:`${envRadius}px`,
          boxShadow:'0 20px 60px rgba(0,0,0,0.6), 0 6px 20px rgba(0,0,0,0.4)' }} />

        {/* Pliegue superior (triángulo de la parte alta del cuerpo) */}
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', overflow:'visible' }}
          viewBox="0 0 420 280" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gt" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0d9c8"/><stop offset="100%" stopColor="#ede7d6"/>
            </linearGradient>
          </defs>
          {/* Triángulo superior — de esquina a esquina hacia el centro */}
          <path d="M0 0 L420 0 L210 168 Z" fill="url(#gt)"/>
          <line x1="0" y1="0" x2="210" y2="168" stroke="#b8b09c" strokeWidth="0.7" opacity="0.5"/>
          <line x1="420" y1="0" x2="210" y2="168" stroke="#b8b09c" strokeWidth="0.7" opacity="0.5"/>
        </svg>

        {/* Solapa animada */}
        <div className="env-flap-scene">
          <div className="env-flap" style={{ transform:`rotateX(${flapDeg}deg)` }}>
            <svg className="env-flap-svg" viewBox="0 0 420 200"
              style={{ backfaceVisibility:'hidden' }}>
              <defs>
                <linearGradient id="fg" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8d9773"/><stop offset="100%" stopColor="#5e6a47"/>
                </linearGradient>
              </defs>
              <path d="M0 0 L420 0 L210 190 Z" fill="url(#fg)"/>
            </svg>
            <svg className="env-flap-svg" viewBox="0 0 420 200"
              style={{ backfaceVisibility:'hidden', transform:'rotateY(180deg)' }}>
              <path d="M0 0 L420 0 L210 190 Z" fill="#e8e2d0"/>
              <path d="M0 0 L420 0 L210 190 Z" fill="none" stroke="#c4bba8" strokeWidth="0.8"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── CAPA ROJA z:4 — pliegues laterales e inferior (van ENCIMA del contenido) ── */}
      <div className="env-box" style={{ position:'fixed', bottom:0, left:'50%',
        transform:`translateX(-50%) translateY(${envTYpx}px) rotate(${dropRot}deg)`,
        width:envWidth, borderRadius:`${envRadius}px`, zIndex:4, pointerEvents:'none',
        transition: dropped && scrollY === 0 ? 'transform 1.1s cubic-bezier(0.22,1,0.36,1)' : 'none' }}>
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}
          viewBox="0 0 420 280" preserveAspectRatio="none">
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
          {/* Pliegue lateral izquierdo */}
          <path d="M0 0 L210 168 L0 280" fill="url(#gl)"/>
          {/* Pliegue lateral derecho */}
          <path d="M420 0 L210 168 L420 280" fill="url(#gr)"/>
          {/* Pliegue inferior */}
          <path d="M0 280 L210 168 L420 280" fill="url(#gb)"/>
          <line x1="0"   y1="0"   x2="210" y2="168" stroke="#b8b09c" strokeWidth="0.7" opacity="0.5"/>
          <line x1="420" y1="0"   x2="210" y2="168" stroke="#b8b09c" strokeWidth="0.7" opacity="0.5"/>
          <line x1="0"   y1="280" x2="210" y2="168" stroke="#b8b09c" strokeWidth="0.7" opacity="0.5"/>
          <line x1="420" y1="280" x2="210" y2="168" stroke="#b8b09c" strokeWidth="0.7" opacity="0.5"/>
          {/* Sello en la intersección de los pliegues */}
          <circle cx="210" cy="168" r="42" fill="#6b7550"/>
          <circle cx="210" cy="168" r="36" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
          <text x="210" y="178" textAnchor="middle"
            fontFamily="'Great Vibes', cursive" fontSize="24"
            letterSpacing="4"
            fill="rgba(255,255,255,0.9)">B&amp;R</text>
        </svg>
      </div>

      </> }

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

      {/* Spacer: 75vh animación + pausa = 190vh */}
      <div style={{ height: '195vh' }} />

      {/* Contenido — z:3, entre los azules (2) y los rojos (4) */}
      <div className="invite-content" style={{ position:'relative', zIndex:3 }}>
        <Intro audioRef={audioRef} playing={playing} setPlaying={setPlaying} />
        <GreenSection />
        <EventSection />
        <Itinerary />
        <GoodToKnow />
        <Rsvp />
        <Closing />
      </div>
    </>
  );
}
