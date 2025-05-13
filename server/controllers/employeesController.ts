import { Request, Response, NextFunction } from "express";
import { InventoryDB } from "../db/connection";
import bcrypt from "bcrypt";

// Controlador para obtener la vista de los empleados.
export const GetEmployees = (req: Request, res: Response) => {
  InventoryDB.query(`SELECT * FROM employeesView`, (err, results) => {
    if (err) {
      return res.status(500).send("Error en el servidor.");
    }
    res.json(results);
  });
};

// Controlador para agregar un nuevo empleado
export const AddEmployee = async (req: Request, res: Response) => {
  try {
    const { name, phone, role, hiringDate, username, password, status } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `CALL inventario.addUser(?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      name,
      phone,
      parseInt(role),
      hiringDate,
      username,
      hashedPassword,
      parseInt(status),
    ];

    InventoryDB.query(sql, params, (err, results) => {
      if (err) {
        console.error("Error al agregar el empleado:", err);
        return res.status(500).json({ success: false, error: err.message });
      }
      res.json({ success: true, message: "Empleado agregado correctamente." });
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controlador para editar un empleado existente.
export const EditEmployee = (req: Request, res: Response) => {
  const { employeeID, name, phone, role, hiringDate, username, status } =
    req.body;

  if (
    !employeeID ||
    !name ||
    !phone ||
    role === undefined ||
    !hiringDate ||
    !username ||
    status === undefined
  ) {
    res.status(400).json({
      success: false,
      error: "Faltan campos requeridos para actualizar el empleado.",
    });
  }

  const sql = `CALL inventario.editUser(?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    employeeID,
    name,
    phone,
    parseInt(role),
    hiringDate,
    username,
    parseInt(status),
  ];

  InventoryDB.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error al editar el empleado:", err);
      return res.status(500).json({ success: false, error: err.message });
    }

    res.json({ success: true, message: "Empleado actualizado correctamente." });
  });
};

// Controlador para eliminar un empleado.
export const DeleteEmployee = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      success: false,
      error: "Falta el parámetro 'id' para eliminar el empleado.",
    });
  }

  const sql = `CALL inventario.deleteUser(?)`;

  InventoryDB.query(sql, [parseInt(id)], (err, results) => {
    if (err) {
      console.error("Error al eliminar el empleado:", err);
      return res.status(500).json({ success: false, error: err.message });
    }

    res.json({ success: true, message: "Empleado eliminado correctamente." });
  });
};
