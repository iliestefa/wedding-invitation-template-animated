import { useState } from 'react';
import { useT } from '../i18n';
import { useAnimated } from '../context/AnimatedContext';

export default function GoodToKnow() {
  const [openIdx, setOpenIdx] = useState(null);
  const t = useT();
  const { dressCodeItems, giftsContent, photographyContent, goodToKnowItems } = useAnimated();

  const ITEMS = [
    {
      title: t.dressCode,
      content: (
        <>
          {(dressCodeItems || []).map((d, i) => (
            <p key={i}><strong>{d.label}</strong> {d.text}</p>
          ))}
        </>
      ),
    },
    {
      title: t.gifts,
      content: <p>{giftsContent}</p>,
    },
    {
      title: t.photography,
      content: <p>{photographyContent}</p>,
    },
    ...(goodToKnowItems || []).map((item) => ({
      title: item.title,
      content: <p>{item.content}</p>,
    })),
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
        <div className="acc">{ITEMS.slice(0, 2).map(renderItem)}</div>
        <div className="acc">{ITEMS.slice(2).map((item, i) => renderItem(item, i + 2))}</div>
      </div>
    </section>
  );
}
