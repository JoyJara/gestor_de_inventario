const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para parsear datos de formularios (ya incluido en express)
app.use(express.urlencoded({ extended: false }));

// Servir archivos estáticos (como css, js, html, etc.)
app.use(express.static(__dirname));

// Datos de la conexión a la base mysql, si lo quieren pobrar pongan credenciales.
const connection = mysql.createConnection({
  host: '100.106.98.2', // Aquí pongan la ip que le aparece en tailscale.
  user: 'JoyJara',
  password: 'tu_contraseña',
  database: 'inventario'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base MySQL');
});

// Ruta para mostrar el login (la url principal)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Ruta para procesar login
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  const query = 'SELECT * FROM empleados WHERE usuario = ? AND contrasena = ?';
  connection.query(query, [usuario, password], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).send('Error del servidor');
    }

    if (results.length > 0) {
      res.redirect('/paginas/inicio.html');
    } else {
      res.send('Usuario o contraseña incorrectos');
    }
  });
});

// Iniciar servidor.
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
