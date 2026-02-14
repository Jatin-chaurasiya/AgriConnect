import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const [userLanguage, setUserLanguage] = useState("en");
  const navigate = useNavigate();

  const handleLanguageChange = (lang) => {
    setUserLanguage(lang);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
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
              AgriConnect
            </span>
          </div>

          {/* Language */}
          <div className="d-flex align-items-center">
            {["en", "hi", "ta", "te"].map((lang) => (
              <div
                key={lang}
                className={`language-option px-3 py-1 me-2 rounded ${
                  userLanguage === lang ? "active" : ""
                }`}
                onClick={() => handleLanguageChange(lang)}
              >
                <i className="fas fa-language me-1"></i>
                {lang.toUpperCase()}
              </div>
            ))}
          </div>

          {/* Auth Section */}
          <div className="d-flex align-items-center">
            {user ? (
              <div className="d-flex align-items-center">

                {/* Profile Section */}
                <Link
                  to="/profile"
                  className="d-flex align-items-center text-decoration-none"
                >
                  <img
                    src={
                      user.profileImage ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="Profile"
                    className="rounded-circle me-2"
                    width="40"
                    height="40"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="text-white fw-semibold">
                    {user.username}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm ms-3 shadow-sm fw-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link
                  to="/LoginPage"
                  className="btn btn-warning btn-sm me-2 shadow-sm fw-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/RegisterPage"
                  className="btn btn-warning btn-sm shadow-sm fw-semibold"
                >
                  Register
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
