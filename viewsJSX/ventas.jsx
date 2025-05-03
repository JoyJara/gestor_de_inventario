<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Ventas - Punto de Venta</title>
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
          aria-controls="men#menu_navegacion"
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
      <h1 className="mb-4">Punto de Venta</h1>
      {/* formulario del pos, solo esta de adorno */}
      <form>
        <div className="mb-3">
          <label htmlFor="producto" className="form-label">
            Producto
          </label>
          <input
            type="text"
            className="form-control"
            id="producto"
            placeholder="Nombre o ID del producto"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cantidad" className="form-label">
            Cantidad
          </label>
          <input
            type="number"
            className="form-control"
            id="cantidad"
            placeholder="Cantidad a vender"
          />
        </div>
        <button type="submit" className="btn custom-green-btn">
          Agregar al carrito
        </button>
      </form>
      {/* detallles del carrito */}
      <div className="row mt-4">
        <div className="col-12">
          <h3>Detalles del Carrito</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bacardí 980 ml</td>
                <td>2</td>
                <td>$269.00</td>
                <td>$538.00</td>
                <td>
                  <button className="btn btn-sm btn-danger">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="text-end">
            <h4>Monto Total: $538.00</h4>
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
