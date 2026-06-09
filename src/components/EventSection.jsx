import { useT } from "../i18n";
import { COUPLE } from "../config";

export default function EventSection() {
  const t = useT();
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Ex+Convento+de+San+Hipolito%2C+Ciudad+de+Mexico%2C+Mexico";

  const infoCol = (
    <>
      <div className="ev-venue rv">
        <div className="ev-venue-name">{t.venueName}</div>
        <div className="ev-venue-addr">{t.venueAddr}</div>
        <a
          className="ubic"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          {t.viewLocation}
        </a>
      </div>
      <div className="ev-row rv">
        <div className="ev-item">
          <div className="ev-ic">
            <i
              className="fa-solid fa-church"
              style={{ fontSize: "28px", color: "var(--sage)" }}
            />
          </div>
          <div className="ev-time">18:00</div>
          <div className="ev-type">{t.ceremony}</div>
        </div>
        <div className="ev-divider" />
        <div className="ev-item">
          <div className="ev-ic">
            <i
              className="fa-solid fa-champagne-glasses"
              style={{ fontSize: "28px", color: "var(--sage)" }}
            />
          </div>
          <div className="ev-time">19:00</div>
          <div className="ev-type">{t.reception}</div>
        </div>
      </div>
    </>
  );

  const photoCol = (
    <div className="photo rv">
      <img
        src="https://i.postimg.cc/gk97yJLs/pedidademano.jpg"
        alt={COUPLE}
        onError={(e) => {
          e.target.parentElement.style.background =
            "linear-gradient(160deg,#aeb892,#7e8862)";
          e.target.remove();
        }}
      />
    </div>
  );

  return (
    <section className="event" data-stagger="true">
      <div className="event-mobile">
        {photoCol}
        {infoCol}
      </div>
      <div className="event-desk">
        <div className="event-desk-photo">{photoCol}</div>
        <div className="event-desk-info">
          <div className="ev-row rv">
            <div className="ev-item">
              <div className="ev-ic">
                <i
                  className="fa-solid fa-church"
                  style={{ fontSize: "28px", color: "var(--sage)" }}
                />
              </div>
              <div className="ev-time">18:00</div>
              <div className="ev-type">{t.ceremony}</div>
            </div>
            <div className="ev-divider" />
            <div className="ev-item">
              <div className="ev-ic">
                <i
                  className="fa-solid fa-champagne-glasses"
                  style={{ fontSize: "28px", color: "var(--sage)" }}
                />
              </div>
              <div className="ev-time">19:00</div>
              <div className="ev-type">{t.reception}</div>
            </div>
          </div>
          <div className="ev-venue rv">
            <div className="ev-venue-name">{t.venueName}</div>
            <div className="ev-venue-addr">{t.venueAddr}</div>
            <a
              className="ubic"
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              {t.viewLocation}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
