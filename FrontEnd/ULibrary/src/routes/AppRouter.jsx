import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "../pages/homePage/HomePage";
import { AuthRouter } from "./AuthRouter";
import { ProtectedRoute } from "./ProtectedRoute";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/FirebaseConfig";
import { setUser } from "../redux/slices/userSlice";


export const AppRouter = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        dispatch(
          setUser({
            uid: user.uid,
            userName: user.displayName,
          })
        );
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* rutas iniciales */}
        <Route path="/*" element={<AuthRouter />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
};