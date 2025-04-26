const connection = require('../models/db');

exports.deleteProduct = (req, res) => {
    const idProducto = req.params.id;
    const deleteProduct = `CALL inventario.deleteProduct(?)`

    connection.query(deleteProduct, [idProducto], (err, results) => {
        if (err) {
            //console.error('Error al eliminar el producto:', err.sqlMessage || err);
            console.log(idProducto);
            return res.status(500).json({ error: 'Error al eliminar el producto' });
        }

        return res.json({
            success: true,
            message: 'Producto eliminado correctamente',
            results,
        });
    });
};

exports.editProduct = (req, res) => {
    const productID = req.params.id;
    const editProduct = `CALL inventario.editProduct(?, ?, ?, ?, ?)`
    const { Producto, Categoria, Stock, Precio } = req.body;

    if (!Producto || !Categoria || !Stock || !Precio) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    connection.query(editProduct, [productID, Producto, Categoria, Precio, Stock], (err, results) => {
        if (err) {
            console.error('Error al actualizar productos:', err);
            return res.status(500).json({ error: 'Error al actualizar en productos' });
        }

        return res.json({
            success: true,
            message: 'Información del producto actualizada correctamente',
            results,
        });
    });
};

exports.getInventory = (req, res) => {
    connection.query('SELECT * FROM inventoryView', (err, results) => {
        if (err) return res.status(500).send('Error en el servidor');
        res.json(results);
    });
};

exports.getCategories = (req, res, next) => {
    connection.query('SELECT categoryID, name FROM categories ORDER BY name', (err, results) => {
        if (err) { return next(err); }
        res.json(results);
    });
};

exports.addProduct = (req, res) => {
    const query = `CALL addProduct(?, ?, ?, ?, ?, ?)`;
    const { name, barcode, category, description, stock, price } = req.body;
  
    connection.query(
      query,
      [name, barcode, category, description, stock, price],
      (err, results) => {
        if (err) {
          console.error('Error al agregar el producto:', err);
          return res
            .status(500)
            .json({ success: false, error: err.message });
        }
  
        // Opcional: si tu procedure devuelve algo útil, está en results[0]
        return res.json({
          success: true,
          message: 'Producto agregado correctamente',
          insertedId: results[0]?.insertId
        });
      }
    );
  };
  