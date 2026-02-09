import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Components/Header.jsx";
import MainNav from "./Components/MainNav.jsx";
import "react-toastify/dist/ReactToastify.css";
import ImageCarousel from "./Components/ImageCarousel.jsx";
import InfoBar from './Components/InfoBar';
import Dashboard from "./Components/dashboard.jsx";
import FarmingCalculators from "./Components/FarmingCalculators.jsx";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
    // Add your logout logic here (clear localStorage, API call, etc.)
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        <MainNav />
        <ImageCarousel />
        <InfoBar/>
        <Dashboard/>
        <FarmingCalculators/>
        <Routes>
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
