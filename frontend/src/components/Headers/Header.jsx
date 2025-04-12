import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShip, FaPlane, FaBars, FaTimes, FaHome, FaLink, FaFileAlt, FaQuestionCircle, FaUsers, FaEnvelope, FaPlus, FaUserPlus } from "react-icons/fa";
import { FaRightToBracket } from "react-icons/fa6";
import { motion } from "framer-motion";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
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
            <span className=" bg-clip-text text-white">
              IL GLOBAL SHIPPING
            </span>
          </Link>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex text-center justify-center items-center gap-0.5 text-md font-medium cursor-pointer hover:text-cyan-300">
            {/* <FaHome /> */}
            <Link to="/">Home </Link>
          </div>


              {/* Resources  */}
          <div
            className="relative group"
            onMouseEnter={() => setIsResourcesOpen(true)}
            onMouseLeave={() => setIsResourcesOpen(false)}
          >
            <button className="flex items-center font-medium cursor-pointer hover:text-cyan-300">
              Resources
              <svg className="w-3 h-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isResourcesOpen && (
              <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute mt-0 w-64 bg-white text-gray-800 rounded-lg shadow-xl z-50 "
            >
              <ul className="py-2">
                {[
                    {
                      name: "Quick Links", path: "/links", icon:FaLink
                    },
                    {
                      name: "Documents", path: "/documents", icon:FaFileAlt
                    },
                    {
                      name: "Downloads", path: "/files", icon:FaFileAlt
                    },
                    {
                      name: "Ports/ICDs/CFS", path: "/ports", icon:FaFileAlt
                    },
                  ].map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-1 rounded-2xl  hover:bg-blue-100 hover:text-blue-900 transition duration-150 cursor-pointer"
                  >
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 "
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                    {/* <item.icon className="text-lg right-0"/> */}
                     {item.name}
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
            <button className="flex items-center font-medium cursor-pointer hover:text-cyan-300">
              Services
              <svg className="w-3 h-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isServicesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute mt-0 w-64 bg-white text-gray-800 rounded-lg shadow-xl z-50 "
              >
                <ul className="py-2">
                  {[
                    {
                      name: "Search Container",path:"/findjobbynumber", icon:FaLink
                    },
                    {
                      name: "Job Register (upload excel)",path:"/jobregisterbyexcel", icon:FaFileAlt
                    },
                    {
                      name: "Job Register (add manually)",path:"/jobregister", icon:FaFileAlt
                    },
                    {
                      name: "Container Details",path:"/findjob", icon:FaFileAlt
                    },
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-1 rounded-2xl  hover:bg-blue-100 hover:text-blue-900 transition duration-150 cursor-pointer"
                    >
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 "
                          }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                      {/* <item.icon className="text-lg right-0"/> */}
                       {item.name}
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
            <button className="flex items-center font-medium cursor-pointer hover:text-cyan-300">
              About Us
              <svg className="w-3 h-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isAboutOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute mt-0 w-64 bg-white text-gray-800 rounded-lg shadow-xl z-50 "
              >
                <ul className="py-2">
                  {[
                    {
                      name: "Company's Info",path:"/findjobbynumber", icon:FaLink
                    },
                    {
                      name: "Our Staff",path:"/staff", icon:FaFileAlt
                    },
                    {
                      name: "FAQs",path:"/faq", icon:FaFileAlt
                    },
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-1 rounded-2xl  hover:bg-blue-100 hover:text-blue-900 transition duration-150 cursor-pointer"
                    >
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 "
                          }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                      {/* <item.icon className="text-lg right-0"/> */}
                       {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
          <button className="flex items-center gap-0.5 ml-12 p-1 border-2 rounded-2xl bg-yellow-500 font-medium cursor-pointer ">
            {/* <FaHome /> */}  
            <Link to="/inquiry">Contact US </Link>
          </button>

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
              { icon: FaFileAlt, path: "/files", label: "Download Files" },
              { icon: FaFileAlt, path: "/ports", label: "Ports/ICD's/CFS" },
              { icon: FaFileAlt, path: "/jobregister", label: "Job register" },
              { icon: FaFileAlt, path: "/findjobbynumber", label: "Search container" },
              { icon: FaFileAlt, path: "/findjob", label: "Admin search container" },
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
