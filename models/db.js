const mysql = require('mysql2');

// Datos de la conexión a la base mysql, si lo quieren pobrar pongan sus credenciales.
const connection = mysql.createConnection({
  host: '100.106.98.2', // Aquí pongan la ip que les aparece en tailscale.
  user: 'JoyJara',
  password: 'tu_contraseña',
  database: 'inventario'
});

module.exports = connection;
