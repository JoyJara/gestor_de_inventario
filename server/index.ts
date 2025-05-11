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
    'http://66.179.92.207:5173',
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

// Solo servir React si es producción y existe index.html
const distPath = path.resolve(__dirname, 'dist');
const indexHtmlPath = path.join(distPath, 'index.html');

if (process.env.NODE_ENV === 'production' && fs.existsSync(indexHtmlPath)) {
  app.use(express.static(distPath));

  // Middleware para servir index.html en rutas no-API
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }

    res.sendFile(indexHtmlPath, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
} else {
  console.log('🛠️ Modo desarrollo - React no se está sirviendo desde Express.');
}

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
