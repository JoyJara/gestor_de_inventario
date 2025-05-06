import { Request, Response, NextFunction } from "express";
import { InventoryDB } from "../db/connection";

// Controlador para eliminar un producto por su ID.
export const DeleteProduct = (req: Request, res: Response) => {
  const ProductID = req.params.id;
  const DeleteProduct = `CALL inventario.deleteProduct(?)`;

  InventoryDB.query(DeleteProduct, [ProductID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al eliminar el producto" });
    }
    return res.json({
      success: true,
      message: "Producto eliminado correctamente.",
      results,
    });
  });
};

// Controlador para editar la información de un producto.
export const EditProduct = (req: Request, res: Response) => {
  const ProductID = req.params.id;
  const EditProduct = `CALL inventario.editProduct(?, ?, ?, ?, ?)`;
  const { Producto, Categoria, Precio, Stock } = req.body;

  if (!Producto || !Categoria || !Precio || !Stock) {
    //return res.status(400).json({error: 'Faltan campos.'});
  }

  InventoryDB.query(
    EditProduct,
    [ProductID, Producto, Categoria, Precio, Stock],
    (err, results) => {
      if (err) {
        console.error("Error al actualizar el producto:", err);
        return res.status(500).json({ error: "Error al actualizar." });
      }
      return res.json({
        success: true,
        message: "Información del producto actualizada correctamente",
        results,
      });
    }
  );
};

// Controlador para obtener la vista del inventario.
export const GetInventory = (req: Request, res: Response) => {
  InventoryDB.query(`SELECT * FROM inventoryView`, (err, results) => {
    if (err) {
      return res.status(500).send("Error en el servidor.");
    }
    res.json(results);
  });
};

// Controlador para obtener las categorias.
export const GetCategories = (req: Request, res: Response) => {
  InventoryDB.query(
    `SELECT categoryID AS id, name FROM categories ORDER BY name`,
    (err, results) => {
      if (err) {
        //return next(err);
      }
      res.json(results);
    }
  );
};

// Controlador para agregar un producto nuevo.
export const AddProduct = (req: Request, res: Response) => {
  const AddProduct = `CALL addProduct(?, ?, ?, ?, ?, ?)`;
  const { Producto, Categoria, Precio, Stock, CodigoBarras, Descripcion } =
    req.body;
  InventoryDB.query(
    AddProduct,
    [Producto, CodigoBarras, Categoria, Descripcion, Stock, Precio ],
    (err, results) => {
      if (err) {
        console.error("Error al agregar el nuevo producto.", err);
        return res.status(500).json({ success: false, error: err.message });
      }
      return res.json({
        success: true,
        message: "Se agrego el nuevo producto correctamente.",
        results,
      });
    }
  );
};
