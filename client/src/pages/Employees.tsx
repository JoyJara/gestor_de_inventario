import React, { useEffect, useState } from "react";
import EmployeesTable from "../components/EmployeesTable";
import UserForm from "../components/UserForm";
import { Footer, Navbar } from "../components/HTML";

interface Employee {
  ID: number;
  Name: string;
  Role: number;
  Phone: string;
  User: string;
  Status: number;
  Hired: string;
  Password?: string;
}

const createEmptyUser = (): Employee => ({
  ID: 0,
  Name: "",
  Role: 1,
  Phone: "",
  User: "",
  Status: 1,
  Hired: new Date().toISOString().slice(0, 10),
  Password: "",
});

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<Employee | null>(null);
  const [addingUser, setAddingUser] = useState(false);

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
    setEditingUser(employee);
    setAddingUser(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const method = addingUser ? "POST" : "PUT";
    const url = "/api/employees";

    const body = JSON.stringify({
      employeeID: editingUser.ID,
      name: editingUser.Name,
      role: editingUser.Role,
      phone: editingUser.Phone,
      username: editingUser.User,
      status: editingUser.Status,
      hiringDate: editingUser.Hired.slice(0, 10),
      ...(addingUser && { password: editingUser.Password || "" }),
    });

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAddingUser(false);
          setEditingUser(null);
          fetch("/api/employees")
            .then((res) => res.json())
            .then((data) => setEmployees(data));
        } else {
          alert("Error: " + (data.error || "Error desconocido"));
        }
      })
      .catch((err) => {
        console.error("Error al enviar el formulario:", err);
        alert("Ocurrió un error en el servidor");
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="content container mt-5 mb-5 flex-grow-1">
        <div className="d-flex align-items-center mb-4">
          <h1 className="mb-0">Empleados</h1>
          <button
            className="btn custom-green-btn ms-3"
            onClick={() => {
              setEditingUser(createEmptyUser());
              setAddingUser(true);
            }}
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

        {editingUser && (
          <UserForm
            user={editingUser}
            onChange={setEditingUser}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setEditingUser(null);
              setAddingUser(false);
            }}
            mode={addingUser ? "add" : "edit"}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Employees;
