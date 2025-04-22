const bcrypt = require('bcrypt');
const connection = require('../models/db');

exports.login = (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM employees WHERE username = ?';
    connection.query(query, [username], (err, results) => {
        if (err) return res.status(500).send('Error del servidor');

        if (results.length > 0) {
            const employee = results[0];

            bcrypt.compare(password, employee.password, (err, match) => {
                if (match) {
                    req.session.username = employee.username;
                    console.log(employee.username);
                    req.session.role = employee.role;
                    console.log(employee.role);
                    res.redirect('/views/inicio.html');
                } else {
                    res.send('Contraseña incorrecta');
                }
            });
        } else {
            res.send('Nombre de usuario no encontrado');
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
