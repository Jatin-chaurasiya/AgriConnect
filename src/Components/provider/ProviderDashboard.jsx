import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaPlusCircle,
  FaTools,
  FaClipboardList,
  FaHistory,
  FaVolumeUp,
} from "react-icons/fa";
import ImageCarousel from "../ImageCarousel";

const ProviderDashboard = () => {
  const services = [
    {
      icon: <FaPlusCircle size={50} color="#2E7D32" />,
      title: "Add Service",
      description:
        "Create and publish new agricultural services for farmers.",
      link: "/provider/add-service",
    },
    {
      icon: <FaTools size={50} color="#2D7BEA" />,
      title: "My Services",
      description:
        "Manage, edit and remove your listed agricultural services.",
      link: "/provider/my-services",
    },
    {
      icon: <FaClipboardList size={48} color="#F57C00" />,
      title: "Booking Requests",
      description:
        "Review and manage incoming service booking requests.",
      link: "/provider/BookingRequest",
    },
    {
      icon: <FaHistory size={48} color="#8E44AD" />,
      title: "Booking History",
      description:
        "Track completed bookings and previous service records.",
      link: "/provider/BookingHistory",
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
     <ImageCarousel />
      {/* Hero Section */}
      <section className="hero-section text-center text-white py-5">
        <h1 className="fw-bold">
          Welcome to AgriConnect Provider Dashboard
        </h1>

        <p className="lead mt-3">
          Manage your agricultural services, receive booking requests,
          monitor booking history, and grow your business by connecting
          with farmers across India.
        </p>
      </section>

      {/* Services */}
      <div className="container py-5">
        <h3 className="section-title mb-4">
          Provider Services
        </h3>

        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <Link
                to={service.link}
                className="text-decoration-none text-dark"
              >
                <div
                  className={`service-card p-4 text-center h-100 position-relative ${
                    isActive(service.link) ? "active-card" : ""
                  }`}
                >
                  <button
                    className="speaker-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      speak(
                        `${service.title}. ${service.description}`
                      );
                    }}
                  >
                    <FaVolumeUp />
                  </button>

                  <div className="icon-circle mb-3">
                    {service.icon}
                  </div>

                  <h5 className="service-title">
                    {service.title}
                  </h5>

                  <p className="text-muted">
                    {service.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-section {
          background: linear-gradient(135deg, #2D5016 0%, #4A7C3A 100%);
          border-radius: 0 0 50px 50px;
        }

        .section-title {
          color: #2D5016;
          font-weight: 600;
          text-align: center;
          font-size: 2.3rem;
        }

        .service-card {
          border-radius: 16px;
          background: #fff;
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
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .speaker-btn:hover {
          background: #f2f2f2;
        }

        .active-card {
          border: 2px solid #FFA62B;
          box-shadow: 0 0 0 3px rgba(255,166,43,0.3);
          transform: translateY(-4px);
        }
      `}</style>
    </>
  );
};

export default ProviderDashboard;