import { useT } from "../i18n";
import { COUPLE } from "../config";

const iconMap = {
  ceremony: (
    <i
      className="fa-solid fa-church"
      style={{ fontSize: "20px", color: "var(--sage)" }}
    />
  ),
  photoSession: (
    <i
      className="fa-solid fa-camera"
      style={{ fontSize: "20px", color: "var(--sage)" }}
    />
  ),
  toast: (
    <i
      className="fa-solid fa-champagne-glasses"
      style={{ fontSize: "20px", color: "var(--sage)" }}
    />
  ),
  dinner: (
    <i
      className="fa-solid fa-utensils"
      style={{ fontSize: "20px", color: "var(--sage)" }}
    />
  ),
  firstDance: (
    <i
      className="fa-solid fa-music"
      style={{ fontSize: "20px", color: "var(--sage)" }}
    />
  ),
  bouquetToss: (
    <i
      className="fa-solid fa-spa"
      style={{ fontSize: "20px", color: "var(--sage)" }}
    />
  ),
  cakeCutting: (
    <i
      className="fa-solid fa-cake-candles"
      style={{ fontSize: "20px", color: "var(--sage)" }}
    />
  ),
  party: (
    <svg viewBox="0 0 256 256" width="22" height="22" fill="var(--sage)">
      <path d="M111.49,52.63a15.8,15.8,0,0,0-26,5.77L33,202.78A15.83,15.83,0,0,0,47.76,224a16,16,0,0,0,5.46-1l144.37-52.5a15.8,15.8,0,0,0,5.78-26ZM65.14,161.13l19.2-52.79,63.32,63.32-52.8,19.2ZM160,72a37.8,37.8,0,0,1,3.84-15.58C169.14,45.83,179.14,40,192,40c6.7,0,11-2.29,13.65-7.21A22,22,0,0,0,208,23.94,8,8,0,0,1,224,24c0,12.86-8.52,32-32,32-6.7,0-11,2.29-13.65,7.21A22,22,0,0,0,176,72.06,8,8,0,0,1,160,72ZM136,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm101.66,82.34a8,8,0,1,1-11.32,11.31l-16-16a8,8,0,0,1,11.32-11.32Zm4.87-42.75-24,8a8,8,0,0,1-5.06-15.18l24-8a8,8,0,0,1,5.06,15.18Z" />
    </svg>
  ),
  farewell: (
    <i
      className="fa-solid fa-heart"
      style={{ fontSize: "20px", color: "var(--sage)" }}
    />
  ),
};

export default function Itinerary() {
  const t = useT();

  const items = [
    { time: "18:00", name: t.ceremony, icon: "ceremony" },
    { time: "18:45", name: t.photoSession, icon: "photoSession" },
    { time: "19:30", name: t.toast, icon: "toast" },
    { time: "20:00", name: t.dinner, icon: "dinner" },
    { time: "21:00", name: t.firstDance, icon: "firstDance" },
    { time: "21:30", name: t.bouquetToss, icon: "bouquetToss" },
    { time: "21:45", name: t.cakeCutting, icon: "cakeCutting" },
    { time: "22:00", name: t.party, icon: "party" },
    { time: "00:00", name: t.farewell, icon: "farewell" },
  ];

  const itiList = (
    <div className="iti-list">
      {items.map((item, i) => {
        const isLeft = i % 2 === 0;
        return (
          <div
            className={`iti-item rv ${isLeft ? "iti-left" : "iti-right"}`}
            key={i}
          >
            <div className="iti-txt">
              {isLeft && (
                <>
                  <div className="iti-time">{item.time}</div>
                  <div className="iti-name">{item.name}</div>
                </>
              )}
            </div>
            <div className="iti-center">
              {i < items.length - 1 && <div className="iti-line" />}
              <div className="iti-ic">{iconMap[item.icon]}</div>
            </div>
            <div className="iti-txt">
              {!isLeft && (
                <>
                  <div className="iti-time">{item.time}</div>
                  <div className="iti-name">{item.name}</div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const itiPhoto = (
    <div className="photo rv" style={{ aspectRatio: "4/5", marginTop: "54px" }}>
      <img
        src="https://i.postimg.cc/0Q4yXm1c/parejaboda.jpg"
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
    <section className="iti" data-stagger="true">
      <div className="iti-mobile">
        <h2 className="rv">{t.itinerary}</h2>
        {itiList}
        {itiPhoto}
      </div>
      <div className="iti-desk">
        <div className="iti-desk-list">
          <h2 className="rv">{t.itinerary}</h2>
          {itiList}
        </div>
        <div className="iti-desk-photo">{itiPhoto}</div>
      </div>
    </section>
  );
}
