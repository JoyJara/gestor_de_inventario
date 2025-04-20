const bcrypt = require('bcrypt');
const connection = require('../models/db');

exports.login = (req, res) => {
    const { usuario, password } = req.body;

    const query = 'SELECT * FROM empleados WHERE usuario = ?';
    connection.query(query, [usuario], (err, results) => {
        if (err) return res.status(500).send('Error del servidor');

        if (results.length > 0) {
            const user = results[0];

            bcrypt.compare(password, user.contrasena, (err, match) => {
                if (match) {
                    req.session.usuario = usuario;
                    res.redirect('/views/inicio.html');
                } else {
                    res.send('Contraseña incorrecta');
                }
            });
        } else {
            res.send('Usuario no encontrado');
        }
    });
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/views/inicio');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
};
