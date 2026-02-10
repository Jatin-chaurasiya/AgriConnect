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
import InfoBar from "./Components/InfoBar";
import Dashboard from "./Components/dashboard.jsx";
import FarmingCalculators from "./Components/FarmingCalculators.jsx";
import FAQ from "./Components/FAQ.jsx";
import Newsletter from "./Components/Newsletter.jsx";
import Footer from "./Components/Footer.jsx";
import Locationweather from "./Pages/Locationweather.jsx";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <MainNav />

      {/* 👇 ONLY PAGE CONTENT GOES INSIDE ROUTES */}
      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              <ImageCarousel />
              <InfoBar />
              <Dashboard />
              <FarmingCalculators />
              <FAQ />
              <Newsletter />
            </>
          }
        />

        {/* WEATHER PAGE */}
        <Route path="/Locationweather" element={<Locationweather />} />
      </Routes>

      <Footer />

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;

