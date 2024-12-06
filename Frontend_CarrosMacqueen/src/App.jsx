import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Certifique-se de importar o Router
import AppRoutes from "./routes/AppRoutes"; // Verifique o caminho
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;

