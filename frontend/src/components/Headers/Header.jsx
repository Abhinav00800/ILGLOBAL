import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShip, FaPlane, FaBars, FaTimes, FaHome, FaLink, FaFileAlt, FaQuestionCircle, FaUsers, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-blue-950 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center   rounded-full">
            {/* <FaShip size={28} className="text-cyan-300" />
            <FaPlane size={24} className="text-sky-300 -ml-1 mt-1 transform rotate-45" /> */}
            <img
              src="/IL_logo.png"
              alt="Company Logo"
              className="h-10 w-10 object-contain"
              loading="lazy"
            />
          </div>
          <Link to="/" className="text-2xl font-bold tracking-wide">
            <span className="bg-gradient-to-r from-cyan-300 to-sky-300 bg-clip-text text-transparent">
              IL GLOBAL SHIPPING
            </span>
          </Link>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { icon: FaHome, path: "/", label: "Home" },
            { icon: FaLink, path: "/links", label: "Quick Links" },
            { icon: FaFileAlt, path: "/documents", label: "Documents" },
            { icon: FaQuestionCircle, path: "/faq", label: "FAQ's" },
            { icon: FaUsers, path: "/staff", label: "Staff" },
            { icon: FaEnvelope, path: "/inquiry", label: "Contact Us" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-3 py-2 rounded-4xl transition duration-300 hover:bg-blue-200 hover:text-blue-900 hover:bg-opacity-10 ${isActive(item.path) ? "font-medium" : ""
                }`}
            >
              <div className="flex justify-center items-center gap-1">
                <item.icon className="text-lg" /> {item.label}
              </div>
              {isActive(item.path) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-300 rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 pb-4 px-6">
          <nav className="flex flex-col gap-3">
            {[
              { icon: FaHome, path: "/", label: "Home" },
              { icon: FaLink, path: "/links", label: "Quick Links" },
              { icon: FaFileAlt, path: "/documents", label: "Documents" },
              { icon: FaQuestionCircle, path: "/faq", label: "FAQ's" },
              { icon: FaUsers, path: "/staff", label: "Staff" },
              { icon: FaEnvelope, path: "/inquiry", label: "Contact Us" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`py-2 ${isActive(item.path) ? "text-cyan-300 font-medium" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex justify-center items-center gap-1">
                  <item.icon className="text-lg" /> {item.label}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
