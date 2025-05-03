<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Reportes - Punto de Venta</title>
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
        "\n    html,\n    body {\n      height: 100%;\n    }\n\n    body {\n      display: flex;\n      flex-direction: column;\n      margin: 0;\n    }\n\n    .content {\n      flex: 1;\n    }\n\n    footer {\n      margin-top: 20px;\n    }\n  "
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
          data-bs-target="#menu_navegacion"
          aria-controls="menu_navegacion"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="menu_navegacion">
          <ul className="navbar-nav ms-auto">
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
    <div className="container mt-5">
      <h1 className="mb-4">Reportes</h1>
      <p>Genera y consulta reportes de ventas e inventario.</p>
      {/* estos son ejemplos random, todavía no esta implementado xd */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Reporte de Ventas</h5>
              <p className="card-text">
                Ventas diarias, semanales o mensuales.
              </p>
              <a href="#" className="btn btn-outline-success">
                Generar
              </a>
              <a href="#" className="btn btn-outline-success">
                Visualizar
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Reporte de Inventario</h5>
              <p className="card-text">Estado del stock de tus productos.</p>
              <a href="#" className="btn btn-outline-success">
                Generar
              </a>
              <a href="#" className="btn btn-outline-success">
                Visualizar
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
  {/* bootstrap bundle */}
</>
