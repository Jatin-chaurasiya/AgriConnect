import { Route } from "react-router-dom";

import ProviderDashboard from "../Components/provider/ProviderDashboard";
import AddService from "../Components/provider/AddService";
import MyServices from "../Components/provider/MyServices";
import Bookings from "../Components/provider/Bookings";

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
      path="/provider/bookings"
      element={<Bookings />}
    />
  </>
);

export default ProviderRoutes;