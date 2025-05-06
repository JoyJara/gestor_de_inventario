//import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components/HTML";

const Users: React.FC = () => {
  // html de la página.
  return (
    <div className="d-flex flex-column min-vh-100">
      <header><Navbar /></header>

      <main className="content">
    <div className="container mt-5">
      <h1 className="mb-4">Gestión de Usuarios</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Joel Morales</td>
            <td>joel_morales@anahuac.mx</td>
            <td>Empleado</td>
            <td>
              <button className="btn btn-sm btn-warning">Editar</button>
              <button className="btn btn-sm btn-danger">Eliminar</button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Iván Chan</td>
            <td>ivan.chan@anahuac.mx</td>
            <td>Empleado</td>
            <td>
              <button className="btn btn-sm btn-warning">Editar</button>
              <button className="btn btn-sm btn-danger">Eliminar</button>
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>Andrés Chávez</td>
            <td>achavez29@anahuac.mx</td>
            <td>Gerente</td>
            <td>
              <button className="btn btn-sm btn-warning">Editar</button>
              <button className="btn btn-sm btn-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <button className="btn custom-green-btn">Crear usuario</button>
    </div>
  </main>

      <Footer />
    </div>
  );
};

export default Users;
