import { Route } from "react-router-dom";

import ProviderDashboard from "../Components/provider/ProviderDashboard";
import AddService from "../Components/provider/AddService";
import MyServices from "../Components/provider/MyServices";
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
      path="/provider/my-services"
      element={<MyServices />}
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