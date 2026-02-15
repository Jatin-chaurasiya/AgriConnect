import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Components/Header.jsx";
import MainNav from "./Components/MainNav.jsx";
import ImageCarousel from "./Components/ImageCarousel.jsx";
import InfoBar from "./Components/InfoBar.jsx";
import Dashboard from "./Components/dashboard.jsx";
import FarmingCalculators from "./Components/FarmingCalculators.jsx";
import FAQ from "./Components/FAQ.jsx";
import Newsletter from "./Components/Newsletter.jsx";
import Footer from "./Components/Footer.jsx";
import Partners from "./Components/Partners.jsx";
import ChatWidget from "./Components/ChatWidget.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import RegisterPage from "./Components/RegisterPage.jsx";

import Locationweather from "./Pages/Locationweather.jsx";
import CropRecommendation from "./Pages/Croprecommendation.jsx";
import KnowledgeHub from "./Pages/KnowledgeHub.jsx";
import GovernmentSchemes from "./Pages/GovernmentSchemes.jsx";
import VirtualAssistant from "./Pages/VirtualAssistant.jsx";
import ProfilePage from "./Components/ProfilePage.jsx";

function App() {
  return (
    <Router>

      {/* Global Layout */}
      <Header />
      <MainNav />

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <ImageCarousel />
              <InfoBar />
              <Dashboard />
              <FarmingCalculators />
              <FAQ />
              <Partners />
              <Newsletter />
            </>
          }
        />

        {/* Public Routes */}
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/Locationweather" element={<Locationweather />} />
        <Route path="/knowledgehub" element={<KnowledgeHub />} />
        <Route path="/VirtualAssistant" element={<VirtualAssistant />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Croprecommendation"
          element={
            <ProtectedRoute>
              <CropRecommendation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/GovernmentSchemes"
          element={
            <ProtectedRoute>
              <GovernmentSchemes />
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* Global Components */}
      <ChatWidget />
      <Footer />

      <ToastContainer position="top-right" autoClose={3000} />

    </Router>
  );
}

export default App;
