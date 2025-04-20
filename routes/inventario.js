const express = require('express');
const router = express.Router();
const { obtenerInventario, actualizarProducto } = require('../controllers/inventarioController');

// Ruta GET para obtener todo el inventario
router.get('/api/inventario', obtenerInventario);

// Ruta PUT para actualizar un producto
router.put('/api/inventario/:id', actualizarProducto);

module.exports = router;