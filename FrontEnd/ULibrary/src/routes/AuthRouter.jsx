
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

export const AuthRouter = () => {
  return (
    <>
        <Routes>
          {/* rutas hijas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
    </>
  );
};