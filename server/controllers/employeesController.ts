import { Request, Response, NextFunction } from "express";
import { InventoryDB } from "../db/connection";

// Controlador para obtener la vista de los empleados.
export const GetEmployees = (req: Request, res: Response) => {
  InventoryDB.query(`SELECT * FROM employeesView`, (err, results) => {
    if (err) {
      return res.status(500).send("Error en el servidor.");
    }
    res.json(results);
  });
};