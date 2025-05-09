import React, { useEffect, useState } from "react";
import InventoryTable from "../components/InventoryTable";
import ProductForm from "../components/ProductForm";
import { Footer, Navbar } from "../components/HTML";
import { getCategoryIDByName, Category } from "../utils/inventoryUtils";
import { createEmptyProduct, Product, EditableProduct } from "../utils/inventoryUtils";

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<EditableProduct | null>(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchInventory = () => {
      setLoading(true);
      fetch("/api/inventory")
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
      fetch("/api/inventory/categories")
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => {
          console.error("Error al obtener las categorías:", err);
        });
    };

    fetchInventory();
    fetchCategories();
  }, []); // ✅ Solo una vez al montar

  const handleDelete = (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    fetch(`/api/inventory/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetch("/api/inventory")
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
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const { ID, Name, Category, Stock, Price } = editingProduct;
    const CategoryID = getCategoryIDByName(categories, Category);

    if (!CategoryID) {
      alert("Categoría inválida.");
      return;
    }

    fetch(`/api/inventory/${ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        Producto: Name,
        Categoria: CategoryID.toString(),
        Precio: Price.toString(),
        Stock: Stock.toString(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEditingProduct(null);
          fetch("/api/inventory")
            .then((res) => res.json())
            .then((data) => setProducts(data));
        } else {
          alert("Error al actualizar: " + (data.error || "Error desconocido"));
        }
      })
      .catch((err) => {
        console.error("Error al actualizar el producto:", err);
        alert("Ocurrió un error en el servidor");
      });
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const { Name, Category, Stock, Price, Barcode, Description } = editingProduct;
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
          fetch("/api/inventory")
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
            }}
          >
            Agregar Producto
          </button>
        </div>

        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <InventoryTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {editingProduct && (
          <ProductForm
            product={editingProduct}
            onChange={setEditingProduct}
            onSubmit={addingProduct ? handleAddSubmit : handleEditSubmit}
            onCancel={() => {
              setEditingProduct(null);
              setAddingProduct(false);
            }}
            categories={categories}
            mode={addingProduct ? "add" : "edit"}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Inventory;
