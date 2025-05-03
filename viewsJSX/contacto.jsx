<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Contacto</title>
  {/* bootstrap css */}
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
  {/* css */}
  <link rel="stylesheet" href="/css/style.css" />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n    html,\n    body {\n      height: 100%;\n    }\n\n    body {\n      display: flex;\n      flex-direction: column;\n      margin: 0;\n    }\n\n    .content {\n      flex: 1;\n    }\n  "
    }}
  />
  {/* barra de navegación */}
  <header>
    <nav className="navbar navbar-expand-lg navbar-dark custom-green">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Gestor de Inventario
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavContacto"
          aria-controls="navbarNavContacto"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavContacto">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/views/inicio.html">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/views/usuarios.html">
                Usuarios
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/views/contacto.html"
              >
                Contacto
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/logout">
                Cerrar Sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  {/* contenido de la página */}
  <main className="content">
    <div className="container mt-5">
      <h1 className="mb-4">Contáctanos</h1>
      <p>Gracias por elegir nuestro servicio para manejar su tienda.</p>
      <p>
        En caso de tener dudas o aclaraciones llene el siguiente formulario y
        envíenos un mensaje.
      </p>
      <form id="form-contacto">
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input type="text" className="form-control" id="nombre" required="" />
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="correo"
            required=""
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label">
            Mensaje
          </label>
          <textarea
            className="form-control"
            id="mensaje"
            rows={4}
            required=""
            defaultValue={""}
          />
        </div>
        <button type="submit" className="btn custom-green-btn">
          Enviar
        </button>
      </form>
    </div>
  </main>
  {/* footer */}
  <footer className="custom-green text-white text-center py-3 mt-5">
    <div className="container">
      <p>© 2025 Gestor de Inventario. Todos los derechos reservados.</p>
    </div>
  </footer>
  {/* Bootstrap */}
  {/* Script que simula el envio. */}
</>
