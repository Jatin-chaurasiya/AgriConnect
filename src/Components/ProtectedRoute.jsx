import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import AuthModal from "./AuthModal";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <AuthModal />;
  }

  return children;
};

export default ProtectedRoute;