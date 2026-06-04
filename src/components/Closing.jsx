export default function Closing() {
  return (
    <section className="closing" data-stagger="true">
      <div className="closing-hero rv">
        <img
          src="https://i.postimg.cc/QxDJQz0D/img3.jpg"
          alt="Braydon y Reli"
          onError={e => { e.target.parentElement.style.background = 'linear-gradient(160deg,#aeb892,#7e8862)'; e.target.remove(); }}
        />
        <div className="closing-overlay">
          <div className="closing-mono pf">B<span className="bar" />R</div>
          <p className="closing-verse gv">"El que no ama no conoce a Dios,<br/>porque Dios es amor."</p>
          <div className="closing-ref">1 Juan 4:8</div>
          <div className="closing-deco"><span /><span /><span /></div>
          <div className="closing-date">10 · 10 · 2026</div>
        </div>
      </div>
    </section>
  );
}
