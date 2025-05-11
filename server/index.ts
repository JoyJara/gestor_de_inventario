import express from 'express';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import fs from 'fs';

import authRoutes from './routes/authRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import posRoutes from './routes/posRoutes';

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://TU_IP_PUBLICA:5173',
    'http://TU_DOMINIO.com'
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/pos', posRoutes);

// 📁 Solo sirve React si está en modo producción y existe el archivo index.html
const distPath = path.join(__dirname, 'dist');
const indexHtmlPath = path.join(distPath, 'index.html');

if (process.env.NODE_ENV === 'production' && fs.existsSync(indexHtmlPath)) {
  app.use(express.static(distPath));

  app.get('/*', (req, res) => {
    res.sendFile(indexHtmlPath);
  });
} else {
  console.log('🛠️ Modo desarrollo - React no se está sirviendo desde Express.');
}

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
