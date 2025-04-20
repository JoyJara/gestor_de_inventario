const express = require('express');
const router = express.Router();
const connection = require('../models/db');

// Ruta para obtener todas las categorías
router.get('/api/categorias', (req, res) => {
  connection.query('SELECT IDcategoria, nombre FROM categorias', (err, results) => {
    if (err) {
      console.error('Error al obtener las categorías:', err);
      return res.status(500).json({ error: 'Error al obtener categorías' });
    }
    res.json(results);
  });
});

module.exports = router;