import React, { useState } from "react";
import {BrowserRouter as Router,Routes,Route,Navigate,} from "react-router-dom";
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
import CropRecommendation from "./Pages/Croprecommendation.jsx";
import KnowledgeHub from "./Pages/KnowledgeHub.jsx";
import GovernmentSchemes from "./Pages/GovernmentSchemes.jsx";
import VirtualAssistant from "./Pages/VirtualAssistant.jsx";
import Partners from "./Components/Partners.jsx";
import ChatWidget from "./Components/ChatWidget";



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
              <Partners />
              <Newsletter />
            </>
          }
        />

        {/* WEATHER PAGE */}
        <Route path="/Locationweather" element={<Locationweather />} />
         <Route path="/Croprecommendation" element={<CropRecommendation />} />
         <Route path="/knowledgehub" element={<KnowledgeHub />} />
         <Route path="/GovernmentSchemes" element={<GovernmentSchemes/>} />
         <Route path="/VirtualAssistant" element={<VirtualAssistant />} />
      </Routes>
      <ChatWidget />
      <Footer />

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;

