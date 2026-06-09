import { useT } from "../i18n";
import { COUPLE } from "../config";
export default function Intro({ audioRef, playing, setPlaying }) {
  const t = useT();

  function toggle() {
    const audio = audioRef?.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  const textCol = (
    <>
      <div
        className="mono pf rv"
        style={{ fontSize: "clamp(48px, 12vw, 72px)" }}
      >
        A<span className="bar" />M
      </div>
      <div className="casamos rv">{t.wereGettingMarried}</div>
      <div className="intro-names rv">{COUPLE}</div>
      <div className="datebox rv" style={{ marginTop: "20px" }}>
        <div className="side">
          <div className="l" />
          <small>{t.saturday}</small>
        </div>
        <div className="mid">
          <div className="mo">{t.september}</div>
          <div className="dd gv">12</div>
        </div>
        <div className="side">
          <div className="l" />
          <small style={{ fontSize: "16px" }}>2026</small>
        </div>
      </div>
    </>
  );

  const photoCol = (
    <div className="now-playing rv">
      <div className="np-photo">
        <img
          src="https://i.postimg.cc/8CMKfCFX/image.webp"
          alt={`${COUPLE}`}
          onError={(e) => {
            e.target.parentElement.style.background =
              "linear-gradient(160deg,#aeb892,#7e8862)";
            e.target.remove();
          }}
        />
      </div>
      <div className="np-controls">
        <div className="np-info">
          <span className="np-title">{t.phrase}</span>
          <span className="np-artist">{t.ourSong}</span>
        </div>
        <div className="np-progress">
          <div className="np-track">
            <div className={`np-fill${playing ? " playing" : ""}`} />
          </div>
        </div>
        <div className="np-buttons">
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="currentColor"
            style={{ opacity: 0.4 }}
          >
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
          <button className="np-btn" onClick={toggle} aria-label={t.playPause}>
            {playing ? (
              <svg
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="currentColor"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="currentColor"
            style={{ opacity: 0.4 }}
          >
            <path d="M6 18l8.5-6L6 6v12zm2.5-6 8.5 6V6z" />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <section className="intro" data-stagger="true">
      <div className="intro-mobile">
        {textCol}
        {photoCol}
      </div>
      <div className="intro-desk">
        <div className="intro-desk-photo">{photoCol}</div>
        <div className="intro-desk-text">{textCol}</div>
      </div>
    </section>
  );
}
