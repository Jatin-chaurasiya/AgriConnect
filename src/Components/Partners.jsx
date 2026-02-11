import React from 'react';
import image1 from '../assets/images/ministryfarmer.jpg';
import image2 from '../assets/images/nabard.jpeg';
import image3 from '../assets/images/icar.jpeg';
import image4 from '../assets/images/fpo.jpeg';

const Partners = () => {
  const partners = [
    {
      logo: image1,
      name: "Ministry of Agriculture",
      url: "https://www.india.gov.in/",
      description: "Government initiatives and support programs for farmers across India."
    },
    {
      logo: image2,
      name: "NABARD",
      url: "https://www.nabard.org/Hindi/Default.aspx",
      description: "Financial support and banking services tailored for agricultural needs."
    },
    {
      logo: image3,
      name: "ICAR",
      url: "https://icar.org.in/",
      description: "Agricultural research and innovation for improved farming techniques."
    },
    {
      logo:image4,
      name: "FPO Network",
      url: "https://fpoindia.com/index.jsp",
      description: "Farmer Producer Organizations for collective bargaining and marketing."
    }
  ];

  return (
    <>
      <style>{`
        :root {
          --primary: #2D5016;
          --primary-light: #4A7C3A;
          --primary-dark: #1B2D12;
          --secondary: #FFA62B;
        }

        .partners-section {
          padding: 50px 0;
          background-color: #E9F5E3;
        }

        .partners-section .section-title {
          text-align: center;
          color: var(--primary);
          font-size: 28px;
          margin-bottom: 40px;
          position: relative;
        }

        .partners-section .section-title:after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background-color: var(--primary-light);
          border-radius: 2px;
        }

        .partners-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 25px;
        }

        .partner-card {
          background: white;
          border-radius: 12px;
          padding: 25px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
          border: 1px solid transparent;
        }

        .partner-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--primary-light);
        }

        .partner-logo {
          width: 100px;
          height: 100px;
          object-fit: contain;
          margin: 0 auto 15px;
        }

        .partner-name {
          color: var(--primary);
          font-size: 18px;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .partner-desc {
          color: #555555;
          font-size: 14px;
          line-height: 1.5;
        }

        .partner-link {
          color: inherit;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .partners-grid {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .partners-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="partners-section">
        <div className="container">
          <h2 className="section-title">Our Partners</h2>
          <div className="partners-grid">
            {partners.map((partner, index) => (
              <div key={index} className="partner-card">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} Logo`} 
                  className="partner-logo"
                />
                <h4 className="partner-name">
                  <a 
                    href={partner.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="partner-link"
                  >
                    {partner.name}
                  </a>
                </h4>
                <p className="partner-desc">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Partners;