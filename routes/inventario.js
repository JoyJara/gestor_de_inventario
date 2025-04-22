const express = require('express');
const router = express.Router();
const { obtenerInventario, actualizarProducto, deleteProduct } = require('../controllers/inventarioController');

// Ruta GET para obtener todo el inventario
router.get('/api/inventario', obtenerInventario);

// Ruta PUT para actualizar un producto
router.put('/api/inventario/:id', actualizarProducto);

// Ruta DELETE para eliminar un producto
router.delete('/api/inventario/:id', deleteProduct);

module.exports = router;