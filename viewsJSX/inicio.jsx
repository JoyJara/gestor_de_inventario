<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Panel de Inicio</title>
  {/* bootstrap */}
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
  {/* css */}
  <link rel="stylesheet" href="/css/style.css" />
  {/* esto es pa q el footer siempre este hasta abajo de la página */}
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
        {/*este botón del navbar solo se muestra cuando el tamaño de la página es muy pequeño */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu_navegacion"
          aria-controls="menu_navegacion"
          aria-expanded="false"
          aria-label="menú de navegación"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="menu_navegacion">
          {/* indíca un menu colapsable*/}
          {/* lista del menú y su contenido */}
          <ul className="navbar-nav ms-auto">
            {/* mueve el menú hacia la derecha */}
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/views/inicio.html"
              >
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/views/usuarios.html">
                Usuarios
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/views/contacto.html">
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
    {/* grid (filas y columnas) que contiene las categorías (cards) del panel de inicio */}
    <div className="container mt-5">
      <h1 className="mb-4">Panel de Inicio</h1>
      <div className="row">
        {/* es una sola fila */}
        <div className="col-md-4">
          {/* columan 1 */}
          <div className="card text-center mb-3">
            <div className="card-body">
              <h5 className="card-title">Ventas</h5>
              <p className="card-text">
                Accede al punto de venta y realiza transacciones.
              </p>
              <a href="/views/ventas.html" className="btn btn-outline-success">
                Ir a Ventas
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          {/* columan 2 */}
          <div className="card text-center mb-3">
            <div className="card-body">
              <h5 className="card-title">Inventario</h5>
              <p className="card-text">
                Consulta y gestiona el stock de productos.
              </p>
              <a
                href="/views/inventario.html"
                className="btn btn-outline-success"
              >
                Ir a Inventario
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          {/* columan 3 */}
          <div className="card text-center mb-3">
            <div className="card-body">
              <h5 className="card-title">Reportes</h5>
              <p className="card-text">
                Visualiza y crea informes de ventas y actividad.
              </p>
              <a
                href="/views/reportes.html"
                className="btn btn-outline-success"
              >
                Ver Reportes
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  {/* footer */}
  <footer className="custom-green text-white text-center py-3">
    <div className="container">
      <p>© 2025 Gestor de Inventario. Todos los derechos reservados.</p>
    </div>
  </footer>
  {/* bootstrap bundle, incluye todos los plugins de js */}
</>
