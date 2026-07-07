import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Global Components
import Header from "./Components/Header";
import MainNav from "./Components/MainNav";
import Footer from "./Components/Footer";
import ChatWidget from "./Components/ChatWidget";

// Route Groups
import PublicRoutes from "./routes/PublicRoutes";
import FarmerRoutes from "./routes/FarmerRoutes";
import ProviderRoutes from "./routes/ProviderRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <Router>
      {/* Global Layout */}
      <Header />
      <MainNav />

      <Routes>
        {/* Public Routes */}
        {PublicRoutes()}

        {/* Farmer Routes */}
        {FarmerRoutes()}

        {/* Provider Routes */}
        {ProviderRoutes()}

        {/* Admin Routes */}
        {AdminRoutes()}
      </Routes>

      {/* Global Components */}
      <ChatWidget />
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </Router>
  );
}

export default App;