import { Request, Response, NextFunction } from "express";
import { InventoryDB } from "../db/connection";

// Controlador para obtener los productos (productID, name).
export const GetProducts = (req: Request, res: Response) => {
    InventoryDB.query(
      `SELECT barcode AS id, name, price FROM products ORDER BY name`,
      (err, results) => {
        if (err) {
          //return next(err);
        }
        res.json(results);
      }
    );
  };