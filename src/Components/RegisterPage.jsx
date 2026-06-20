import React from "react";
import { useRegister } from "../Hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const { state, handleChange, handleSubmit } = useRegister();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    username,
    email,
    password,
    language,
    serviceProvider,
    loading,
    error,
  } = state;

  return (
    <>
      <div className="register-container">
        <div className="card register-card p-4">
          {/* Title */}
          <div className="text-center mb-4">
            <i className="bi bi-person-plus-fill fs-1 text-success"></i>
            <h3 className="fw-bold mt-2 text-agri">{t("register.title")}</h3>
            <p className="text-muted">{t("register.subtitle")}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-center">
              <label className="form-label fw-semibold d-block">
                <i className="bi bi-image-fill me-2 text-success"></i>
                {t("register.profilePhoto")}
              </label>

              <div className="profile-preview mb-2">
                {state.previewImage ? (
                  <img
                    src={state.previewImage}
                    alt="Preview"
                    className="profile-img"
                  />
                ) : (
                  <div className="profile-placeholder">
                    <i className="bi bi-person-circle fs-1 text-muted"></i>
                  </div>
                )}
              </div>

              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                className="form-control shadow-sm"
              />
            </div>

            {/* Username */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="bi bi-person-fill me-2 text-success"></i>
                {t("register.username")}
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder={t("register.usernamePlaceholder")}
                className="form-control shadow-sm"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="bi bi-envelope-fill me-2 text-success"></i>
                {t("register.email")}
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder={t("register.emailPlaceholder")}
                className="form-control shadow-sm"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="bi bi-lock-fill me-2 text-success"></i>
                {t("register.password")}
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder={t("register.passwordPlaceholder")}
                className="form-control shadow-sm"
                required
              />
            </div>

            {/* Language */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="bi bi-translate me-2 text-success"></i>
                {t("register.language")}
              </label>
              <select
                name="language"
                value={language}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="en">{t("register.english")}</option>
                <option value="hi">{t("register.hindi")}</option>
                <option value="pa">{t("register.punjabi")}</option>
              </select>
            </div>

            {/* Service Provider */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="bi bi-briefcase-fill me-2 text-success"></i>
                {t("register.serviceProvider")}
              </label>

              <div className="form-check">
                <input
                  type="radio"
                  name="serviceProvider"
                  value="Yes"
                  checked={serviceProvider === "Yes"}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label className="form-check-label">{t("register.yes")}</label>
              </div>

              <div className="form-check">
                <input
                  type="radio"
                  name="serviceProvider"
                  value="No"
                  checked={serviceProvider === "No"}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label className="form-check-label">{t("register.no")}</label>
              </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {/* Buttons */}
            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-agri w-100 shadow-sm"
                disabled={loading}
              >
                {loading
                  ? t("register.registering")
                  : t("register.registerButton")}
              </button>
            </div>

            <p className="mt-3 text-center">
              {t("register.alreadyAccount")}
              <span
                className="register-link ms-1"
                onClick={() => navigate("/LoginPage")}
              >
                {t("register.loginHere")}
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* Same style as login */}
      <style>{`
        .register-container {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2D5016;
          padding: 20px;
        }

        .register-card {
          max-width: 520px;
          width: 100%;
          border-radius: 20px;
          background: #ffffff;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          max-height: 90vh;
          overflow-y: auto;
        }

        .text-agri {
          color: #2e7d32;
        }

        .btn-agri {
          background-color: #2e7d32;
          color: #fff;
          font-weight: bold;
          border-radius: 10px;
          transition: 0.3s;
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
          .profile-preview {
  display: flex;
  justify-content: center;
}

.profile-img {
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #2e7d32;
}

.profile-placeholder {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
}

      `}</style>
    </>
  );
};

export default RegisterPage;
