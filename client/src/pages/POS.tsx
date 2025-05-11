import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components/HTML";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Product {
  id: number;
  name: string;
  price: number;
  productID: number;
}

interface CartItem extends Product {
  quantity: number;
}

const POS: React.FC = () => {
  const isLoggedIn = useAuth(); // 🔐 Hook de sesión

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!isLoggedIn) return;

    fetch("/api/pos")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, [isLoggedIn]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedProduct(null);

    if (value.length > 0) {
      const matches = products.filter(
        (p) =>
          p.name.toLowerCase().includes(value.toLowerCase()) ||
          p.id.toString().startsWith(value)
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const selectProduct = (product: Product) => {
    setSearchTerm(product.name);
    setSuggestions([]);
    setSelectedProduct(product);
  };

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || quantity <= 0) return;

    const existingIndex = cart.findIndex(
      (item) => item.id === selectedProduct.id
    );

    const updatedCart = [...cart];

    if (existingIndex >= 0) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push({ ...selectedProduct, quantity });
    }

    setCart(updatedCart);
    setSearchTerm("");
    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  // 🔐 Validación al final, dentro del return
  if (isLoggedIn === null) return <p>Cargando...</p>;
  if (!isLoggedIn) return <Navigate to="/" />;

  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>

      <main className="content">
        <div className="container mt-5">
          <h1 className="mb-4">Punto de Venta</h1>

          <form onSubmit={handleAddToCart}>
            <div className="mb-3 position-relative">
              <label htmlFor="product" className="form-label">
                Producto
              </label>
              <input
                type="text"
                className="form-control"
                id="product"
                placeholder="Nombre o código de barra"
                value={searchTerm}
                onChange={handleInputChange}
                autoComplete="off"
              />
              {suggestions.length > 0 && (
                <ul
                  className="list-group position-absolute w-100"
                  style={{ zIndex: 1000 }}
                >
                  {suggestions.map((product) => (
                    <li
                      key={product.id}
                      className="list-group-item list-group-item-action"
                      onClick={() => selectProduct(product)}
                      style={{ cursor: "pointer" }}
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Cantidad
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <button type="submit" className="btn custom-green-btn">
              Agregar al carrito
            </button>
          </form>

          <div className="row mt-4">
            <div className="col-12">
              <h3>Detalles del Carrito</h3>
              <h4>Total: ${totalAmount.toFixed(2)}</h4>
              <button
                type="button"
                onClick={() => {
                  if (cart.length === 0) {
                    alert("El carrito está vacío");
                    return;
                  }

                  const actionID = 1;
                  const actionContextID = 1;
                  const employeeID = 1; // ⚠️ Cambia esto cuando integres sesión real
                  const date = new Date().toISOString().slice(0, 10);

                  const products = cart.map((item) => ({
                    productID: item.productID,
                    quantity: item.quantity,
                  }));

                  fetch("/api/pos", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      actionID,
                      actionContextID,
                      employeeID,
                      date,
                      products,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.success) {
                        alert("Se registró la venta correctamente");
                        console.log(data.results);
                      } else {
                        alert(data.error || "Error desconocido");
                      }
                    })
                    .catch((err) => {
                      console.error("Error al registrar la venta:", err);
                      alert("Ocurrió un error al conectar con el servidor");
                    });
                }}
                className="btn custom-green-btn"
              >
                Registrar Venta
              </button>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price}</td>
                      <td>${item.quantity * item.price}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default POS;
