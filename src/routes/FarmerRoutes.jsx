import { Route } from "react-router-dom";

import Dashboard from "../Components/Dashboard";
import ImageCarousel from "../Components/ImageCarousel";
import InfoBar from "../Components/InfoBar";
import FarmingCalculators from "../Components/FarmingCalculators";
import FAQ from "../Components/FAQ";
import Partners from "../Components/Partners";
import Newsletter from "../Components/Newsletter";

import Locationweather from "../Pages/Locationweather";
import CropRecommendation from "../Pages/Croprecommendation";
import KnowledgeHub from "../Pages/KnowledgeHub";
import BookService from "../Pages/BookService";
import MyBooking from "../Pages/MyBooking";
import BookingModal from "../Components/BookingModal";
import GovernmentSchemes from "../Pages/GovernmentSchemes";

import ProtectedRoute from "../Components/ProtectedRoute";
import SchemeDetailsModal from "../Components/SchemeDetailsModal";
import ProfilePage from "../Components/ProfilePage";

const FarmerRoutes = () => (
  <>
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

    <Route path="/Locationweather" element={<Locationweather />} />

    <Route path="/Croprecommendation" element={<CropRecommendation />} />

    <Route path="/knowledgehub" element={<KnowledgeHub />} />

    <Route
      path="/GovernmentSchemes"
      element={
        <ProtectedRoute>
          <GovernmentSchemes />
        </ProtectedRoute>
      }
    >
      <Route path=":id" element={<SchemeDetailsModal />} />
    </Route>

    <Route
      path="/BookService"
      element={
        <ProtectedRoute>
          <BookService />
        </ProtectedRoute>
      }
    >
      <Route path=":id" element={<BookingModal />} />
    </Route>
    <Route
      path="/MyBooking"
      element={
        <ProtectedRoute>
          <MyBooking />
        </ProtectedRoute>
      }
    />

    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      }
    />
  </>
);

export default FarmerRoutes;
