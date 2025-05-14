import React, { useEffect, useState } from "react";
import InventoryTable from "../components/InventoryTable";
import ProductForm from "../components/ProductForm";
import { Footer, Navbar } from "../components/HTML";
import { getCategoryIDByName, Category } from "../utils/inventoryUtils";
import {
  createEmptyProduct,
  Product,
  EditableProduct,
} from "../utils/inventoryUtils";

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<EditableProduct | null>(
    null
  );
  const [addingProduct, setAddingProduct] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stockToAdd, setStockToAdd] = useState<number>(0);

  const [filters, setFilters] = useState({
    name: "",
    id: "",
    barcode: "",
    category: "",
    priceMin: "",
    priceMax: "",
  });

  useEffect(() => {
    const fetchInventory = () => {
      setLoading(true);
      fetch("/api/inventory", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error al obtener el inventario:", err);
          setLoading(false);
        });
    };

    const fetchCategories = () => {
      fetch("/api/inventory/categories", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => {
          console.error("Error al obtener las categorías:", err);
        });
    };

    fetchInventory();
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchName =
      filters.name === "" ||
      product.Name.toLowerCase().includes(filters.name.toLowerCase());
    const matchID =
      filters.id === "" || product.ID.toString().includes(filters.id);
    const matchBarcode =
      filters.barcode === "" || product.Barcode?.includes(filters.barcode);
    const matchCategory =
      filters.category === "" || product.Category === filters.category;
    const matchPriceMin =
      filters.priceMin === "" || product.Price >= parseFloat(filters.priceMin);
    const matchPriceMax =
      filters.priceMax === "" || product.Price <= parseFloat(filters.priceMax);
    return (
      matchName &&
      matchID &&
      matchBarcode &&
      matchCategory &&
      matchPriceMin &&
      matchPriceMax
    );
  });

  const handleDelete = (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    fetch(`/api/inventory/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetch("/api/inventory", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => setProducts(data));
        } else {
          alert("Error al eliminar: " + (data.error || "Error desconocido"));
        }
      })
      .catch((err) => {
        console.error("Error al eliminar el producto:", err);
        alert("Ocurrió un error al conectar con el servidor");
      });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setAddingProduct(false);
    setStockToAdd(0);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const { ID, Name, Category, Stock, Price } = editingProduct;
    const CategoryID = getCategoryIDByName(categories, Category);

    if (!CategoryID) {
      alert("Categoría inválida.");
      return;
    }

    try {
      const res = await fetch(`/api/inventory/${ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: new URLSearchParams({
          Producto: Name,
          Categoria: CategoryID.toString(),
          Precio: Price.toString(),
          Stock: Stock.toString(),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Error al actualizar: " + (data.error || "Error desconocido"));
        return;
      }

      // Llama al SP si hay stock adicional
      if (stockToAdd > 0) {
        const stockRes = await fetch(`/api/inventory/stock/${ID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ quantity: stockToAdd }),
        });

        const stockData = await stockRes.json();

        if (!stockData.success) {
          alert("Error al actualizar el stock adicional: " + stockData.error);
        }
      }

      setEditingProduct(null);
      setStockToAdd(0);

      const updated = await fetch("/api/inventory", { credentials: "include" });
      const updatedData = await updated.json();
      setProducts(updatedData);
    } catch (err) {
      console.error("Error al actualizar el producto:", err);
      alert("Ocurrió un error en el servidor");
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const { Name, Category, Stock, Price, Barcode, Description } =
      editingProduct;
    const CategoryID = getCategoryIDByName(categories, Category);

    if (!CategoryID) {
      alert("Categoría inválida.");
      return;
    }

    fetch(`/api/inventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: new URLSearchParams({
        Producto: Name,
        Categoria: CategoryID.toString(),
        Precio: Price.toString(),
        Stock: Stock.toString(),
        CodigoBarras: Barcode || "",
        Descripcion: Description || "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEditingProduct(null);
          setAddingProduct(false);
          fetch("/api/inventory", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => setProducts(data));
        } else {
          alert("Error al agregar: " + (data.error || "Error desconocido"));
        }
      })
      .catch((err) => {
        console.error("Error al agregar el producto:", err);
        alert("Ocurrió un error en el servidor");
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="content container mt-5 mb-5 flex-grow-1">
        <div className="d-flex align-items-center mb-4">
          <h1 className="mb-0">Inventario</h1>
          <button
            className="btn custom-green-btn ms-3"
            onClick={() => {
              setEditingProduct(createEmptyProduct());
              setAddingProduct(true);
              setStockToAdd(0);
            }}
          >
            Agregar Producto
          </button>
        </div>

        {/* Filtros */}
        <div className="card p-3 mb-4">
          <h5>Filtrar Productos</h5>
          <div className="row">
            <div className="col-md-2 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={filters.name}
                onChange={(e) =>
                  setFilters({ ...filters, name: e.target.value })
                }
              />
            </div>
            <div className="col-md-2 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Código de barras"
                value={filters.barcode}
                onChange={(e) =>
                  setFilters({ ...filters, barcode: e.target.value })
                }
              />
            </div>
            <div className="col-md-2 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="ID"
                value={filters.id}
                onChange={(e) => setFilters({ ...filters, id: e.target.value })}
              />
            </div>

            <div className="col-md-2 mb-2">
              <select
                className="form-select"
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
              >
                <option value="">Categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2 mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="Precio mín."
                value={filters.priceMin}
                onChange={(e) =>
                  setFilters({ ...filters, priceMin: e.target.value })
                }
              />
            </div>
            <div className="col-md-2 mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="Precio máx."
                value={filters.priceMax}
                onChange={(e) =>
                  setFilters({ ...filters, priceMax: e.target.value })
                }
              />
            </div>
            <div className="col-md-12 mt-2">
              <button
                className="btn btn-outline-secondary"
                onClick={() =>
                  setFilters({
                    name: "",
                    id: "",
                    barcode: "",
                    category: "",
                    priceMin: "",
                    priceMax: "",
                  })
                }
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>

        {/* Tabla */}
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <InventoryTable
            products={filteredProducts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {/* Formulario */}
        {editingProduct && (
          <ProductForm
            product={editingProduct}
            onChange={setEditingProduct}
            onSubmit={addingProduct ? handleAddSubmit : handleEditSubmit}
            onCancel={() => {
              setEditingProduct(null);
              setAddingProduct(false);
              setStockToAdd(0);
            }}
            categories={categories}
            mode={addingProduct ? "add" : "edit"}
            stockToAdd={stockToAdd}
            setStockToAdd={setStockToAdd}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Inventory;
