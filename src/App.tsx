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
import { EditEmpresa } from "./components/EditEmpresa";
import ClienteReservacion from "./pages/ClienteReservacion";
import Buscador from "./pages/Buscador";
import PageNotFound from "./pages/404";

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
        <Route path="/negocio/:slugEmpresa" element={<Business />} />
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
          path="/horario/:slugEmpresa/:slugServicio"
          element={<Schedule />}
        />
        <Route path="/detalle-reserva" element={<DetallesReserva />} />
        <Route
          path="/reserva/resumen"
          element={
            <ProtectedRoute allowedRoles={["Cliente"]}>
              <DetallesReserva />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Editar/Empresa"
          element={
            <ProtectedRoute allowedRoles={["Socio"]}>
              <EditEmpresa />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservaciones"
          element={
            <ProtectedRoute allowedRoles={["Cliente"]}>
              <ClienteReservacion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Buscador"
          element={
              <Buscador />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
