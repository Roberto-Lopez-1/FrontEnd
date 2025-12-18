import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer className="footer-gamer mt-5 py-5">
        <div className="container">
          <div className="row text-white">
            <div className="col-12 col-md-4 mb-4 mb-md-0">
              <h4 className="footer-title">Ayuda</h4>
              <ul className="list-unstyled">
                <li>
                  <a
                    href="https://wa.me/56912345678?text=Hola,%20necesito%20ayuda%20con%20el%20servicio%20técnico%20de%20Level-Up%20Gamer"
                    target="_blank"
                    className="centro-ayuda-enlace"
                  >
                    Centro de ayuda
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-12 col-md-4 mb-4 mb-md-0">
              <h4 className="footer-title">Nosotros</h4>
              <ul className="list-unstyled">
                <li>
                  <Link to="/nosotros" className="footer-link">
                    Quiénes somos
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-12 col-md-4">
              <h4 className="footer-title">Comunidad Level-UP</h4>
              <ul className="list-unstyled">
                <li>
                  <Link to="/comunidad" className="footer-link">
                    Comunidad
                  </Link>
                </li>
                <li>
                  <Link to="/comunidad" className="footer-link">
                    Redes Sociales
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
