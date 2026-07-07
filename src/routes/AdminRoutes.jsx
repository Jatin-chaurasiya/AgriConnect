import { Route } from "react-router-dom";

import AdminDashboard from "../Components/admin/AdminDashboard";
import ManageProviders from "../Components/admin/ManageProviders";
import ManageUsers from "../Components/admin/ManageUsers";
import ManageServices from "../Components/admin/ManageServices";

const AdminRoutes = () => (
  <>
    <Route
      path="/admin/dashboard"
      element={<AdminDashboard />}
    />

    <Route
      path="/admin/providers"
      element={<ManageProviders />}
    />

    <Route
      path="/admin/users"
      element={<ManageUsers />}
    />

    <Route
      path="/admin/services"
      element={<ManageServices />}
    />
  </>
);

export default AdminRoutes;