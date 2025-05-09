import express from 'express';
import cors from 'cors';
import session from 'express-session';
import authRoutes from './routes/authRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import posRoutes from './routes/posRoutes';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', //
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de sesión
app.use(session({
  secret: 'profePonganos10',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  }
}));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/pos', posRoutes);

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
