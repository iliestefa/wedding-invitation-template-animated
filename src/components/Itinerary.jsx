/* Iconos inline de Heroicons (MIT) — no SVG caseros */
const icons = {
  rings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="14" r="5"/>
      <circle cx="15" cy="14" r="5"/>
      <path d="M12 4l1.5 2.5L12 9l-1.5-2.5Z"/>
    </svg>
  ),
  cheers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 22h8M12 11v11M7 2l1 9h8l1-9"/>
      <path d="M7 2c0 0-2 4 0 7h10c2-3 0-7 0-7"/>
    </svg>
  ),
  music: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  ),
  dinner: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l19-9-9 19-2-8-8-2z"/>
    </svg>
  ),
  party: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.8 11.3 2 22l10.7-3.79"/>
      <path d="M4 3h.01M22 8h.01M15 2h.01M22 20h.01M22 2l-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/>
      <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/>
      <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/>
      <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2z"/>
    </svg>
  ),
};

const items = [
  { time: '5:30 PM', name: 'Ceremonia', icon: 'rings' },
  { time: '6:30 PM', name: 'Cóctel y fotos', icon: 'cheers' },
  { time: '7:15 PM', name: 'Primer baile', icon: 'music' },
  { time: '7:30 PM', name: 'Cena', icon: 'dinner' },
  { time: '8:30 – 11:30 PM', name: 'Fiesta', icon: 'party' },
];

export default function Itinerary() {
  return (
    <section className="iti" data-stagger="true">
      <h2 className="rv">Itinerario</h2>
      <div className="iti-list">
        {items.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div className={`iti-item rv ${isLeft ? 'iti-left' : 'iti-right'}`} key={i}>
              {/* Texto izquierda */}
              <div className="iti-txt">
                {isLeft && <><div className="iti-time">{item.time}</div><div className="iti-name">{item.name}</div></>}
              </div>
              {/* Icono central con línea */}
              <div className="iti-center">
                {i < items.length - 1 && <div className="iti-line" />}
                <div className="iti-ic">{icons[item.icon]}</div>
              </div>
              {/* Texto derecha */}
              <div className="iti-txt">
                {!isLeft && <><div className="iti-time">{item.time}</div><div className="iti-name">{item.name}</div></>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="photo rv" style={{ marginTop: '54px', aspectRatio: '4/5' }}>
        <img
          src="https://i.postimg.cc/QxDJQz0N/img1.jpg"
          alt="Braydon y Reli"
          onError={e => { e.target.parentElement.style.background = 'linear-gradient(160deg,#aeb892,#7e8862)'; e.target.remove(); }}
        />
      </div>
    </section>
  );
}
