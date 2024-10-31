import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './constructors/Dashboard';
import data from './json/data.json'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard data={data} />} />
      </Routes>
    </Router>
  );
}

export default App
