import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-content">
            {/* About Section */}
            <div className="footer-section">
              <h3>About AgriConnect</h3>
              <p>Empowering farmers across India with technology, knowledge, and market access to transform agricultural practices and improve livelihoods.</p>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3>Quick Links</h3>
              <Link to="/Locationweather">
                <i className="fas fa-chevron-right"></i> Weather Forecast
              </Link>
              <Link to="/Croprecommendation">
                <i className="fas fa-chevron-right"></i> Crop Recommendation
              </Link>
              <Link to="/GovernmentSchemes">
                <i className="fas fa-chevron-right"></i> Government Schemes
              </Link>
              <Link to="/knowledgehub">
                <i className="fas fa-chevron-right"></i> Knowledge Hub
              </Link>
            </div>

            {/* Contact Section */}
            <div className="footer-section">
              <h3>Contact Us</h3>
              <a href="tel:+9118001234567">
                <i className="fas fa-phone"></i> +91 1800-123-4567
              </a>
              <a href="mailto:support@agriconnect.in">
                <i className="fas fa-envelope"></i> support@agriconnect.in
              </a>
              <a href="#">
                <i className="fas fa-map-marker-alt"></i> New Delhi, India
              </a>
            </div>

            {/* Social Media */}
            <div className="footer-section">
              <h3>Follow Us</h3>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i> Facebook
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i> YouTube
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i> WhatsApp Channel
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="copyright">
            &copy; 2023 AgriConnect. All rights reserved.
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