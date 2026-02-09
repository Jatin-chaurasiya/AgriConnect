import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  const [userLanguage, setUserLanguage] = useState('en');

  const handleLanguageChange = (lang) => {
    setUserLanguage(lang);
    // You can add language change logic here (i18n, etc.)
  };

  return (
    <>
      <div 
        className="language-bar py-2 shadow-sm animate__animated animate__fadeInDown"
        style={{ backgroundColor: '#1B2D12' }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          
          {/* Logo / Branding */}
          <div className="d-flex align-items-center">
            <i className="fas fa-leaf me-2" style={{ color: '#fbc02d', fontSize: '1.4rem' }}></i>
            <span className="fw-bold fs-5 text-white">AgriConnect</span>
          </div>

          {/* Language Options */}
          <div className="d-flex align-items-center">
            <div 
              className={`language-option px-3 py-1 me-2 rounded ${userLanguage === 'en' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('en')}
            >
              <i className="fas fa-language me-1"></i> English
            </div>
            <div 
              className={`language-option px-3 py-1 me-2 rounded ${userLanguage === 'hi' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('hi')}
            >
              <i className="fas fa-language me-1"></i> Hindi
            </div>
            <div 
              className={`language-option px-3 py-1 me-2 rounded ${userLanguage === 'ta' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('ta')}
            >
              <i className="fas fa-language me-1"></i> Tamil
            </div>
            <div 
              className={`language-option px-3 py-1 rounded ${userLanguage === 'te' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('te')}
            >
              <i className="fas fa-language me-1"></i> Telugu
            </div>
          </div>

          {/* Auth / Profile Section */}
          <div className="d-flex align-items-center">
            {/* If user is logged in */}
            {user ? (
              <div className="d-flex align-items-center">
                <Link to="/profile" className="d-flex align-items-center text-decoration-none">
                  <i className="fas fa-user-circle me-2 text-white" style={{ fontSize: '1.4rem' }}></i>
                  <span className="text-white fw-semibold">{user.username}</span>
                </Link>
                <button 
                  onClick={onLogout}
                  className="btn btn-danger btn-sm ms-3 shadow-sm fw-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              /* If user is NOT logged in */
              <div>
                <Link 
                  to="/login"
                  className="btn btn-warning btn-sm me-2 shadow-sm fw-semibold login-btn"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="btn btn-warning btn-sm shadow-sm fw-semibold register-btn"
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
          box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15);
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