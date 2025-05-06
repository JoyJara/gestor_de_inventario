//import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components/HTML";

const Contact: React.FC = () => {
  // html de la página.
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>

      <main className="content">
        <div className="container mt-5">
          <h1 className="mb-4">Contáctanos</h1>
          <p>Gracias por elegir nuestro servicio para manejar su tienda.</p>
          <p>
            En caso de tener dudas o aclaraciones llene el siguiente formulario
            y envíenos un mensaje.
          </p>
          <form id="form-contacto">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="correo"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">
                Mensaje
              </label>
              <textarea
                className="form-control"
                id="mensaje"
                rows={4}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn custom-green-btn">
              Enviar
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
