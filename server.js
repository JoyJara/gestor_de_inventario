const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { verificarSesion } = require('./middlewares/auth');
const connection = require('./models/db')

const inventarioRoutes = require('./routes/inventario')
const categoriasRoutes = require('./routes/categorias');


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


// Servir archivos estáticos dentro del folder public.
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para todas las páginas dentro de views/
app.use('/views', verificarSesion)
app.get('/views/:archivo', (req, res) => {
  const archivo = req.params.archivo;

  res.sendFile(path.join(__dirname, 'views', archivo));
});

app.use(categoriasRoutes)
app.use(inventarioRoutes);

// Ruta para mostrar el login (la url principal)
app.get('/', (req, res) => {
  if (req.session.usuario) {
    // Si ya inició sesión, redirigir al panel
    res.redirect('/views/inicio.html');
  } else {
    // Si no ha iniciado sesión, mostrar login
    res.sendFile(path.join(__dirname, '/public/login.html'));
  }
});

app.put('/api/inventario/:id', (req, res) => {
  const idProducto = req.params.id;
  const { Producto, Categoria, Stock, Precio } = req.body;

  // Validación básica
  if (!Producto || !Categoria || !Stock || !Precio) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  // 1. Actualizar la tabla productos
  const queryProductos = `
      UPDATE productos 
      SET nombre = ?, IDcategoria = ?, precio = ? 
      WHERE IDproducto = ?
    `;

  connection.query(queryProductos, [Producto, Categoria, Precio, idProducto], (err, resultProductos) => {
    if (err) {
      console.error('Error al actualizar productos:', err);
      return res.status(500).json({ error: 'Error al actualizar en productos' });
    }

    // 2. Actualizar la tabla inventario
    const queryInventario = `
        UPDATE inventario 
        SET stock = ? 
        WHERE IDproducto = ?
      `;

    connection.query(queryInventario, [Stock, idProducto], (err, resultInventario) => {
      if (err) {
        console.error('Error al actualizar inventario:', err);
        return res.status(500).json({ error: 'Error al actualizar en inventario' });
      }

      return res.json({
        success: true,
        message: 'Producto actualizado correctamente',
        resultProductos,
        resultInventario
      });
    });
  });
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
          res.redirect('/views/inicio.html');
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
      return res.redirect('/views/inicio');
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
