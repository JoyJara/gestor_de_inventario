const express = require('express');
const path = require('path');
const session = require('express-session');
const { verificarSesion } = require('./middlewares/auth');

// Routes
const inventarioRoutes = require('./routes/inventario')
const categoriasRoutes = require('./routes/categorias');
const authRoutes = require('./routes/auth');

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
app.use(authRoutes);

// Ruta para mostrar el login (la url principal)
app.get('/', (req, res) => {
  if (req.session.username) {
    // Si ya inició sesión, redirigir al panel
    res.redirect('/views/inicio.html');
  } else {
    // Si no ha iniciado sesión, mostrar login
    res.sendFile(path.join(__dirname, '/public/login.html'));
  }
});

// Iniciar el servidor.
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});