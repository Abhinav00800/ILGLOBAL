import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaShip, FaPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function AboutUS() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-cyan-50 min-h-screen py-12 px-4 md:px-8 lg:px-20">
      {/* Header Section with Theme Elements */}
      <div className="max-w-5xl mx-auto mb-12 text-center relative">
        <div className="absolute left-0 top-0 text-blue-200 opacity-20 transform -translate-y-1/4">
          <FaShip size={64} />
        </div>
        <div className="absolute right-0 top-0 text-cyan-200 opacity-20 transform -translate-y-1/4 rotate-45">
          <FaPlane size={48} />
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">Reach Us</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6 rounded-full"></div>
        <p className="mb-6 text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
          Connect with IL Global Shipping for all your international logistics needs.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Information Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex-1 transform transition-transform hover:scale-102 border-t-4 border-blue-600">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6 flex items-center">
              <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <FaEnvelope className="text-blue-600" />
              </span>
              Contact Details
            </h2>
            
            <div className="space-y-5 text-gray-700">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-blue-600 mt-1 mr-3 flex-shrink-0" size={20} />
                <p>Room No. 225, Office No. C-205, Phase V, Focal Point, Ludhiana, Punjab, 141010, India</p>
              </div>
              
              <div className="flex items-center">
                <FaPhone className="text-blue-600 mr-3 flex-shrink-0" size={18} />
                <a href="tel:+919814830327" className="text-blue-700 hover:text-blue-500 transition-colors font-medium">
                  +91 9814830327
                </a>
              </div>
              
              <div className="flex items-center">
                <FaEnvelope className="text-blue-600 mr-3 flex-shrink-0" size={18} />
                <a href="mailto:sanjeev@ilgshipping.com" className="text-blue-700 hover:text-blue-500 transition-colors font-medium">
                  sanjeev@ilgshipping.com
                </a>
              </div>
              
              <div className="flex items-center">
                <FaLinkedin className="text-blue-600 mr-3 flex-shrink-0" size={18} />
                <a 
                  href="https://www.linkedin.com/in/sanjeev-kumar-64888827/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-700 hover:text-blue-500 transition-colors font-medium"
                >
                  Sanjeev Kumar
                </a>
              </div>
            </div>
            
            {/* Operating Hours */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Operating Hours</h3>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-2 text-gray-700">
                <div className="flex justify-between">
                  <div>Monday-Saturday:</div>
                  <div className="font-medium"> 9:00 AM - 6:00 PM</div>
                </div>
                <div className="flex justify-between">
                  <span>Sunday & Second Saturday:</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="mt-8">
              <Link to="/inquiry"
                className="block w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors"
              >
                Send Us a Message
              </Link>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg p-2 md:p-4 h-full border-t-4 border-cyan-500">
              <div className="w-full h-full min-h-64">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.3125395171755!2d75.91971466104938!3d30.87791672796738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a9d072c3c3b61%3A0x943e8d4a40c3e5a1!2sOverseas%20Complex%2C%20C-205%2C%20Phase%20V%2C%20Focal%20Point%2C%20Ludhiana!5e0!3m2!1sen!2sin!4v1744531433267!5m2!1sen!2sin" 
                  className="w-full h-full min-h-64 rounded-lg"
                  style={{ border: 0 }}
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-600">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-lg">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">Global Logistics Solutions</h2>
              <p className="text-gray-700">
                IL Global Shipping specializes in international freight forwarding, 
                offering comprehensive logistics solutions by air and sea. Reach out to our team 
                for efficient cargo handling, customs clearance, and worldwide shipping services.
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                  <FaShip className="text-blue-600" size={28} />
                </div>
                <p className="text-blue-800 font-medium">Sea Freight</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-2">
                  <FaPlane className="text-cyan-600" size={28} />
                </div>
                <p className="text-cyan-800 font-medium">Air Freight</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUS;