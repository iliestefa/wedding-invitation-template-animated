export default function EventSection() {
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=29750+Farkas+Lane%2C+Albany%2C+LA';

  const infoCol = (
    <>
      <div className="ev-venue rv">
        <div className="ev-venue-name">Jardín de nuestra casa</div>
        <div className="ev-venue-addr">29750 Farkas Lane, Albany, LA</div>
        <a className="ubic" href={mapsUrl} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5"/>
          </svg>
          Ver ubicación
        </a>
      </div>
      <div className="ev-row rv">
        <div className="ev-item">
          <div className="ev-ic">
            <i className="fa-solid fa-church" style={{ fontSize:'28px', color:'var(--sage)' }} />
          </div>
          <div className="ev-time">5:30 PM</div>
          <div className="ev-type">Ceremonia</div>
        </div>
        <div className="ev-divider" />
        <div className="ev-item">
          <div className="ev-ic">
            <i className="fa-solid fa-champagne-glasses" style={{ fontSize:'28px', color:'var(--sage)' }} />
          </div>
          <div className="ev-time">6:30 PM</div>
          <div className="ev-type">Recepción</div>
        </div>
      </div>
    </>
  );

  const photoCol = (
    <div className="photo rv">
      <img
        src="https://i.postimg.cc/zXNFCQ0Z/img2.jpg"
        alt="Braydon y Reli"
        onError={e => { e.target.parentElement.style.background = 'linear-gradient(160deg,#aeb892,#7e8862)'; e.target.remove(); }}
      />
    </div>
  );

  return (
    <section className="event" data-stagger="true">
      {/* Mobile: columna única */}
      <div className="event-mobile">
        {photoCol}
        {infoCol}
      </div>
      {/* Desktop: 2 columnas — ev-row arriba del venue */}
      <div className="event-desk">
        <div className="event-desk-photo">{photoCol}</div>
        <div className="event-desk-info">
          <div className="ev-row rv">
            <div className="ev-item">
              <div className="ev-ic"><i className="fa-solid fa-church" style={{ fontSize:'28px', color:'var(--sage)' }} /></div>
              <div className="ev-time">5:30 PM</div>
              <div className="ev-type">Ceremonia</div>
            </div>
            <div className="ev-divider" />
            <div className="ev-item">
              <div className="ev-ic"><i className="fa-solid fa-champagne-glasses" style={{ fontSize:'28px', color:'var(--sage)' }} /></div>
              <div className="ev-time">6:30 PM</div>
              <div className="ev-type">Recepción</div>
            </div>
          </div>
          <div className="ev-venue rv">
            <div className="ev-venue-name">Jardín de nuestra casa</div>
            <div className="ev-venue-addr">29750 Farkas Lane, Albany, LA</div>
            <a className="ubic" href={mapsUrl} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              Ver ubicación
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
