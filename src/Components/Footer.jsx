import React from 'react';
import { Link } from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-content">
            {/* About Section */}
            <div className="footer-section">
              <h3>{t("footer.aboutTitle")}</h3>
              <p>{t("footer.aboutDescription")}</p>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3>{t("footer.quickLinks")}</h3>
              <Link to="/Locationweather">
                <i className="fas fa-chevron-right"></i>{t("footer.weatherLink")}
              </Link>
              <Link to="/Croprecommendation">
                <i className="fas fa-chevron-right"></i>{t("footer.cropRecommendationLink")}
              </Link>
              <Link to="/GovernmentSchemes">
                <i className="fas fa-chevron-right"></i>{t("footer.governmentSchemesLink")}
              </Link>
              <Link to="/knowledgehub">
                <i className="fas fa-chevron-right"></i>{t("footer.knowledgeHubLink")}
              </Link>
            </div>

            {/* Contact Section */}
            <div className="footer-section">
              <h3>{t("footer.contactUs")}</h3>
              <a href="tel:+9118001234567">
                <i className="fas fa-phone"></i> +91 1800-123-4567
              </a>
              <a href="mailto:support@agriconnect.in">
                <i className="fas fa-envelope"></i> support@agriconnect.in
              </a>
              <a href="#">
                <i className="fas fa-map-marker-alt"></i>{t("footer.location")}
              </a>
            </div>

            {/* Social Media */}
            <div className="footer-section">
              <h3>{t("footer.followUs")}</h3>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>{t("footer.facebook")}
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>{t("footer.twitter")}
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>{t("footer.instagram")}
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>{t("footer.youtube")}
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>{t("footer.whatsapp")}
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="copyright">
            {t("footer.copyright")}
          </div>
        </div>
      </footer>

      <style>{`
        /* Footer CSS */
        footer {
          background-color: #1B2D12;
          color: white;
          padding: 40px 0 20px;
        }
        .footer-content {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }
        .footer-section h3 {
          font-size: 18px;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
          color: #FFFFFF;
        }
        .footer-section h3:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background-color: #FFA62B;
        }
        .footer-section p, .footer-section a {
          color: #FFFFFF;
          font-size: 14px;
          margin-bottom: 10px;
          display: block;
          text-decoration: none;
          transition: 0.3s;
        }
        .footer-section a:hover {
          color: white;
        }
        .footer-section i {
          margin-right: 10px;
          width: 16px;
          text-align: center;
          color: #FFA62B;
        }
        .copyright {
          text-align: center;
          padding-top: 30px;
          margin-top: 30px;
          border-top: 1px solid #3a612d;
          color: #FFFFFF;
          font-size: 13px;
        }

        /* Responsive Footer */
        @media (max-width: 900px) {
          .footer-content {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
        @media (max-width: 480px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;