import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLoggedIn = useAuth();

  if (isLoggedIn === null) return <p>Cargando...</p>;
  if (!isLoggedIn) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
