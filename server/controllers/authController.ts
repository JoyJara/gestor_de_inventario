import { Request, Response } from 'express';
import { InventoryDB } from '../db/connection';
import bcrypt from 'bcrypt';

export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM employees WHERE username = ?';
  InventoryDB.query(query, [username], async (err, results: any[]) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const employee = results[0];

    const match = await bcrypt.compare(password, employee.password);
    if (!match) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    return res.status(200).json({ message: 'Inicio de sesión exitoso', userId: employee.id });
  });
};
