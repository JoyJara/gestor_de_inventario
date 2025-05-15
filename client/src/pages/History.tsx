import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components/HTML";
import HistoryTable from "../components/HistoryTable";

interface HistoryEntry {
  transactionID: number;
  transactionType: string;
  action: string;
  context: string;
  entity: string | null;
  productID: number | null;
  quantity: number | null;
  employeeName: string;
  date: string;
}


const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "",
    action: "",
    context: "",
    productID: "",
    employeeName: "",
    date: "",
  });

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a: HistoryEntry, b: HistoryEntry) =>
            b.transactionID - a.transactionID
        );
        setHistory(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener historial:", err);
        setLoading(false);
      });
  }, []);

  const filteredHistory = history.filter((entry) => {
    const matchType =
      filters.type === "" ||
      entry.transactionType.toLowerCase().includes(filters.type.toLowerCase());
    const matchAction =
      filters.action === "" ||
      entry.action.toLowerCase().includes(filters.action.toLowerCase());
    const matchContext =
      filters.context === "" ||
      entry.context.toLowerCase().includes(filters.context.toLowerCase());
    const matchProductID =
      filters.productID === "" ||
      entry.productID?.toString().includes(filters.productID);
    const matchEmployee =
      filters.employeeName === "" ||
      entry.employeeName
        .toLowerCase()
        .includes(filters.employeeName.toLowerCase());
    const matchDate =
      filters.date === "" || entry.date.slice(0, 10) === filters.date;

    return (
      matchType &&
      matchAction &&
      matchContext &&
      matchProductID &&
      matchEmployee &&
      matchDate
    );
  });

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container mt-5 mb-5 flex-grow-1">
        <h1 className="mb-4">Historial de Transacciones</h1>

        {/* Barra de Filtros */}
        <div className="card p-3 mb-4">
          <h5>Filtrar Historial</h5>
          <div className="row">
            <div className="col-md-2 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Tipo"
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              />
            </div>
            <div className="col-md-2 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Acción"
                value={filters.action}
                onChange={(e) =>
                  setFilters({ ...filters, action: e.target.value })
                }
              />
            </div>
            <div className="col-md-2 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Contexto"
                value={filters.context}
                onChange={(e) =>
                  setFilters({ ...filters, context: e.target.value })
                }
              />
            </div>
            <div className="col-md-2 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Producto ID"
                value={filters.productID}
                onChange={(e) =>
                  setFilters({ ...filters, productID: e.target.value })
                }
              />
            </div>
            <div className="col-md-2 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Empleado"
                value={filters.employeeName}
                onChange={(e) =>
                  setFilters({ ...filters, employeeName: e.target.value })
                }
              />
            </div>
            <div className="col-md-2 mb-2">
              <input
                type="date"
                className="form-control"
                value={filters.date}
                onChange={(e) =>
                  setFilters({ ...filters, date: e.target.value })
                }
              />
            </div>
            <div className="col-md-2 mb-2 d-flex align-items-center">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() =>
                  setFilters({
                    type: "",
                    action: "",
                    context: "",
                    productID: "",
                    employeeName: "",
                    date: "",
                  })
                }
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de Historial */}
        {loading ? (
          <p>Cargando historial...</p>
        ) : (
          <HistoryTable history={filteredHistory} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default History;
