export default function Intro() {
  return (
    <section className="intro" data-stagger="true">
      <div className="mono pf rv" style={{ fontSize: 'clamp(48px, 12vw, 72px)' }}>B<span className="bar" />R</div>
      <div className="casamos rv">¡Nos casamos!</div>
      <div className="intro-names rv">Braydon &amp; Reli</div>
      <div className="casamos-sub rv" style={{ marginTop: '8px' }}>Nuestro feliz para siempre llegó.</div>
      <div className="datebox rv" style={{ marginTop: '20px' }}>
        <div className="side"><div className="l" /><small>SÁBADO</small></div>
        <div className="mid"><div className="mo">OCTUBRE</div><div className="dd gv">10</div></div>
        <div className="side"><div className="l" /><small>2026</small></div>
      </div>
      <div className="photo rv">
        <img
          src="https://i.postimg.cc/QxDJQz0N/img1.jpg"
          alt="Braydon y Reli"
          onError={e => { e.target.parentElement.style.background = 'linear-gradient(160deg,#aeb892,#7e8862)'; e.target.remove(); }}
        />
      </div>
    </section>
  );
}
