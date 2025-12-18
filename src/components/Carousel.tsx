import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const HomeCarousel = () => {
  return (
    <Carousel className="mt-4">
      <Carousel.Item>
        <Link to="/comunidad">
          <img
            src="/img/comunidad.png"
            className="d-block mx-auto img-fluid"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
            alt="comunidad"
          />
        </Link>
      </Carousel.Item>

      <Carousel.Item>
        <Link to="/registrar">
          <img
            src="/img/descuento20.png"
            className="d-block mx-auto img-fluid"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
            alt="Descuento"
          />
        </Link>
      </Carousel.Item>
    </Carousel>
  );
};
