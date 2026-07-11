import { Route } from "react-router-dom";

import ProviderDashboard from "../Components/provider/ProviderDashboard";
import AddService from "../Components/provider/AddService";
import BookingRequest from "../Components/provider/BookingRequest";
import BookingHistory from "../Components/provider/BookingHistory";

const ProviderRoutes = () => (
  <>
    <Route
      path="/provider/dashboard"
      element={<ProviderDashboard />}
    />

    <Route
      path="/provider/add-service"
      element={<AddService />}
    />

    <Route
      path="/provider/BookingRequest"
      element={<BookingRequest />}
    />
    <Route
      path="/provider/BookingHistory"
      element={<BookingHistory />}
    />
  </>
);

export default ProviderRoutes;