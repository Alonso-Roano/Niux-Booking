import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./constructors/Dashboard";
import Home from "./pages/Home";
import data from "./json/data.json";
import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard data={data} />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
