import React, { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";

const ProtectedRoute = ({ children }) => {

  const { user } = useContext(AppContext);

  const isAuthenticated = !!user;

  console.log("Header user:", user);


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
