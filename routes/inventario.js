const express = require('express');
const router = express.Router();
const { getInventory, editProduct, deleteProduct } = require('../controllers/inventarioController');

// Ruta GET para obtener todo el inventario
router.get('/api/inventario', getInventory);

// Ruta PUT para editar un producto
router.put('/api/inventario/:id', editProduct);

// Ruta DELETE para eliminar un producto
router.delete('/api/inventario/:id', deleteProduct);

module.exports = router;