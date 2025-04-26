let products = [];
let categoriesMap = {};

function loadCategoriesInto(selectID) {
    return fetch('/api/categories/')
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById(selectID);
            if (!select) {
                throw new Error(`Elemento <select> con ID "${selectID}" no encontrado`);
            }

            select.innerHTML = '<option value="">Selecciona una categoría</option>';
            data.forEach(category => {
                categoriesMap[category.categoryID] = category.name;
                const option = document.createElement('option');
                option.value = category.categoryID;
                option.textContent = category.name;
                select.appendChild(option);

                if (categoriesMap) {
                    categoriesMap[category.categoryID] = category.name;
                }
            });
        })
        .catch(err => {
            console.error(`Error al cargar las categorías en "${selectID}": `, err)
        })
}

// Cargar inventario y configurar eventos
function loadInventory() {
    fetch('/api/inventario')
        .then(res => res.json())
        .then(data => {
            products = data;
            console.log(data);
            const tbody = document.getElementById('inventoryTable');

            data.forEach((item, index) => {
                const productRow = document.createElement('tr'); // tr = table row
                productRow.innerHTML = `
                <td>${item.ID}</td>
                <td>${item.Name}</td>
                <td>${item.Category}</td>
                <td>${item.Stock}</td>
                <td>$${item.Price}</td>
                <td>
                    <button class="btn btn-sm btn-warning editButton" productIndex="${index}" data-bs-toggle="modal" data-bs-target="#modalEditar">Editar</button>
                    <button class="btn btn-sm btn-danger deleteButton" productIndex="${index}">Eliminar</button>
                </td>
                `;
                tbody.appendChild(productRow);
            });

            // Evento al dar clic en botón editar
            document.querySelectorAll('.editButton').forEach(btn => {
                btn.addEventListener('click', function () {
                    const index = this.getAttribute('productIndex');
                    const product = products[index];

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
                    const index = this.getAttribute('productIndex');
                    const product = products[index];
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

// Ejecutar todo cuando cargue el DOM
document.addEventListener('DOMContentLoaded', function () {
    //loadCategories().then(() => { loadInventory(); });
    loadInventory();
    loadCategoriesInto('editCategory');

    document.getElementById('addProduct').addEventListener('click', () => {
        loadCategoriesInto('newCategory');
    })
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

// Enviar cambios al backend al hacer submit del formulario newProduct.
document.getElementById('newProduct').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('newName').value;
    const barcode = document.getElementById('newBarcode').value;

    const select = document.getElementById('newCategory');
    const category = select.options[select.selectedIndex].text;

    const description = document.getElementById('newDescription').value;
    const stock = document.getElementById('newStock').value;
    const price = document.getElementById('newPrice').value;

    fetch(`/api/inventory`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            name: name,
            barcode: barcode,
            category: category,
            description: description,
            stock: stock,
            price: price
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Producto agregado exitosamente');
                location.reload();
            } else {
                alert('Error al agregar: ' + (data.error || 'Error desconocido'));
            }
        })
        .catch(err => {
            console.error('Error al agregar el producto:', err);
            alert('Ocurrió un error en el servidor');
        });
});