import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MainNav = () => {
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    // Restore scroll position after navigation
    const savedScroll = sessionStorage.getItem('leafNavScroll');
    if (savedScroll && navRef.current) {
      navRef.current.scrollLeft = parseInt(savedScroll, 10);
    }
  }, []);

  const handleNavClick = () => {
    // Save scroll position
    if (navRef.current) {
      sessionStorage.setItem('leafNavScroll', navRef.current.scrollLeft);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', icon: 'fa-cloud-sun', label: 'Dashboard' },
    { path: '/Locationweather', icon: 'fa-cloud-sun', label: 'Weather & Climate' },
    { path: '/Croprecommendation', icon: 'fa-robot', label: 'AI Crop Recommendation' },
    { path: '/knowledgehub', icon: 'fa-book', label: 'Knowledge Hub' },
    { path: '/GovernmentSchemes', icon: 'fa-seedling', label: 'Government Schemes' },
    { path: '/VirtualAssistant', icon: 'fa-seedling', label: 'Virtual Assistant' }
  ];

  return (
    <>
      <nav>
        <div className="leaf-nav-container bg-success bg-opacity-10">
          <div className="leaf-nav" ref={navRef}>
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`leaf-nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                <i className={`fas ${item.icon}`}></i> {item.label}
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