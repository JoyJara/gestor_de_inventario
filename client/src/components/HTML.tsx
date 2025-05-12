import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const API_URL = import.meta.env.VITE_API_URL;

export const Footer: React.FC = () => {
  return (
    <footer className="custom-green text-white text-center py-3 mt-auto">
      <div className="container">
        <p>&copy; 2025 Gestor de Inventario. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // 👈 acceso al usuario con su rol

  const handleLogout = async () => {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    navigate("/"); // login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-green">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Gestor de Inventario
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu_navegacion"
          aria-controls="menu_navegacion"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menu_navegacion">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">
                Inicio
              </a>
            </li>

            {/* 👇 Solo admins pueden ver este enlace */}
            {user?.role === "admin" && (
              <li className="nav-item">
                <a className="nav-link" href="/employees">
                  Usuarios
                </a>
              </li>
            )}

            <li className="nav-item">
              <a className="nav-link" href="/employees">
                Usuarios
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contacto
              </a>
            </li>

            <li className="nav-item">
              <button className="nav-link " onClick={handleLogout}>
                Cerrar Sesión: {user?.username}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
