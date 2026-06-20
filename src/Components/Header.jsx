import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { user, clearUser } = useContext(AppContext);
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const currentLanguage = i18n.language;
  const languages = [
    { label: "English", code: "en" },
    { label: "हिन्दी", code: "hi" },
    { label: "ਪੰਜਾਬੀ", code: "pa" },
  ];

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const handleLogout = () => {
    clearUser();
    navigate("/LoginPage");
  };

  return (
    <>
      <div
        className="language-bar py-2 shadow-sm"
        style={{ backgroundColor: "#1B2D12" }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo */}
          <div
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <i
              className="fas fa-leaf me-2"
              style={{ color: "#fbc02d", fontSize: "1.4rem" }}
            ></i>
            <span className="fw-bold fs-5 text-white">
              {t("navbar.appName")}
            </span>
          </div>

          {/* Language */}
          <div className="d-flex align-items-center">
            {languages.map((lang) => (
              <div
                key={lang.code}
                className={`language-option px-3 py-1 me-2 rounded ${
                  currentLanguage === lang.code ? "active" : ""
                }`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                <i className="fas fa-language me-1"></i>
                {lang.label}
              </div>
            ))}
          </div>

          {/* Auth Section */}
          <div className="d-flex align-items-center">
            {user ? (
              <div className="d-flex align-items-center">
                {/* Profile */}
                <Link
                  to="/profile"
                  className="d-flex align-items-center text-decoration-none"
                >
                  <img
                    src={
                      user?.profileImageUrl ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="Profile"
                    className="rounded-circle me-2"
                    width="40"
                    height="40"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="text-white fw-semibold">
                    {user?.username || "User"}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm ms-3 shadow-sm fw-semibold"
                >
                  {t("navbar.logout")}
                </button>
              </div>
            ) : (
              <div>
                <Link
                  to="/LoginPage"
                  className="btn btn-warning btn-sm me-2 shadow-sm fw-semibold"
                >
                  {t("navbar.login")}
                </Link>

                <Link
                  to="/RegisterPage"
                  className="btn btn-warning btn-sm shadow-sm fw-semibold"
                >
                  {t("navbar.register")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .language-option {
          cursor: pointer;
          transition: all 0.3s ease;
          color: #ffffff;
          user-select: none;
        }

        .language-option:hover {
          background-color: #2D5016;
          color: #fbc02d !important;
          transform: translateY(-2px);
        }

        .language-option.active {
          background-color: #2D5016;
          color: #fbc02d !important;
          font-weight: bold;
        }

        .btn-warning {
          border-radius: 8px;
          transition: all 0.3s ease;
          background-color: #fbc02d;
          color: #1B2D12;
          border: none;
        }

        .btn-warning:hover {
          background-color: #f57c00 !important;
          transform: scale(1.05);
          color: #fff !important;
        }
      `}</style>
    </>
  );
};

export default Header;
