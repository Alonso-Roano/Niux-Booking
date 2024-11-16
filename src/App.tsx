import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardEmpresa from "./constructors/Dashboard";
import Home from "./pages/Home";
import "./App.css";
import Login from "./pages/Login";
import TipoUsuario from "./pages/TipoUsuario";
import Registro from "./pages/Registro";
import Business from "./pages/Business";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Dasboard/Empresa" element={<DashboardEmpresa />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro-type" element={<TipoUsuario />} />
        <Route path="/registro/:tipoUsuario" element={<Registro />} />
        <Route path="/negocio" element={<Business />} />
      </Routes>
    </Router>
  );
}

export default App;
