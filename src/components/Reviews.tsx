export const Reviews = () => {
  return (
    <>
      <section id="resenas" className="container my-5 gamer-review-section">
        <h2 className="titulo-resenas text-center">Reseñas de Producto</h2>
        <div className="list-group">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">FelipeGamer21</span>
            <small className="text-warning">★★★★★</small>
          </div>
          <p className="mb-1">
            ¡El mouse Logitech G502 HERO es increíble! Precisión total en partidas
            de Battlefield, y la entrega fue ultra rápida. 100% recomendado.
          </p>
          <small className="text-muted">Publicado el 10/09/2025</small>
        </div>
        <div className="list-group-item">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">MariaDev</span>
            <small className="text-warning">★★★★☆</small>
          </div>
          <p className="mb-1">
            Compré la silla Secretlab Titan y mejoró mi comodidad jugando largas
            sesiones de GTA Online. Llegó ensamblada y lista. Excelente calidad.
          </p>
          <small className="text-muted">Publicado el 08/09/2025</small>
        </div>
        <div className="list-group-item">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">NicoCodes</span>
            <small className="text-warning">★★★★★</small>
          </div>
          <p className="mb-1">
            Atención al cliente muy rápida, resolvieron mi problema en minutos por
            WhatsApp. ¡El control Xbox llegó en perfecto estado!
          </p>
          <small className="text-muted">Publicado el 06/09/2025</small>
        </div>
        <div className="list-group-item">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">ClauStreamer</span>
            <small className="text-warning">★★★☆☆</small>
          </div>
          <p className="mb-1">
            La polera personalizada Level-Up está increíble y la impresión de alta
            calidad, pero demoró un par de días más de lo esperado.
          </p>
          <small className="text-muted">Publicado el 04/09/2025</small>
        </div>
        <div className="list-group-item">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">PipeDMC</span>
            <small className="text-warning">★★★★★</small>
          </div>
          <p className="mb-1">
            El PC Gamer ASUS ROG Strix rinde excelente hasta en juegos pesados, y
            el soporte me ayudó con la configuración inicial. ¡Gracias!
          </p>
          <small className="text-muted">Publicado el 02/09/2025</small>
        </div>
      </section>

      <section id="agregar-resena" className="container my-5 gamer-review-section">
        <h2 className="titulo-resenas text-center">¡Escribe tu Reseña!</h2>
        <form id="formResena" className="bg-dark p-4 rounded">
          <div className="mb-3">
            <label htmlFor="nombreUsuario" className="form-label">Tu nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombreUsuario"
              maxLength={20}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="comentario" className="form-label">Comentario</label>
            <textarea
              className="form-control"
              id="comentario"
              rows={2}
              maxLength={200}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Calificación</label>
            <div id="ratingStars" className="fs-3" style={{ color: 'gold' }}>
              <i className="fa-regular fa-star" data-rating="1"></i>
              <i className="fa-regular fa-star" data-rating="2"></i>
              <i className="fa-regular fa-star" data-rating="3"></i>
              <i className="fa-regular fa-star" data-rating="4"></i>
              <i className="fa-regular fa-star" data-rating="5"></i>
            </div>
            <input type="hidden" id="puntaje" required />
          </div>
          <button type="submit" className="btn-gamer-neon btn-gamer-resena">
            Publicar reseña
          </button>
        </form>
      </section>
    </>
  );
};