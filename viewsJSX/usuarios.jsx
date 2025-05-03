<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Gestión de Usuarios</title>
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
                className="nav-link"
                aria-current="page"
                href="/views/inicio.html"
              >
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/views/usuarios.html">
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
      <h1 className="mb-4">Gestión de Usuarios</h1>
      {/* tabla donde se muestra los usuarios y su información */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Joel Morales</td>
            <td>joel_morales@anahuac.mx</td>
            <td>Empleado</td>
            <td>
              <button className="btn btn-sm btn-warning">Editar</button>
              <button className="btn btn-sm btn-danger">Eliminar</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Iván Chan</td>
            <td>ivan.chan@anahuac.mx</td>
            <td>Empleado</td>
            <td>
              <button className="btn btn-sm btn-warning">Editar</button>
              <button className="btn btn-sm btn-danger">Eliminar</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Andrés Chávez</td>
            <td>achavez29@anahuac.mx</td>
            <td>Gerente</td>
            <td>
              <button className="btn btn-sm btn-warning">Editar</button>
              <button className="btn btn-sm btn-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn custom-green-btn">Crear usuario</button>
    </div>
  </main>
  {/* footer */}
  <footer className="custom-green text-white text-center py-3">
    <div className="container">
      <p>© 2025 Gestor de Inventario. Todos los derechos reservados.</p>
    </div>
  </footer>
  {/* bundle bootstrap */}
</>
