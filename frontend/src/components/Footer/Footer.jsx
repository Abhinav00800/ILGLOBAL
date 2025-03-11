import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">IL Global Shipping</h2>
            <p className="text-gray-400">
              Reliable and secure global shipping solutions. Your cargo, our responsibility.
            </p>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Our Services</h2>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/inquiry" className="hover:text-white">Sea Freight Customs</Link></li>
              <li><Link to="/inquiry" className="hover:text-white">Air Freight Customs</Link></li>
              <li><Link to="/inquiry" className="hover:text-white">Documentation Services</Link></li>
              <li><Link to="/inquiry" className="hover:text-white">Customs Clearance</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/links" className="hover:text-white">Usefull Links</Link></li>
              <li><Link to="/inquiry" className="hover:text-white">Inquiry</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-400">📍 Room No. 225, Office No. C-205, Phase V, Focal Point, Ludhiana, Punjab, 141010, India</p>
            <p className="text-gray-400">📞 +91 9814830327</p>
            <p className="text-gray-400">📧 sanjeev@ilgshipping.com</p>

            {/* Social Media Links */}
            <div className="flex gap-4 mt-4">
              <a href="https://www.facebook.com/p/IL-Global-Shipping-100065422992853/?locale=cx_PH" className="text-gray-400 hover:text-white">
                <FaFacebookF size={18} />
              </a>
              <a href="https://www.linkedin.com/in/sanjeev-kumar-64888827/" className="text-gray-400 hover:text-white">
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} IL Global Shipping. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
