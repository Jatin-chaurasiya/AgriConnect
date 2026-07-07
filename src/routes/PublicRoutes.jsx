import { Route } from "react-router-dom";

import AskModel from "../Components/AskModel";
import LoginPage from "../Components/LoginPage";
import RegisterPage from "../Components/RegisterPage";

const PublicRoutes = () => (
  <>
    <Route path="/login" element={<AskModel type="login" />} />

    <Route path="/register" element={<AskModel type="register" />} />

    <Route path="/login/farmer" element={<LoginPage />} />

    <Route path="/login/provider" element={<LoginPage />} />

    <Route path="/login/admin" element={<LoginPage />} />

    <Route path="/register/farmer" element={<RegisterPage />} />

    <Route path="/register/provider" element={<RegisterPage />} />
  </>
);

export default PublicRoutes;