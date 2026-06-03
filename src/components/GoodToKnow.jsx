import { useState } from 'react';

const ITEMS = [
  {
    title: 'Vestimenta',
    open: true,
    content: (
      <>
        <p><strong>Mujeres:</strong> evitar vestidos blancos, beige o tonos similares al blanco. Tampoco negro.</p>
        <p><strong>Hombres:</strong> sin blazers o sacos blancos o beige (la camisa blanca sí está permitida).</p>
        <p><strong>Todos:</strong> evitar prendas estampadas.</p>
      </>
    ),
  },
  {
    title: 'Estacionamiento',
    content: <p>Parqueo disponible en nuestro jardín (29750 Farkas Lane, Albany, LA).</p>,
  },
  {
    title: 'Niños',
    content: <p>Si durante la ceremonia un niño se inquieta o llora, agradecemos acompañarlo momentáneamente fuera del área principal.</p>,
  },
  {
    title: 'Regalos',
    content: (
      <>
        <p>Su presencia es nuestro mejor regalo. Si desean tener un detalle con nosotros, pueden utilizar la siguiente opción:</p>
        <div className="qr">Código QR<br />aquí</div>
      </>
    ),
  },
  {
    title: 'Llegada',
    content: <p>Te esperamos a partir de las 5:00 PM. Por favor, no llegar antes de esa hora.</p>,
  },
  {
    title: 'Fotografía',
    content: <p>Nos encantará que tomen fotos. Si las comparten en redes sociales, les pedimos elegir imágenes favorecedoras para todos.</p>,
  },
];

function AccItem({ title, content, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false);

  return (
    <div className={`acc-item rv${open ? ' open' : ''}`}>
      <button className="acc-btn" onClick={() => setOpen(o => !o)}>
        {title}
        <svg className="ico chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div className="acc-body" style={{ maxHeight: open ? '400px' : '0' }}>
        <div className="inner">{content}</div>
      </div>
    </div>
  );
}

export default function GoodToKnow() {
  return (
    <section className="gtk" data-stagger="true">
      <div className="gtk-head rv">
        <h2 className="pf">Información útil</h2>
      </div>
      <div className="acc">
        {ITEMS.map((item, i) => (
          <AccItem key={i} title={item.title} content={item.content} defaultOpen={item.open} />
        ))}
      </div>
    </section>
  );
}
