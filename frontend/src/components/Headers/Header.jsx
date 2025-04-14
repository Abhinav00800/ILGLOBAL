import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShip, FaPlane,FaSignInAlt, FaHandshake, FaBars, FaTimes, FaHome, FaLink, FaFileAlt, FaQuestionCircle, FaUsers, FaEnvelope } from "react-icons/fa";
import {
  FaDownload, FaMapMarkerAlt, FaSearch, FaInfoCircle, FaUserPlus, FaUpload
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  const role = localStorage.getItem("role");

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container') && !event.target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    // Handle resize events
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.addEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  // Mobile menu items grouped by category
  const mobileMenuItems = {
    main: [
      { icon: FaHome, path: "/", label: "Home" },
      { icon: FaEnvelope, path: "/inquiry", label: "Contact Us" },
    ],
    resources: [
      { icon: FaLink, path: "/links", label: "Quick Links" },
      { icon: FaFileAlt, path: "/documents", label: "Documents" },
      { icon: FaDownload, path: "/files", label: "Download Files" },
      { icon: FaMapMarkerAlt, path: "/ports", label: "Ports/ICDs/CFS" },
    ],
    services: [
      { icon: FaSearch, path: "/findjobbynumber", label: "Search Container" },
      ...(role === "admin" ? [{ icon: FaUpload, path: "/jobregisterbyexcel", label: "Job Register (Excel)" }] : []),
      ...(role === "admin" ? [{ icon: FaUserPlus, path: "/jobregister", label: "Job Register (Manual)" }] : []),
      ...(role === "admin" ? [{ icon: FaInfoCircle, path: "/findjob", label: "Container Details" }] : []),
    ],
    about: [
      { icon: FaHandshake, path: "/aboutus", label: "Reach US" },
      ...(role === "admin" ? [{ icon: FaUsers, path: "/staff", label: "Our Staff" }] : []),
      { icon: FaQuestionCircle, path: "/faq", label: "FAQs" },
      { icon: FaSignInAlt, path: "/login", label: "Login/Logout" },
    ]
  };

  return (
    <header className="bg-blue-950 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3 z-20">
          <div className="flex items-center rounded-full">
            <img
              src="/IL_logo.png"
              alt="Company Logo"
              className="h-8 w-8 md:h-10 md:w-10 object-contain"
              loading="lazy"
            />
          </div>
          <Link to="/" className="text-xl md:text-2xl font-bold tracking-wide">
            <span className="bg-clip-text text-white truncate">
              IL GLOBAL SHIPPING
            </span>
          </Link>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex text-center justify-center items-center gap-0.5 text-md font-medium cursor-pointer hover:text-cyan-300 transition duration-200">
            <Link to="/">Home</Link>
          </div>

          {/* Resources */}
          <div
            className="relative group"
            onMouseEnter={() => setIsResourcesOpen(true)}
            onMouseLeave={() => setIsResourcesOpen(false)}
          >
            <button className="flex items-center font-medium cursor-pointer hover:text-cyan-300 transition duration-200">
              Resources
              <svg className="w-3 h-3 mt-1 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isResourcesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute  w-64 bg-white text-gray-800 rounded-lg shadow-xl z-50"
              >
                <ul className="py-2">
                  {mobileMenuItems.resources.map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-1 hover:bg-blue-100 hover:text-blue-900 transition duration-150"
                    >
                      <Link
                        to={item.path}
                        className="flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="text-lg" /> {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Service */}
          <div
            className="relative group"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="flex items-center font-medium cursor-pointer hover:text-cyan-300 transition duration-200">
              Services
              <svg className="w-3 h-3 mt-1 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isServicesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute w-64 bg-white text-gray-800 rounded-lg shadow-xl z-50"
              >
                <ul className="py-2">
                  {mobileMenuItems.services.map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-1 hover:bg-blue-100 hover:text-blue-900 transition duration-150"
                    >
                      <Link
                        to={item.path}
                        className="flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="text-lg" /> {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* About us */}
          <div
            className="relative group"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <button className="flex items-center font-medium cursor-pointer hover:text-cyan-300 transition duration-200">
              About Us
              <svg className="w-3 h-3 mt-1 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isAboutOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute w-64 bg-white text-gray-800 rounded-lg shadow-xl z-50"
              >
                <ul className="py-2">
                  {mobileMenuItems.about.map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-1 hover:bg-blue-100 hover:text-blue-900 transition duration-150"
                    >
                      <Link
                        to={item.path}
                        className="flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="text-lg" /> {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          <Link
            to="/inquiry"
            className="flex items-center gap-0.5 ml-6 px-4 py-2 border-2 rounded-full bg-yellow-500 text-blue-950 font-medium cursor-pointer hover:bg-yellow-400 transition duration-200"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none z-20 menu-button"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown - Improved */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-16 bg-blue-950 overflow-y-auto z-10 mobile-menu-container"
          >
            <div className="p-4">
              {/* Search bar for mobile */}
              <div className="mb-6 mt-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-full bg-blue-900 text-white border border-blue-800 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
              </div>

              {/* Contact button for mobile - prominent placement */}
              <Link
                to="/inquiry"
                className="block w-full mb-6 text-center py-3 px-4 bg-yellow-500 text-blue-950 font-semibold rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>

              {/* Main navigation links */}
              <div className="mb-6">
                <h3 className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-2">Main</h3>
                <div className="grid grid-cols-2 gap-2">
                  {mobileMenuItems.main.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`py-3 px-4 flex items-center gap-2 rounded-lg ${isActive(item.path)
                          ? "bg-blue-800 text-cyan-300"
                          : "bg-blue-900 hover:bg-blue-800"
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon /> {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Collapsible sections */}
              {[
                { title: "Resources", items: mobileMenuItems.resources },
                { title: "Services", items: mobileMenuItems.services },
                { title: "About Us", items: mobileMenuItems.about }
              ].map((section, idx) => (
                <div key={idx} className="mb-4">
                  <h3 className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-2">{section.title}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {section.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`py-3 px-4 flex items-center gap-2 rounded-lg ${isActive(item.path)
                            ? "bg-blue-800 text-cyan-300"
                            : "bg-blue-900 hover:bg-blue-800"
                          }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon /> {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Footer in mobile menu */}
              <div className="mt-8 pt-4 border-t border-blue-800 text-center text-sm text-blue-400">
                <p>© 2025 IL Global Shipping</p>
                <p className="mt-2">Customer Support: +1 (234) 567-8901</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;