import { useState, useEffect } from "react";
import { useT } from "../i18n";

function useCountdown(targetDate) {
  const [time, setTime] = useState({ d: "–", h: "–", m: "–", s: "–" });
  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const p2 = (n) => String(n).padStart(2, "0");
    function tick() {
      const diff = target - Date.now();
      if (diff >= 0) {
        setTime({
          d: p2(Math.floor(diff / 864e5)),
          h: p2(Math.floor((diff % 864e5) / 36e5)),
          m: p2(Math.floor((diff % 36e5) / 6e4)),
          s: p2(Math.floor((diff % 6e4) / 1e3)),
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
  const { d, h, m, s } = useCountdown("2026-09-12T17:30:00-05:00");
  const t = useT();

  return (
    <section className="green">
      <div className="rv">
        <div className="faltan">{t.countdown}</div>
        <div className="cd-wrap">
          <div className="cd-unit">
            <span className="cd-num">{d}</span>
            <span className="cd-lbl">{t.days}</span>
          </div>
          <span className="cd-sep">:</span>
          <div className="cd-unit">
            <span className="cd-num">{h}</span>
            <span className="cd-lbl">{t.hours}</span>
          </div>
          <span className="cd-sep">:</span>
          <div className="cd-unit">
            <span className="cd-num">{m}</span>
            <span className="cd-lbl">{t.min}</span>
          </div>
          <span className="cd-sep">:</span>
          <div className="cd-unit">
            <span className="cd-num">{s}</span>
            <span className="cd-lbl">{t.seg}</span>
          </div>
        </div>

        <div
          style={{
            width: "2px",
            height: "18px",
            background: "rgba(255,255,255,0.3)",
            margin: "18px auto 0",
          }}
        />

        <p className="story">
          {t.story}
          <span className="by">{t.storyBy}</span>
        </p>
      </div>
    </section>
  );
}
