export default function Intro() {
  return (
    <section className="intro" data-stagger="true">
      <div className="mono pf rv">B<span className="bar" />R</div>
      <div className="casamos rv">¡Nos casamos!</div>
      <div className="casamos-sub rv">Nuestro feliz para siempre llegó.</div>
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
