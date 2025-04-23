let inventoryData = [];
let categoriesMap = {};

// Cargar las categorías al inicio
function loadCategories() {
    return fetch('/api/categorias')
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById('editCategory');
            select.innerHTML = '<option value="">Selecciona una categoría</option>';
            data.forEach(category => {
                categoriesMap[category.categoryID] = category.name;

                const option = document.createElement('option');
                option.value = category.categoryID;
                option.textContent = category.name;
                select.appendChild(option);
            });
        })
        .catch(err => console.error('Error al cargar categorías:', err));
}

// Cargar inventario y configurar eventos
function loadInventory() {
    fetch('/api/inventario')
        .then(res => res.json())
        .then(data => {
            inventoryData = data;
            const tbody = document.getElementById('inventoryTable');
            tbody.innerHTML = '';

            data.forEach((item, index) => {
                const row = document.createElement('tr'); // tr = table row
                row.innerHTML = `
          <td>${item.ID}</td>
          <td>${item.Name}</td>
          <td>${item.Category}</td>
          <td>${item.Stock}</td>
          <td>$${item.Price}</td>
          <td>
            <button class="btn btn-sm btn-warning editButton" dataIndex="${index}" data-bs-toggle="modal" data-bs-target="#modalEditar">Editar</button>

            <button class="btn btn-sm btn-danger deleteButton" dataIndex="${index}">Eliminar</button>
          </td>
        `;
                tbody.appendChild(row);
            });

            // Evento al dar clic en botón editar
            document.querySelectorAll('.editButton').forEach(btn => {
                btn.addEventListener('click', function () {
                    const index = this.getAttribute('dataIndex');
                    const product = inventoryData[index];

                    document.getElementById('editarID').value = product.ID;
                    document.getElementById('editarNombre').value = product.Name;
                    document.getElementById('editarStock').value = product.Stock;
                    document.getElementById('editarPrecio').value = product.Price;

                    // Buscar el ID de categoría a partir del nombre (ya que product.Categoria es el nombre)
                    const categoryName = product.Category;
                    const categoryID = Object.keys(categoriesMap).find(key => categoriesMap[key] === categoryName);
                    document.getElementById('editCategory').value = categoryID || '';
                });
            });

            document.querySelectorAll('.deleteButton').forEach(button => {
                button.addEventListener('click', function () {
                    const index = this.getAttribute('dataIndex');
                    const product = inventoryData[index];
                    const productID = product.ID;

                    fetch(`/api/inventario/${productID}`, {
                        method: 'DELETE',
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                alert('Producto eliminado exitosamente');
                                location.reload(); // Recarga la tabla o página
                            } else {
                                alert('Error al eliminar: ' + (data.error || 'Error desconocido'));
                            }
                        })
                        .catch(err => {
                            console.error('Error al eliminar:', err);
                            alert('Ocurrió un error al conectar con el servidor');
                        });
                });
            });
        })
        .catch(err => {
            console.error('Error al obtener el inventario:', err);
        });
}

function addProduct() {}

// Ejecutar todo cuando cargue el DOM
document.addEventListener('DOMContentLoaded', function () {
    loadCategories().then(() => {
        loadInventory();
    });
});

// Enviar cambios al backend al hacer submit del formulario
document.getElementById('editForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const productID = document.getElementById('editarID').value;
    const name = document.getElementById('editarNombre').value;
    const category = document.getElementById('editCategory').value;
    const stock = document.getElementById('editarStock').value;
    const price = document.getElementById('editarPrecio').value;

    fetch(`/api/inventario/${productID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            Producto: name,
            Categoria: category,
            Stock: stock,
            Precio: price
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