import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ user, children }) => {
  const navigate = useNavigate();
  const hasShown = useRef(false);

  useEffect(() => {
    if (!user && !hasShown.current) {
      hasShown.current = true;

      toast.warning("Please login first!", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: false,
      });

      setTimeout(() => {
        navigate("/LoginPage");
      }, 2000);
    }
  }, [user, navigate]);

  return children;   // 👈 IMPORTANT (page visible rahega)
};

export default ProtectedRoute;
