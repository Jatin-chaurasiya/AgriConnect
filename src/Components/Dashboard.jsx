import React from "react";
import { Link } from "react-router-dom";
import { WiDaySunny } from "react-icons/wi";
import { GiPlantSeed } from "react-icons/gi";
import { HiOutlineBookOpen } from "react-icons/hi";
import { FaLandmark, FaRobot, FaVolumeUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const services = [
    {
      icon: <WiDaySunny size={55} color="#2D7BEA" />,
      title: "Weather Forecast",
      description:
        "Get accurate weather predictions for your region to plan farming activities effectively.",
      link: "/Locationweather",
    },
    {
      icon: <GiPlantSeed size={50} color="#2E7D32" />,
      title: "Crop Recommendation",
      description:
        "AI-powered suggestions for the best crops to grow based on soil and climate conditions.",
      link: "/Croprecommendation",
    },
    {
      icon: <HiOutlineBookOpen size={50} color="#F57C00" />,
      title: "Knowledge Hub",
      description:
        "Access farming techniques, pest control methods, and best practices for various crops.",
      link: "/knowledgehub",
    },
    {
      icon: <FaLandmark size={45} color="#2D7BEA" />,
      title: "Government Schemes",
      description:
        "Stay updated on subsidies, loans, and government programs for farmers.",
      link: "/government-schemes",
    },
    {
      icon: <FaRobot size={45} color="#2E7D32" />,
      title: "Virtual Assistant",
      description:
        "Get instant answers to your farming questions with our AI-powered assistant.",
      link: "/Chat",
    },
  ];

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* HERO */}
      <section className="hero-section text-center text-white py-5">
        <h1 className="fw-bold">Welcome to AgriConnect Farmer Dashboard</h1>
        <p className="lead mt-3">
          Your one-stop platform for modern farming solutions, market access,
          and agricultural knowledge. Empowering farmers across India with
          technology and information.
        </p>
      </section>

      {/* CARDS */}
      <div className="container py-5">
        <h3 className="section-title mb-4">Farmer Services</h3>

        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-md-4" key={index}>
              <Link
                to={service.link}
                className="text-decoration-none text-dark"
              >
                <div
                  className={`service-card p-4 text-center h-100 position-relative 
      ${isActive(service.link) ? "active-card" : ""}`}
                >
                  <button
                    className="speaker-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // 🔥 IMPORTANT
                      speak(`${service.title}. ${service.description}`);
                    }}
                  >
                    <FaVolumeUp />
                  </button>

                  <div className="icon-circle mb-3">{service.icon}</div>

                  <h5 className="service-title">{service.title}</h5>

                  <p className="text-muted">{service.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .hero-section {
          background: linear-gradient(135deg, #2D5016 0%, #4A7C3A 100%);
          border-radius: 0 0 50px 50px;
        }

        .section-title {
          color: #2D5016;
          font-weight: 600;
        }

        .service-card {
          border-radius: 16px;
          background: #ffffff;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.12);
        }

        .icon-circle {
          width: 90px;
          height: 90px;
          background: #EAF4EA;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
        }

        .service-title {
          color: #2D5016;
          font-weight: 600;
          margin-top: 10px;
        }

        .speaker-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #ccc;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
          .active-card {
  border: 2px solid #FFA62B;
  box-shadow: 0 0 0 3px rgba(255, 166, 43, 0.3);
  transform: translateY(-4px);
}


        .speaker-btn:hover {
          background: #f2f2f2;
        }
      `}</style>
    </>
  );
};

export default Dashboard;
