export const Nosotros = () => {
  return (
    <section className="container my-5 gamer-about-section">
      <h2 className="text-light mb-4">
        <i className="fa fa-users"></i> ¿Quiénes Somos?
      </h2>
      <div className="bg-dark text-white p-4 rounded shadow">
        <p>
          <strong>Level-Up Gamer</strong> es una tienda online dedicada a
          satisfacer las necesidades de los entusiastas de los videojuegos en
          Chile. Lanzada hace dos años como respuesta a la creciente demanda
          durante la pandemia, Level-Up Gamer ofrece una amplia gama de
          productos para gamers, desde consolas y accesorios hasta computadores
          y sillas especializadas. Aunque no cuenta con una ubicación física,
          realiza despachos a todo el país.
        </p>
        <h3>Misión</h3>
        <p>
          Proporcionar productos de alta calidad para gamers en todo Chile,
          ofreciendo una experiencia de compra única y personalizada, con un
          enfoque en la satisfacción del cliente y el crecimiento de la
          comunidad gamer.
        </p>
        <h3>Visión</h3>
        <p>
          Ser la tienda online líder en productos para gamers en Chile,
          reconocida por su innovación, servicio al cliente excepcional, y un
          programa de fidelización basado en gamificación que recompense a
          nuestros clientes más fieles.
        </p>
        <p>
          Creemos en la comunidad, en compartir logros y en subir de nivel
          juntos. Ya seas fan de{" "}
          <span className="text-success">PlayStation</span>,
          <span className="text-primary">Xbox</span>,
          <span className="text-info">PC</span> o
          <span className="text-danger">Nintendo</span>, tenemos un lugar para
          ti.
        </p>
        <div className="text-center mt-4">
          <img
            src="/img/nosotros.png"
            alt="Comunidad gamer"
            className="img-fluid rounded shadow"
            width="400"
          />
          <p className="mt-2 fst-italic">
            "Tu próxima aventura empieza en Level-Up Gamer"
          </p>
        </div>
      </div>
    </section>
  );
};
