import "../assets/Comunidad.css";

export const Comunidad = () => {
  return (
    <main className="container my-5">
      <section className="mb-5">
        <div className="text-light p-4 d-flex align-items-center justify-content-between">
          <div className="redes-sociales">
            <div>
              <h3
                className="fw-bold"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                ¡Redes Sociales!
              </h3>
              <p>
                Síguenos en nuestras redes sociales y mantente al día con los
                mejores productos, novedades exclusivas y las últimas noticias
                del mundo gamer.
              </p>
            </div>
            <div className="d-flex flex-column align-items-center">
              <span className="fw-bold mb-2 text-info">
                Comparte Nuestras Redes Sociales
              </span>

              <div className="d-flex gap-3 flex-wrap justify-content-center">
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https://levelupgamer.com/promo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark border-info p-2 rounded"
                  title="Compartir en Facebook"
                >
                  <i
                    className="fab fa-facebook-f fa-2x"
                    style={{ color: "#1877f3" }}
                  ></i>
                </a>

                <a
                  href="https://twitter.com/intent/tweet?url=https://levelupgamer.com/promo&text=Échale un vistazo a esta promo gamer!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark border-info p-2 rounded"
                  title="Compartir en X"
                >
                  <i
                    className="fab fa-x-twitter fa-2x"
                    style={{ color: "#fff" }}
                  ></i>
                </a>

                <a
                  href="https://instagram.com/levelupgamer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark border-info p-2 rounded"
                  title="Instagram"
                >
                  <i
                    className="fab fa-instagram fa-2x"
                    style={{ color: "#e4405f" }}
                  ></i>
                </a>

                <a
                  href="https://discord.com/invite/levelupgamer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark border-info p-2 rounded"
                  title="Unirse a Discord"
                >
                  <i
                    className="fab fa-discord fa-2x"
                    style={{ color: "#5865f2" }}
                  ></i>
                </a>

                <a
                  href="https://www.tiktok.com/@levelupgamerofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark border-info p-2 rounded"
                  title="TikTok"
                >
                  <i
                    className="fab fa-tiktok fa-2x"
                    style={{ color: "#fff" }}
                  ></i>
                </a>

                <a
                  href="https://twitch.tv/levelupgamer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark border-info p-2 rounded"
                  title="Twitch"
                >
                  <i
                    className="fab fa-twitch fa-2x"
                    style={{ color: "#9147ff" }}
                  ></i>
                </a>

                <a
                  href="https://youtube.com/@levelupgamer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark border-info p-2 rounded"
                  title="YouTube"
                >
                  <i
                    className="fab fa-youtube fa-2x"
                    style={{ color: "#ff0000" }}
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2
          className="text-info fw-bold"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Blogs & Noticias Gamer
        </h2>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div className="noticia-card">
            <div className="col">
              <div className="card-body">
                <h5 className="card-title">Meristation</h5>
                <p className="card-text">
                  Noticias, lanzamientos y reseñas actualizadas del mundo gamer.
                </p>
                <a
                  href="https://as.com/meristation/noticias/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-info btn-sm"
                >
                  Visitar
                </a>
              </div>
            </div>
          </div>
          <div className="noticia-card">
            <div className="col">
              <div className="card-body">
                <h5 className="card-title">Vandal</h5>
                <p className="card-text">
                  Análisis, guías y novedades sobre videojuegos y consolas.
                </p>
                <a
                  href="https://vandal.elespanol.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-info btn-sm"
                >
                  Visitar
                </a>
              </div>
            </div>
          </div>
          <div className="noticia-card">
            <div className="col">
              <div className="card-body">
                <h5 className="card-title">LevelUp News</h5>
                <p className="card-text">
                  Últimas noticias y lanzamientos globales.
                </p>
                <a
                  href="https://www.levelup.com/noticias/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-info btn-sm"
                >
                  Visitar
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2
          className="text-info fw-bold"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Consejos y Guías
        </h2>
        <div className="row">
          <div className="col-md-8">
            <ul className="list-group bg-dark">
              <li className="list-group-item bg-dark text-light border-info">
                <strong>Optimiza tu Hardware:</strong> Actualiza drivers y
                componentes regularmente para mayor rendimiento.
              </li>
              <li className="list-group-item bg-dark text-light border-info">
                <strong>Cuida tu salud:</strong> Realiza pausas activas durante
                tus sesiones.
              </li>
              <li className="list-group-item bg-dark text-light border-info">
                <strong>Participa en foros:</strong> Comparte estrategias y
                aprende de la comunidad gamer.
              </li>
              <li className="list-group-item bg-dark text-light border-info">
                <strong>Ajusta tus gráficos:</strong> Configura el juego acorde
                a tu equipo para evitar lag.
              </li>
            </ul>
          </div>
          <div className="col-md-4 d-flex align-items-center">
            {/* Restauramos la imagen original aquí. El mapa grande irá en el
                contenedor más abajo con id="map" (área de 400px). */}
            <img
              src="/img/jugaryaprender.png"
              alt="Consejos Gamer"
              className="img-fluid shadow rounded"
              width="400"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="bg-info text-dark p-4 rounded text-center">
          <h3
            className="fw-bold"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            ¿Quieres aportar?
          </h3>
          <p>
            Publica tus guías, trucos o noticias en nuestro foro y ayuda a la
            comunidad gamer a mejorar cada día.
          </p>
        </div>
      </section>

      <section className="container my-5">
        <h3
          className="text-info fw-bold mb-4"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Aportes de la Comunidad
        </h3>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div className="col">
            <div className="card h-100 bg-dark text-light border-info shadow">
              <div className="card-body">
                <h5 className="card-title">
                  AlexGamer
                  <span className="badge bg-info text-dark ms-2">Guía</span>
                </h5>
                <p className="card-text">
                  ¿Quieres mejorar en Rocket League? Empieza con práctica de
                  tiros a portería 15 minutos al día y verás resultados.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 bg-dark text-light border-info shadow">
              <div className="card-body">
                <h5 className="card-title">
                  MartaPro
                  <span className="badge bg-info text-dark ms-2">Truco</span>
                </h5>
                <p className="card-text">
                  En Battlefield ajusta el FOV para una mejor visibilidad y
                  reacción en mapas abiertos.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 bg-dark text-light border-info shadow">
              <div className="card-body">
                <h5 className="card-title">
                  LuigiNews
                  <span className="badge bg-info text-dark ms-2">Noticia</span>
                </h5>
                <p className="card-text">
                  ¡Nuevo evento de drops en Twitch para Delta Force este fin de
                  semana!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <h3
          className="text-info fw-bold mb-4"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Mapa de Eventos Gamer
        </h3>
        <p className="card-text">
          Participa en Eventos Gamer y obten puntos Level-UP
        </p>
        <div
          id="map"
          style={{
            height: "400px",
            borderRadius: "12px",
            border: "2px solid #39ff14",
            boxShadow: "0 0 16px #39ff14",
            overflow: 'hidden'
          }}
        >
          {/* Mapa embebido: iframe de Google Maps centrado en Santiago, Chile.
              Cambia el parámetro q= en la URL por la ciudad o coordenadas
              que prefieras. */}
          <iframe
            title="Mapa de Eventos Gamer"
            src="https://maps.google.com/maps?q=Santiago%20Chile&z=12&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <section className="container my-5">
        <div className="bg-dark text-info p-4 rounded shadow">
          <h3
            style={{ fontFamily: "Orbitron, sans-serif" }}
            className="fw-bold mb-3"
          >
            ¡Aporta a la Comunidad!
          </h3>
          <form>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre o Nick
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light border-info"
                id="nombre"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email (opcional)
              </label>
              <input
                type="email"
                className="form-control bg-dark text-light border-info"
                id="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tipo" className="form-label">
                Tipo de Aporte
              </label>
              <select
                className="form-select bg-dark text-light border-info"
                id="tipo"
                required
              >
                <option value="">Selecciona...</option>
                <option value="guia">Guía</option>
                <option value="truco">Truco</option>
                <option value="noticia">Noticia</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">
                Descripción
              </label>
              <textarea
                className="form-control bg-dark text-light border-info"
                id="mensaje"
                rows={4}
                required
                placeholder="Comparte tu aporte gamer aquí..."
              ></textarea>
            </div>
            <button type="submit" className="btn btn-info fw-bold px-4">
              Enviar
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};
