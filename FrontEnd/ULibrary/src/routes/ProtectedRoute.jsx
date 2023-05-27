import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  //toma uid del store
  const { uid } = useSelector((state) => state.auth);

  //valida si no tiene uid lo envia a login
  if (!uid) return <Navigate to="/login" />;

  //si tiene uid muestra el componente
  return <>{children}</>;
};