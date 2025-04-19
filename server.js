const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { verificarSesion } = require('./middlewares/auth');
const connection = require('./db')
const invetarioRoutes = require('./routes/inventario')


const app = express();
const PORT = 3000;

// Middleware para parsear datos de formularios (ya incluido en express)
app.use(express.urlencoded({ extended: false }));

// Configurar sesión
app.use(session({
    secret: 'secretoSuperSeguro',
    resave: false,
    saveUninitialized: false
  }));
  

// Servir archivos estáticos css y js
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Middleware para todas las páginas dentro de paginas/
app.use('/paginas', verificarSesion)
app.get('/paginas/:archivo', (req, res) => {
    const archivo = req.params.archivo;
  
    res.sendFile(path.join(__dirname, 'paginas', archivo));
  });

app.use(invetarioRoutes);

// Ruta para mostrar el login (la url principal)
app.get('/', (req, res) => {
    if (req.session.usuario) {
      // Si ya inició sesión, redirigir al panel
      res.redirect('/paginas/inicio.html');
    } else {
      // Si no ha iniciado sesión, mostrar login
      res.sendFile(path.join(__dirname, 'login.html'));
    }
  });
  
// Ruta para procesar login
app.post('/login', (req, res) => {
    const { usuario, password } = req.body;
  
    const query = 'SELECT * FROM empleados WHERE usuario = ?';
    connection.query(query, [usuario], (err, results) => {
      if (err) return res.status(500).send('Error del servidor');
  
      if (results.length > 0) {
        const user = results[0];
  
        // Comparar contraseña encriptada
        bcrypt.compare(password, user.contrasena, (err, match) => {
          if (match) {
            req.session.usuario = usuario; // Guardar sesión
            res.redirect('/paginas/inicio.html');
          } else {
            res.send('Contraseña incorrecta');
          }
        });
  
      } else {
        res.send('Usuario no encontrado');
      }
    });
  });

// Ruta para cerrar la sesión del usuario.
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.redirect('/paginas/inicio');
      }
      res.clearCookie('connect.sid'); // Limpia la cookie de sesión
      res.redirect('/'); // Redirige al login
    });
  });


// Conexión a la base de datos.
  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return;
    }
    console.log('Conectado a la base MySQL');
  });

// Iniciar el servidor.
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
