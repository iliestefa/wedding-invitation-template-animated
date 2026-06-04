import { useState } from 'react';

const ITEMS = [
  {
    title: 'Vestimenta',
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

export default function GoodToKnow() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="gtk" data-stagger="true">
      <div className="gtk-head rv">
        <h2 className="pf">Información</h2>
      </div>
      <div className="acc">
        {ITEMS.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className={`acc-item${isOpen ? ' open' : ''}`}>
              <button
                className="acc-btn"
                onClick={() => setOpenIdx(isOpen ? null : i)}
              >
                {item.title}
                <svg
                  className="ico chev"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div
                className="acc-body"
                style={{ maxHeight: isOpen ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1)' }}
              >
                <div className="inner">{item.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
