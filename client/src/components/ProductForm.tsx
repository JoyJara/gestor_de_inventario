import React from "react";

interface Product {
  ID: number;
  Name: string;
  Category: string;
  Stock: number | "";
  Price: number | "";
  Barcode?: string;
  Description?: string;
}

interface Category {
  id: number;
  name: string;
}

interface Props {
  product: Product;
  onChange: (product: Product) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  categories: Category[];
  mode: "edit" | "add";
}

const ProductForm: React.FC<Props> = ({
  product,
  onChange,
  onSubmit,
  onCancel,
  categories,
  mode,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    const message =
      mode === "add"
        ? "¿Estás seguro de agregar este producto?"
        : "¿Deseas guardar los cambios del producto?";
    if (window.confirm(message)) {
      onSubmit(e);
    } else {
      e.preventDefault();
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {mode === "add" ? "Agregar Producto" : "Editar Producto"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onCancel}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={product.Name}
                  onChange={(e) =>
                    onChange({ ...product, Name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Categoría</label>
                <select
                  className="form-select"
                  value={product.Category}
                  onChange={(e) =>
                    onChange({ ...product, Category: e.target.value })
                  }
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  className="form-control"
                  value={product.Stock}
                  onChange={(e) =>
                    onChange({
                      ...product,
                      Stock:
                        e.target.value === "" ? "" : Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Precio</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={product.Price}
                  onChange={(e) =>
                    onChange({
                      ...product,
                      Price:
                        e.target.value === "" ? "" : Number(e.target.value),
                    })
                  }
                  required
                />
              </div>

              {mode === "add" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Código de Barras</label>
                    <input
                      type="text"
                      className="form-control"
                      value={product.Barcode || ""}
                      onChange={(e) =>
                        onChange({ ...product, Barcode: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                      className="form-control"
                      value={product.Description || ""}
                      onChange={(e) =>
                        onChange({
                          ...product,
                          Description: e.target.value,
                        })
                      }
                      required
                    ></textarea>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                {mode === "add" ? "Agregar" : "Guardar"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
