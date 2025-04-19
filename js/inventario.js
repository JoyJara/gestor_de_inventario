fetch('/api/inventario')
.then(function(response) {
  return response.json();
})
.then(function(data) {
  var tbody = document.getElementById('tabla-inventario');
  tbody.innerHTML = ''; // Limpiar contenido anterior

  data.forEach(function(item, index) {
    var row = '<tr>' +
      '<td>' + (item.idProducto) + '</td>' +
      '<td>' + item.Producto + '</td>' +
      '<td>' + (item.Categoria) + '</td>' +
      '<td>' + item.Stock + '</td>' +
      '<td>$' + (item.Precio) + '</td>' +
      '<td>' +
        '<button class="btn btn-sm btn-warning">Editar</button> ' +
        '<button class="btn btn-sm btn-danger">Eliminar</button>' +
      '</td>' +
    '</tr>';

    tbody.innerHTML += row;
  });
})
.catch(function(error) {
  console.error('Error al obtener el inventario:', error);
});