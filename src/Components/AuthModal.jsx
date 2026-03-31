import React from "react";
import { createPortal } from "react-dom";

const AuthModal = () => {
  return createPortal(
    <div className="fixed top-1/2 left-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 flex items-center justify-center w-screen h-screen">
      
      <div className="bg-white px-8 py-6 rounded-xl shadow-2xl text-center w-[300px] border">
        <h2 className="text-lg font-semibold mb-2">
          🔒 Please login first
        </h2>
        <p className="text-gray-600 text-sm">
          Redirecting...
        </p>
      </div>

    </div>,
    document.body
  );
};

export default AuthModal;