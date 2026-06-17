import { useAnimated } from '../context/AnimatedContext';

export default function Closing() {
  const { couple, initials, verse, imageClosing, weddingDateDisplay, weddingDateIso } = useAnimated();

  const [gi, bi] = (initials || 'A&M').split('&');

  const displayDate = weddingDateDisplay || (() => {
    const [dateStr] = (weddingDateIso || '2026-09-12').split('T');
    const [yr, mo, dy] = (dateStr || '2026-09-12').split('-').map(Number);
    return `${String(dy).padStart(2,'0')} · ${String(mo).padStart(2,'0')} · ${yr}`;
  })();

  return (
    <section className="closing" data-stagger="true">
      <div className="closing-hero rv">
        <img
          src={imageClosing}
          alt={couple}
          onError={(e) => {
            e.target.parentElement.style.background = 'linear-gradient(160deg,#aeb892,#7e8862)';
            e.target.remove();
          }}
        />
        <div className="closing-overlay">
          <div className="closing-mono pf">
            {gi}<span className="bar" />{bi}
          </div>
          <p className="closing-verse gv">{verse}</p>
          <div className="closing-deco">
            <span />
            <span />
            <span />
          </div>
          <div className="closing-date">{displayDate}</div>
        </div>
      </div>
    </section>
  );
}
