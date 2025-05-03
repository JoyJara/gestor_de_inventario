<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Inventario - Punto de Venta</title>
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
        "\n    html,\n    body {\n      height: 100%;\n    }\n\n    body {\n      display: flex;\n      flex-direction: column;\n      margin: 0;\n    }\n\n    .content {\n      flex: 1;\n      /* Espacio mínimo hasta el footer */\n      padding-bottom: 60px;\n    }\n  "
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
    {/* Se añadió mb-5 para margen inferior extra */}
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">Inventario</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="inventoryTable"></tbody>
      </table>
      <button
        id="addProduct"
        type="button"
        className="btn custom-green-btn mb-4"
        data-bs-toggle="modal"
        data-bs-target="#newProduct"
      >
        Agregar Producto
      </button>
    </div>
  </main>
  {/* Modal de edición */}
  <div
    className="modal fade"
    id="modalEditar"
    tabIndex={-1}
    aria-labelledby="modalEditarLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <form id="editForm" className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="modalEditarLabel">
            Editar Producto
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Cerrar"
          />
        </div>
        <div className="modal-body">
          <input type="hidden" id="editarID" />
          <div className="mb-3">
            <label htmlFor="editarNombre" className="form-label">
              Nombre del producto
            </label>
            <input
              type="text"
              className="form-control"
              id="editarNombre"
              required=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="editCategory" className="form-label">
              Categoría
            </label>
            <select className="form-select" id="editCategory" required="">
              <option value="">Selecciona una categoría</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="editarStock" className="form-label">
              Stock
            </label>
            <input
              type="number"
              className="form-control"
              id="editarStock"
              required=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="editarPrecio" className="form-label">
              Precio
            </label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="editarPrecio"
              required=""
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  </div>
  {/* Modal de nuevo producto */}
  <div
    className="modal fade"
    id="newProduct"
    tabIndex={-1}
    aria-labelledby="addModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <form id="addForm" className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="addModalLabel">
            Agregar Nuevo Producto
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Cerrar"
          />
        </div>
        <div className="modal-body">
          <input type="hidden" id="editarID" />
          <div className="mb-3">
            <label htmlFor="newName" className="form-label">
              Nombre del producto
            </label>
            <input
              type="text"
              className="form-control"
              id="newName"
              required=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newBarcode" className="form-label">
              Código de Barras
            </label>
            <input
              type="text"
              className="form-control"
              id="newBarcode"
              required=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newCategory" className="form-label">
              Categoría
            </label>
            <select className="form-select" id="newCategory" required="">
              <option value="">Selecciona una categoría</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="newDescription" className="form-label">
              Descripción
            </label>
            <input
              type="text"
              className="form-control"
              id="newDescription"
              required=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newStock" className="form-label">
              Stock
            </label>
            <input
              type="number"
              className="form-control"
              id="newStock"
              required=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPrice" className="form-label">
              Precio
            </label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="newPrice"
              required=""
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </div>
      </form>
    </div>
  </div>
  {/* footer */}
  <footer className="custom-green text-white text-center py-3">
    <div className="container">
      <p>© 2025 Gestor de Inventario. Todos los derechos reservados.</p>
    </div>
  </footer>
  {/* bootstrap bundle */}
  {/* Script para mostrar vista "stocktotal" como salida en la web */}
</>