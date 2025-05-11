import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "@core/routes/AppRouter";

import "./css/App.css";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
