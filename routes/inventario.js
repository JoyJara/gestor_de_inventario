const express = require('express');
const router = express.Router();
const { getInventory, editProduct, deleteProduct, getCategories, addProduct } = require('../controllers/inventarioController');

// Ruta GET para obtener todo el inventario
router.get('/api/inventario', getInventory);

// Ruta GET para obtener las categorias (ID y nombre).
router.get('/api/categories', getCategories)

// Ruta PUT para editar un producto
router.put('/api/inventario/:id', editProduct);

// Ruta DELETE para eliminar un producto
router.delete('/api/inventario/:id', deleteProduct);

// Ruta POST para agregar un nuevo producto
router.post('/api/inventory', addProduct)

module.exports = router;