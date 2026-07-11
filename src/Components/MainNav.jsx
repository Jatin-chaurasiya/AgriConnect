import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const MainNav = () => {
  const location = useLocation();
  const navRef = useRef(null);
  const { t } = useTranslation();
  const { user } = useContext(AppContext);
  const role = user?.role || "FARMER";

  useEffect(() => {
    // Restore scroll position after navigation
    const savedScroll = sessionStorage.getItem("leafNavScroll");
    if (savedScroll && navRef.current) {
      navRef.current.scrollLeft = parseInt(savedScroll, 10);
    }
  }, []);

  const handleNavClick = () => {
    if (navRef.current) {
      sessionStorage.setItem("leafNavScroll", navRef.current.scrollLeft);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const farmerNav = [
    {
      path: "/",
      icon: "fa-home",
      translationKey: "navbar.dashboard",
    },
    {
      path: "/Locationweather",
      icon: "fa-cloud-sun",
      translationKey: "navbar.weather",
    },
    {
      path: "/Croprecommendation",
      icon: "fa-robot",
      translationKey: "navbar.cropRecommendation",
    },
    {
      path: "/knowledgehub",
      icon: "fa-book",
      translationKey: "navbar.knowledgeHub",
    },
    {
      path: "/BookService",
      icon: "fa-comments",
      translationKey: "navbar.bookService",
    },
    {
      path: "/MyBooking",
      icon: "fa-comments",
      translationKey: "navbar.mybooking",
    },
    {
      path: "/GovernmentSchemes",
      icon: "fa-landmark",
      translationKey: "navbar.governmentSchemes",
    },
    {
      path: "/VirtualAssistant",
      icon: "fa-comments",
      translationKey: "navbar.virtualAssistant",
    },
  ];

  const providerNav = [
    {
      path: "/provider/dashboard",
      icon: "fa-home",
      translationKey: "Dashboard",
    },
    {
      path: "/provider/add-service",
      icon: "fa-plus-circle",
      translationKey: "Add Service",
    },
    {
      path: "/provider/BookingRequest",
      icon: "fa-calendar-check",
      translationKey: "Booking Request",
    },
    {
      path: "/provider/BookingHistory",
      icon: "fa-calendar-check",
      translationKey: "Booking History",
    },
  ];

  const adminNav = [
    {
      path: "/admin/dashboard",
      icon: "fa-home",
      translationKey: "Dashboard",
    },
    {
      path: "/admin/providers",
      icon: "fa-user-check",
      translationKey: "Providers",
    },
    {
      path: "/admin/users",
      icon: "fa-users",
      translationKey: "Users",
    },
    {
      path: "/admin/services",
      icon: "fa-cogs",
      translationKey: "Services",
    },
  ];

  let navItems;

  switch (role) {
    case "PROVIDER":
      navItems = providerNav;
      break;

    case "ADMIN":
      navItems = adminNav;
      break;

    default:
      navItems = farmerNav;
  }

  return (
    <>
      <nav>
        <div className="leaf-nav-container bg-success bg-opacity-10">
          <div className="leaf-nav" ref={navRef}>
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`leaf-nav-item ${
                  isActive(item.path) ? "active" : ""
                }`}
                onClick={handleNavClick}
              >
                <i className={`fas ${item.icon}`}></i>
                {t(item.translationKey)}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <style>{`
        /* Leaf nav styles */
        .leaf-nav-container {
          margin: 0px 0 40px;
        }

        .leaf-nav {
          display: flex;
          overflow-x: auto;
          padding: 15px 5px;
          scroll-behavior: smooth;
        }

        .leaf-nav::-webkit-scrollbar {
          height: 6px;
        }

        .leaf-nav::-webkit-scrollbar-track {
          background: #1B2D12;
          border-radius: 10px;
        }

        .leaf-nav::-webkit-scrollbar-thumb {
          background: #4A7C3A;
          border-radius: 10px;
        }

        .leaf-nav-item {
          flex: 0 0 auto;
          background: linear-gradient(to bottom, #2D5016, #1B2D12);
          color: white;
          padding: 12px 25px;
          margin: 0 8px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 1px solid #3A612D;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          white-space: nowrap;
          cursor: pointer;
        }

        .leaf-nav-item i {
          margin-right: 8px;
          color: #FFA62B;
        }

        .leaf-nav-item:hover {
          background: linear-gradient(to bottom, #4A7C3A, #2D5016);
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.3);
        }

        .leaf-nav-item.active {
          background: linear-gradient(to right, #FFA62B, #FF9A02);
          color: #1B2D12;
          font-weight: 600;
        }

        .leaf-nav-item.active i {
          color: #1B2D12;
        }

        .nav-controls {
          display: flex;
          justify-content: center;
          margin-top: 15px;
        }

        .nav-btn {
          background: #2D5016;
          border: 1px solid #3A612D;
          color: #FFA62B;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          background: #4A7C3A;
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
};

export default MainNav;
