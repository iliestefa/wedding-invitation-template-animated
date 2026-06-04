import { useState, useEffect } from 'react';

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

export default function GreenSection() {
  const { d, h, m, s } = useCountdown('2026-10-10T17:30:00-05:00');

  return (
    <section className="green">
      <div className="rv">

        <div className="faltan">FALTAN</div>
        <div className="cd-wrap">
          <div className="cd-unit"><span className="cd-num">{d}</span><span className="cd-lbl">Días</span></div>
          <span className="cd-sep">:</span>
          <div className="cd-unit"><span className="cd-num">{h}</span><span className="cd-lbl">Horas</span></div>
          <span className="cd-sep">:</span>
          <div className="cd-unit"><span className="cd-num">{m}</span><span className="cd-lbl">Min</span></div>
          <span className="cd-sep">:</span>
          <div className="cd-unit"><span className="cd-num">{s}</span><span className="cd-lbl">Seg</span></div>
        </div>

        <div style={{ width:'2px', height:'18px', background:'rgba(255,255,255,0.3)', margin:'18px auto 0' }} />

        <p className="story">
          Nuestra primera cita fue en el restaurante Palace Café. En nuestra segunda cita, Braydon me sorprendió invitándome a comer comida hondureña — quería probarla — y eso me mostró que estaba interesado. Y lo demás… es historia.
          <span className="by">— Reli</span>
        </p>
      </div>
    </section>
  );
}
