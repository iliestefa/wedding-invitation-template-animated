import { useState } from 'react';
import { useT } from '../i18n';

export default function GoodToKnow() {
  const [openIdx, setOpenIdx] = useState(null);
  const t = useT();

  const ITEMS = [
    {
      title: t.dressCode,
      content: (
        <>
          {t.dressCodeContent.map((d, i) => (
            <p key={i}><strong>{d.label}</strong> {d.text}</p>
          ))}
        </>
      ),
    },
    { title: t.parking,     content: <p>{t.parkingContent}</p> },
    { title: t.children,    content: <p>{t.childrenContent}</p> },
    {
      title: t.gifts,
      content: (
        <>
          <p>{t.giftsContent}</p>
          <div className="qr-wrap">
            <a href="https://enroll.zellepay.com/qr-codes?data=ewogICJ0b2tlbiIgOiAiNTA0Mjk2NDYyOSIsCiAgImFjdGlvbiIgOiAicGF5bWVudCIsCiAgIm5hbWUiIDogIlJFTEkiCn0=" target="_blank" rel="noopener noreferrer" className="qr-link">
              <img src="/qr.jpg" alt="QR Zelle" className="qr-img" />
            </a>
            <a href="https://enroll.zellepay.com/qr-codes?data=ewogICJ0b2tlbiIgOiAiNTA0Mjk2NDYyOSIsCiAgImFjdGlvbiIgOiAicGF5bWVudCIsCiAgIm5hbWUiIDogIlJFTEkiCn0=" target="_blank" rel="noopener noreferrer" className="qr-goto">
              Ir a página
            </a>
          </div>
        </>
      ),
    },
    { title: t.arrival,     content: <p>{t.arrivalContent}</p> },
    { title: t.photography, content: <p>{t.photographyContent}</p> },
  ];

  const renderItem = (item, i) => {
    const isOpen = openIdx === i;
    return (
      <div key={i} className={`acc-item${isOpen ? ' open' : ''}`}>
        <button className="acc-btn" onClick={() => setOpenIdx(isOpen ? null : i)}>
          {item.title}
          <svg className="ico chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <div className="acc-body" style={{ maxHeight: isOpen ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1)' }}>
          <div className="inner">{item.content}</div>
        </div>
      </div>
    );
  };

  return (
    <section className="gtk" data-stagger="true">
      <div className="gtk-head rv">
        <h2 className="pf">{t.information}</h2>
      </div>
      <div className="acc gtk-mobile">
        {ITEMS.map(renderItem)}
      </div>
      <div className="gtk-desk">
        <div className="acc">{ITEMS.slice(0, 3).map(renderItem)}</div>
        <div className="acc">{ITEMS.slice(3).map((item, i) => renderItem(item, i + 3))}</div>
      </div>
    </section>
  );
}
