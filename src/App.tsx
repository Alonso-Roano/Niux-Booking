import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import TipoUsuario from "./pages/TipoUsuario";
import Registro from "./pages/Registro";
import Business from "./pages/Business";
import ProtectedRoute from "./services/ProtectedRoute";
import RestrictedRoute from "./services/RestrictedRoutes";
import Dashboard from "./constructors/Dashboard";
import DashboardEmpresa from "./constructors/DashboardEmpresa";
import Home from "./pages/Home";
import ProtectedRouteHome from "./services/ProtectedHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Dashboard/Empresa" element={
          <ProtectedRoute allowedRoles={['Socio']}>
            <DashboardEmpresa />
          </ProtectedRoute>
        } />
        <Route path="/Dashboard" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/negocio" element={
          <ProtectedRoute allowedRoles={['Cliente']}>
            <Business />
          </ProtectedRoute>
        } />
        <Route path="/login" element={
          <RestrictedRoute>
            <Login />
          </RestrictedRoute>
        } />
        <Route path="/registro-type" element={
          <RestrictedRoute>
            <TipoUsuario />
          </RestrictedRoute>
        } />
        <Route path="/registro/:tipoUsuario" element={
          <RestrictedRoute>
            <Registro />
          </RestrictedRoute>
        } />
        <Route path="/" element={
          <ProtectedRouteHome>
            <Home />
          </ProtectedRouteHome>
        } />
      </Routes>
    </Router>
  );
}

export default App;
