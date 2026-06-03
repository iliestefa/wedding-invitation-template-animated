import { useState, useEffect } from 'react';

const PLAY_PATH = 'M8 5v14l11-7z';
const PAUSE_PATH = 'M6 19h4V5H6v14zm8-14v14h4V5h-4z';

function useCountdown(targetDate) {
  const [time, setTime] = useState({ d: '–', h: '–', m: '–', s: '–' });
  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const p2 = n => String(n).padStart(2, '0');
    function tick() {
      const diff = target - Date.now();
      if (diff >= 0) {
        setTime({
          d: p2(Math.floor(diff / 864e5)),
          h: p2(Math.floor(diff % 864e5 / 36e5)),
          m: p2(Math.floor(diff % 36e5 / 6e4)),
          s: p2(Math.floor(diff % 6e4 / 1e3)),
        });
      }
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

export default function GreenSection({ audioRef, playing, setPlaying }) {
  const { d, h, m, s } = useCountdown('2026-10-10T17:30:00-05:00');
  const [iconPath, setIconPath] = useState(PLAY_PATH);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      setPlaying(true);
      setIconPath(PAUSE_PATH);
    } else {
      audio.pause();
      setPlaying(false);
      setIconPath(PLAY_PATH);
    }
  }

  return (
    <section className="green">
      <div className="rv">
        {/* Player de música */}
        <div className="player-wrap">
          <div className="player-song">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>
              <circle cx="18" cy="16" r="3"/>
            </svg>
            <span>Those Eyes — New West</span>
          </div>
          <div className="progress"><span className="knob" /></div>
          <button className="play-btn" onClick={toggle} aria-label="Reproducir / pausar">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d={iconPath} fill="var(--sage-deep)" />
            </svg>
          </button>
        </div>

        <p className="story">
          Nuestra primera cita fue en el restaurante Palace Café. En nuestra segunda cita, Braydon me sorprendió invitándome a comer comida hondureña — quería probarla — y eso me mostró que estaba interesado. Y lo demás… es historia.
          <span className="by">— Reli</span>
        </p>

        <div className="datebox">
          <div className="side"><div className="l" /><small>SÁBADO</small></div>
          <div className="mid"><div className="mo">OCTUBRE</div><div className="dd gv">10</div></div>
          <div className="side"><div className="l" /><small>2026</small></div>
        </div>

        <div className="faltan">FALTAN</div>
        <div className="cd">
          <span>{d}</span><span className="sep">:</span>
          <span>{h}</span><span className="sep">:</span>
          <span>{m}</span><span className="sep">:</span>
          <span>{s}</span>
        </div>
        <div className="cd lbls">
          <span>Días</span><span>Horas</span><span>Min</span><span>Seg</span>
        </div>
      </div>
    </section>
  );
}
