import React, { useEffect, useState } from "react";
import EmployeesTable from "../components/EmployeesTable";
import { Footer, Navbar } from "../components/HTML";

interface Employee {
  ID: number;
  Name: string;
  Role: number;
  Phone: string;
  User: string;
  Status: number;
  Hired: string;
}


const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = () => {
      setLoading(true);
      fetch("/api/employees")
        .then((res) => res.json())
        .then((data) => {
          setEmployees(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error al obtener los empleados:", err);
          setLoading(false);
        });
    };

    fetchEmployees();
  }, []);

  const handleDelete = (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este empleado?")) return;

    fetch(`/api/employees/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEmployees((prev) => prev.filter((e) => e.ID !== id));
        } else {
          alert("Error al eliminar: " + (data.error || "Error desconocido"));
        }
      })
      .catch((err) => {
        console.error("Error al eliminar el empleado:", err);
        alert("Ocurrió un error al conectar con el servidor");
      });
  };

  const handleEdit = (employee: Employee) => {
    console.log("Editar empleado:", employee);
    // Aquí podrías abrir un formulario de edición similar a ProductForm
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="content container mt-5 mb-5 flex-grow-1">
        <div className="d-flex align-items-center mb-4">
          <h1 className="mb-0">Empleados</h1>
          <button
            className="btn custom-green-btn ms-3"
            onClick={() => {console.log('agregar usuario xd')}}
          >
            Agregar Usuario
          </button>
        </div>

        {loading ? (
          <p>Cargando empleados...</p>
        ) : (
          <EmployeesTable
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Employees;
