const connection = require('../models/db');

exports.actualizarProducto = (req, res) => {
    const idProducto = req.params.id;
    const { Producto, Categoria, Stock, Precio } = req.body;

    if (!Producto || !Categoria || !Stock || !Precio) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const queryProductos = `
      UPDATE productos 
      SET nombre = ?, IDcategoria = ?, precio = ? 
      WHERE IDproducto = ?
  `;

    connection.query(queryProductos, [Producto, Categoria, Precio, idProducto], (err, resultProductos) => {
        if (err) {
            console.error('Error al actualizar productos:', err);
            return res.status(500).json({ error: 'Error al actualizar en productos' });
        }

        const queryInventario = `
        UPDATE inventario 
        SET stock = ? 
        WHERE IDproducto = ?
    `;

        connection.query(queryInventario, [Stock, idProducto], (err, resultInventario) => {
            if (err) {
                console.error('Error al actualizar inventario:', err);
                return res.status(500).json({ error: 'Error al actualizar en inventario' });
            }

            return res.json({
                success: true,
                message: 'Producto actualizado correctamente',
                resultProductos,
                resultInventario
            });
        });
    });
};

exports.obtenerInventario = (req, res) => {
    connection.query('SELECT * FROM stocktotal', (err, results) => {
        if (err) return res.status(500).send('Error en el servidor');
        res.json(results);
    });
};