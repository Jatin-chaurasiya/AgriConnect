import React from "react";
import { useLogin } from "../Hooks/useLogin";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const { state, handleChange, handleSubmit } = useLogin();
  const { email, password, loading, error } = state;
  const navigate = useNavigate();
  const location = useLocation();

  const isFarmer = location.pathname === "/login/farmer";
  const isProvider = location.pathname === "/login/provider";
  const isAdmin = location.pathname === "/login/admin";

  const pageTitle = isFarmer
    ? "Farmer Login"
    : isProvider
      ? "Service Provider Login"
      : "Admin Login";

  const pageSubtitle = isFarmer
    ? "Login as Farmer"
    : isProvider
      ? "Login as Service Provider"
      : "Login as Admin";
  const { t } = useTranslation();

  return (
    <>
      <div className="login-container">
        <div className="card login-card p-4">
          <div className="text-center mb-4">
            <i className="bi bi-person-circle fs-1 text-success"></i>
            <h3 className="fw-bold mt-2 text-agri">{pageTitle}</h3>
            <p className="text-muted">{pageSubtitle}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="bi bi-envelope-fill me-2 text-success"></i>
                {t("login.email")}
              </label>
              <input
                type="email"
                name="email"
                value={email ?? ""}
                onChange={handleChange}
                className="form-control shadow-sm"
                placeholder={t("login.emailPlaceholder")}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="bi bi-lock-fill me-2 text-success"></i>
                {t("login.emailPlaceholder")}
              </label>
              <input
                type="password"
                name="password"
                value={password ?? ""}
                onChange={handleChange}
                className="form-control shadow-sm"
                placeholder={t("login.passwordPlaceholder")}
                required
              />
            </div>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-agri w-100 shadow-sm"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    {t("login.loggingIn")}
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-check-fill me-2"></i>
                    {t("login.loginButton")}
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn btn-back w-100 shadow-sm"
                onClick={() => navigate("/dashboard")}
              >
                <i className="bi bi-arrow-left-circle me-2"></i>
                {t("login.backButton")}
              </button>
            </div>

            <p className="mt-3 text-center">
              {t("login.noAccount")}
              <span
                className="register-link ms-1"
                onClick={() => navigate("/register")}
              >
                {t("login.registerHere")}
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* styles same as before */}
      <style>{`
        .login-container {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2D5016;
          font-family: 'Segoe UI', sans-serif;
        }

        .login-card {
          max-width: 420px;
          width: 100%;
          border-radius: 20px;
          background: #ffffff;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          animation: floatIn 0.8s ease-in-out;
        }

        @keyframes floatIn {
          from {
            transform: translateY(-30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .text-agri {
          color: #2e7d32;
        }

        .btn-agri {
          background-color: #2e7d32;
          color: #fff;
          font-weight: bold;
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .btn-agri:hover {
          background-color: #256427;
          transform: scale(1.02);
        }

        .btn-back {
          background-color: #f57c00;
          color: #fff;
          font-weight: bold;
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .btn-back:hover {
          background-color: #d96800;
          transform: scale(1.02);
        }

        .register-link {
          color: #f57c00;
          font-weight: 600;
          cursor: pointer;
        }

        .register-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default LoginPage;
