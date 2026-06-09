import { useT } from "../i18n";
import { COUPLE } from "../config";

export default function Closing() {
  const t = useT();

  return (
    <section className="closing" data-stagger="true">
      <div className="closing-hero rv">
        <img
          src="https://i.postimg.cc/GhStXJ2C/pareja.jpg"
          alt={COUPLE}
          onError={(e) => {
            e.target.parentElement.style.background =
              "linear-gradient(160deg,#aeb892,#7e8862)";
            e.target.remove();
          }}
        />
        <div className="closing-overlay">
          <div className="closing-mono pf">
            A<span className="bar" />M
          </div>
          <p className="closing-verse gv">{t.verse}</p>
          <div className="closing-deco">
            <span />
            <span />
            <span />
          </div>
          <div className="closing-date">12 · 09 · 2026</div>
        </div>
      </div>
    </section>
  );
}
