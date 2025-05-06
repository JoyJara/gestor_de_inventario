//import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components/HTML";

const Reports: React.FC = () => {
  // html de la página.
  return (
    <div className="d-flex flex-column min-vh-100">
      <header><Navbar /></header>

      <main className="content">
    <div className="container mt-5">
      <h1 className="mb-4">Reportes</h1>
      <p>Genera y consulta reportes de ventas e inventario.</p>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Reporte de Ventas</h5>
              <p className="card-text">Ventas diarias, semanales o mensuales.</p>
              <a href="#" className="btn btn-outline-success">Generar</a>
              <a href="#" className="btn btn-outline-success">Visualizar</a>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Reporte de Inventario</h5>
              <p className="card-text">Estado del stock de tus productos.</p>
              <a href="#" className="btn btn-outline-success">Generar</a>
              <a href="#" className="btn btn-outline-success">Visualizar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
      <Footer />
    </div>
  );
};

export default Reports;
