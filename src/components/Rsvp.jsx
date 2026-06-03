export default function Rsvp() {
  const waUrl = "https://wa.me/NUMERO?text=Hola!%20Confirmo%20mi%20asistencia%20a%20la%20boda%20de%20Braydon%20y%20Reli";

  return (
    <section className="rsvp">
      <div className="rv">
        <h3>Confirmación de asistencia</h3>
        <div className="big pf">¿Nos acompañas?</div>
        <p>Por favor, confirma tu asistencia lo antes posible para reservar tu espacio y finalizar los detalles de la celebración.</p>
        <a className="wa" href={waUrl} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.5-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"/>
            <path fill="currentColor" d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .9.9-2.9-.2-.3A8 8 0 1112 20z"/>
          </svg>
          Confirmar por WhatsApp
        </a>
      </div>
    </section>
  );
}
