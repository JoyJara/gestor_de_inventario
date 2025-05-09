import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Footer, Navbar } from "../components/HTML";
import { useAuth } from "../hooks/useAuth";

const Dashboard: React.FC = () => {
  const isLoggedIn = useAuth();

  if (isLoggedIn === null) return <p>Cargando...</p>; // espera la verificación
  if (!isLoggedIn) return <Navigate to="/" />;   // redirige al login si no hay sesión

  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>

      <main className="container mt-5 flex-grow-1">
        <h1 className="mb-4">Panel de Inicio</h1>
        <div className="row">
          {/* Tarjetas de navegación */}
          <div className="col-md-4">
            <div className="card text-center mb-3">
              <div className="card-body">
                <h5 className="card-title">Ventas</h5>
                <p className="card-text">
                  Accede al punto de venta y realiza transacciones.
                </p>
                <Link to="/pos" className="btn btn-outline-success">
                  Ir a Ventas
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center mb-3">
              <div className="card-body">
                <h5 className="card-title">Inventario</h5>
                <p className="card-text">
                  Consulta y gestiona el stock de productos.
                </p>
                <Link to="/inventory" className="btn btn-outline-success">
                  Ir a Inventario
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center mb-3">
              <div className="card-body">
                <h5 className="card-title">Reportes</h5>
                <p className="card-text">
                  Visualiza y crea informes de ventas y actividad.
                </p>
                <Link to="/Reports" className="btn btn-outline-success">
                  Ir a Reportes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
