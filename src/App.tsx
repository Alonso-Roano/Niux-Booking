import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./constructors/Dashboard";
import Home from "./pages/Home";
import data from "./json/data.json";
import "./App.css";
import Login from "./pages/Login";
import TipoUsuario from "./pages/TipoUsuario";
import Registro from "./pages/Registro";
import Business from "./pages/Business";
import Schedule from "./pages/Schedule";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard data={data} />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro-type" element={<TipoUsuario />} />
        <Route path="/registro/:tipoUsuario" element={<Registro />} />
        <Route path="/negocio" element={<Business />} />
        <Route path="/horario" element={<Schedule />} />
      </Routes>
    </Router>
  );
}

export default App;
