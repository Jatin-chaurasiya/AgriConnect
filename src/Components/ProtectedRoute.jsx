import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ user, children }) => {
  const isAuthenticated =
    user || localStorage.getItem("token");

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warning("Please login first!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/LoginPage" replace />;
  }

  return children;
};

export default ProtectedRoute;
