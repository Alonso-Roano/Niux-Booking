import { Routes, Route } from "react-router-dom";
import {
  PublicRoutes,
  ProtectedRoutes,
  RestrictedRoutes,
} from "@core/routes/routes";

import Login from "@auth/pages/Login";
import TipoUsuario from "@auth/pages/TipoUsuario";
import Registro from "@auth/pages/Registro";
import Business from "@client/pages/Business";
import Dashboard from "@admin/pages/Dashboard";
import DashboardEmpresa from "@company/pages/DashboardEmpresa";
import Home from "@pages/Home";
import DetallesReserva from "@client/pages/DetallesReserva";
import Schedule from "@client/pages/Schedule";
import { EditEmpresa } from "@shared/components/EditEmpresa";
import ClienteReservacion from "@client/pages/ClienteReservacion";
import Buscador from "@client/pages/Buscador";
import PageNotFound from "@pages/404";

import ProtectedRoute from "@core/services/ProtectedRoute";
import RestrictedRoute from "@core/services/RestrictedRoutes";
import ProtectedRouteHome from "@core/services/ProtectedHome";

function AppRoutes() {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route
        path={ProtectedRoutes.DASHBOARD_EMPRESA}
        element={
          <ProtectedRoute allowedRoles={["Socio"]}>
            <DashboardEmpresa />
          </ProtectedRoute>
        }
      />
      <Route
        path={ProtectedRoutes.DASHBOARD_ADMIN}
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={ProtectedRoutes.RESUMEN_RESERVA}
        element={
          <ProtectedRoute allowedRoles={["Cliente"]}>
            <DetallesReserva />
          </ProtectedRoute>
        }
      />
      <Route
        path={ProtectedRoutes.EDIT_EMPRESA}
        element={
          <ProtectedRoute allowedRoles={["Socio"]}>
            <EditEmpresa />
          </ProtectedRoute>
        }
      />
      <Route
        path={ProtectedRoutes.CLIENTE_RESERVACIONES}
        element={
          <ProtectedRoute allowedRoles={["Cliente"]}>
            <ClienteReservacion />
          </ProtectedRoute>
        }
      />

      {/* Restricted Routes */}
      <Route
        path={RestrictedRoutes.LOGIN}
        element={
          <RestrictedRoute>
            <Login />
          </RestrictedRoute>
        }
      />
      <Route
        path={RestrictedRoutes.REGISTRO_TYPE}
        element={
          <RestrictedRoute>
            <TipoUsuario />
          </RestrictedRoute>
        }
      />
      <Route
        path={RestrictedRoutes.REGISTRO}
        element={
          <RestrictedRoute>
            <Registro />
          </RestrictedRoute>
        }
      />

      {/* Public Routes */}
      <Route
        path={PublicRoutes.HOME}
        element={
          <ProtectedRouteHome>
            <Home />
          </ProtectedRouteHome>
        }
      />
      <Route path={PublicRoutes.BUSINESS} element={<Business />} />
      <Route path={PublicRoutes.SCHEDULE} element={<Schedule />} />
      <Route path={PublicRoutes.DETAIL_RESERVA} element={<DetallesReserva />} />
      <Route path={PublicRoutes.BUSCADOR} element={<Buscador />} />
      <Route path={PublicRoutes.NOT_FOUND} element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
