let inventarioData = [];
let categoriasMap = {};

// Cargar las categorías al inicio
function cargarCategoriasEnSelect() {
    return fetch('/api/categorias')
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById('editarCategoria');
            select.innerHTML = '<option value="">Selecciona una categoría</option>';
            data.forEach(cat => {
                categoriasMap[cat.IDcategoria] = cat.nombre;

                const option = document.createElement('option');
                option.value = cat.IDcategoria;
                option.textContent = cat.nombre;
                select.appendChild(option);
            });
        })
        .catch(err => console.error('Error al cargar categorías:', err));
}

// Cargar inventario y configurar eventos
function cargarInventario() {
    fetch('/api/inventario')
        .then(res => res.json())
        .then(data => {
            inventarioData = data;
            const tbody = document.getElementById('tabla-inventario');
            tbody.innerHTML = '';

            data.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
          <td>${item.idProducto}</td>
          <td>${item.Producto}</td>
          <td>${item.Categoria}</td>
          <td>${item.Stock}</td>
          <td>$${item.Precio}</td>
          <td>
            <button class="btn btn-sm btn-warning btn-editar" data-index="${index}" data-bs-toggle="modal" data-bs-target="#modalEditar">Editar</button>
            <button class="btn btn-sm btn-danger">Eliminar</button>
          </td>
        `;
                tbody.appendChild(row);
            });

            // Evento al dar clic en botón editar
            document.querySelectorAll('.btn-editar').forEach(btn => {
                btn.addEventListener('click', function () {
                    const index = this.getAttribute('data-index');
                    const producto = inventarioData[index];

                    document.getElementById('editarID').value = producto.idProducto;
                    document.getElementById('editarNombre').value = producto.Producto;
                    document.getElementById('editarStock').value = producto.Stock;
                    document.getElementById('editarPrecio').value = producto.Precio;

                    // Buscar el ID de categoría a partir del nombre (ya que producto.Categoria es el nombre)
                    const categoriaNombre = producto.Categoria;
                    const categoriaID = Object.keys(categoriasMap).find(
                        key => categoriasMap[key] === categoriaNombre
                    );
                    document.getElementById('editarCategoria').value = categoriaID || '';

                });
            });
        })
        .catch(err => {
            console.error('Error al obtener el inventario:', err);
        });
}

// Ejecutar todo cuando cargue el DOM
document.addEventListener('DOMContentLoaded', function () {
    cargarCategoriasEnSelect().then(() => {
        cargarInventario();
    });
});

// Enviar cambios al backend al hacer submit del formulario
document.getElementById('formEditar').addEventListener('submit', function (event) {
    event.preventDefault();

    const id = document.getElementById('editarID').value;
    const nombre = document.getElementById('editarNombre').value;
    const categoria = document.getElementById('editarCategoria').value;
    const stock = document.getElementById('editarStock').value;
    const precio = document.getElementById('editarPrecio').value;

    fetch(`/api/inventario/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            Producto: nombre,
            Categoria: categoria,
            Stock: stock,
            Precio: precio
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Producto actualizado exitosamente');
                location.reload();
            } else {
                alert('Error al actualizar: ' + (data.error || 'Error desconocido'));
            }
        })
        .catch(err => {
            console.error('Error al actualizar el producto:', err);
            alert('Ocurrió un error en el servidor');
        });
});
