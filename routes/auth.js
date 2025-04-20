const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');

// Procesar login
router.post('/login', login);

// Cerrar sesión
router.get('/logout', logout);

module.exports = router;
