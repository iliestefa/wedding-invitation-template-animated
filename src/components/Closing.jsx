export default function Closing() {
  return (
    <section className="closing" data-stagger="true">
      <p className="verse rv">"El que no ama no conoce a Dios, porque Dios es amor."</p>
      <div className="verse-ref rv">1 Juan 4:8</div>
      <div className="photo rv" style={{ marginTop: '48px', aspectRatio: '3/4' }}>
        <img
          src="https://i.postimg.cc/QxDJQz0D/img3.jpg"
          alt="Braydon y Reli"
          onError={e => { e.target.parentElement.style.background = 'linear-gradient(160deg,#aeb892,#7e8862)'; e.target.remove(); }}
        />
      </div>
      <div className="mono pf rv" style={{ marginTop: '58px' }}>B<span className="bar" />R</div>
      <div className="fdate rv">10 · 10 · 2026</div>
    </section>
  );
}
