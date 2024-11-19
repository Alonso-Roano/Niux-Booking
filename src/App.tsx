import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import TipoUsuario from "./pages/TipoUsuario";
import Registro from "./pages/Registro";
import Business from "./pages/Business";
import ProtectedRoute from "./services/ProtectedRoute";
import RestrictedRoute from "./services/RestrictedRoutes";
import Dashboard from "./pages/Dashboard";
import DashboardEmpresa from "./pages/DashboardEmpresa";
import Home from "./pages/Home";
import ProtectedRouteHome from "./services/ProtectedHome";
import DetallesReserva from "./pages/DetallesReserva";
import Schedule from "./pages/Schedule";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/Dashboard/Empresa"
          element={
            <ProtectedRoute allowedRoles={["Socio"]}>
              <DashboardEmpresa />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/negocio"
          element={
            /*     <ProtectedRoute allowedRoles={["Cliente"]}>
            </ProtectedRoute> */
            <Business />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute>
              <Login />
            </RestrictedRoute>
          }
        />
        <Route
          path="/registro-type"
          element={
            <RestrictedRoute>
              <TipoUsuario />
            </RestrictedRoute>
          }
        />
        <Route
          path="/registro/:tipoUsuario"
          element={
            <RestrictedRoute>
              <Registro />
            </RestrictedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRouteHome>
              <Home />
            </ProtectedRouteHome>
          }
        />
        <Route
          path="/horario"
          element={
            /*      <ProtectedRoute allowedRoles={["Cliente", "socio"]}>
            </ProtectedRoute> */
            <Schedule />
          }
        />
        <Route
          path="/reserva/resumen"
          element={
            <ProtectedRoute allowedRoles={["Cliente"]}>
              <DetallesReserva />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
