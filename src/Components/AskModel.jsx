import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AskModel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  return (
    <>
      <div className="role-container">
        <div className="card role-card p-4">
          <div className="text-center mb-4">
            <i className="bi bi-person-circle fs-1 text-success"></i>

            <h3 className="fw-bold mt-2 text-agri">
              {isLogin ? "Login As" : "Register As"}
            </h3>

            <p className="text-muted">
              {isLogin
                ? "Select your account type to login"
                : "Select your account type to register"}
            </p>
          </div>

          {/* Farmer */}

          <div
            className="role-option mb-3"
            onClick={() =>
              navigate(isLogin ? "/login/farmer" : "/register/farmer")
            }
          >
            <div className="d-flex align-items-center">
              <div className="role-icon">🌾</div>

              <div className="ms-3 flex-grow-1">
                <h5 className="mb-1 fw-bold">Farmer</h5>

                <small className="text-muted">
                  {isLogin ? "Login as Farmer" : "Register as Farmer"}
                </small>
              </div>

              <i className="bi bi-chevron-right fs-4"></i>
            </div>
          </div>

          {/* Provider */}

          <div
            className="role-option"
            onClick={() =>
              navigate(isLogin ? "/login/provider" : "/register/provider")
            }
          >
            <div className="d-flex align-items-center">
              <div className="role-icon">🚜</div>

              <div className="ms-3 flex-grow-1">
                <h5 className="mb-1 fw-bold">Service Provider</h5>

                <small className="text-muted">
                  {isLogin
                    ? "Login as Service Provider"
                    : "Register as Service Provider"}
                </small>
              </div>

              <i className="bi bi-chevron-right fs-4"></i>
            </div>
          </div>

          {/* Admin */}
          {isLogin && (
            <div
              className="role-option"
              onClick={() => navigate("/login/admin")}
            >
              <div className="d-flex align-items-center">
                <div className="role-icon">🛡️</div>

                <div className="ms-3 flex-grow-1">
                  <h5 className="mb-1 fw-bold">Admin</h5>

                  <small className="text-muted">Login as Admin</small>
                </div>

                <i className="bi bi-chevron-right fs-4"></i>
              </div>
            </div>
          )}

          <button
            className="btn btn-back w-100 mt-4"
            onClick={() => navigate("/")}
          >
            <i className="bi bi-arrow-left-circle me-2"></i>
            Back
          </button>
        </div>
      </div>

      <style>{`

      .role-container{
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background:#2D5016;
          padding:20px;
      }

      .role-card{
          max-width:500px;
          width:100%;
          border-radius:20px;
          background:#fff;
          box-shadow:0 8px 20px rgba(0,0,0,.15);
          animation:floatIn .6s ease;
      }

      @keyframes floatIn{
          from{
              opacity:0;
              transform:translateY(-25px);
          }

          to{
              opacity:1;
              transform:translateY(0);
          }
      }

      .text-agri{
          color:#2e7d32;
      }

      .role-option{
          border:2px solid #e8e8e8;
          border-radius:15px;
          padding:18px;
          cursor:pointer;
          transition:.3s;
      }

      .role-option:hover{
          border-color:#2e7d32;
          transform:translateY(-3px);
          box-shadow:0 8px 18px rgba(0,0,0,.12);
      }

      .role-icon{
          width:60px;
          height:60px;
          border-radius:50%;
          background:#e8f5e9;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:28px;
      }

      .btn-back{
          background:#f57c00;
          color:white;
          font-weight:bold;
          border-radius:10px;
      }

      .btn-back:hover{
          background:#d96800;
          color:white;
      }

      `}</style>
    </>
  );
};

export default AskModel;
