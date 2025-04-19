const express = require('express');
const router = express.Router();
const connection = require('../db'); // conexión a la base

router.get('/api/inventario', (req, res) => {
  connection.query('SELECT * FROM stocktotal', (err, results) => {
    if (err) return res.status(500).send('Error en el servidor');
    res.json(results);
  });
});

module.exports = router;