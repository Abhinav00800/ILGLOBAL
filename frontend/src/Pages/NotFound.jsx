
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-400 to-blue-600 text-white p-6">
      <div className="relative">
        {/* Airplane */}
        <div className="absolute -top-16 -left-20 transform rotate-12">
          <div className="text-white text-6xl">✈️</div>
        </div>
        
        {/* Ship */}
        <div className="absolute -bottom-16 -right-20">
          <div className="text-white text-6xl">🚢</div>
        </div>
        
        {/* Main content */}
        <div className="bg-blue-400 bg-opacity-20 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-white border-opacity-25">
          <h1 className="text-6xl font-bold mb-2">404</h1>
          <div className="w-16 h-1 bg-white mx-auto my-4 rounded-full"></div>
          <h2 className="text-3xl font-light mb-6">Page Lost at Sea</h2>
          <p className="text-lg mb-8">Looks like this page has drifted away or flown too far.</p>
          <Link to="/" className="bg-white text-blue-600 hover:bg-blue-100 font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105">
            Return to Shore
          </Link>
        </div>
      </div>
      
      {/* Wave animation at bottom */}
      <div className="w-full absolute bottom-0 left-0">
        <div className="h-16 bg-blue-700 opacity-30 rounded-t-full"></div>
        <div className="h-12 bg-blue-800 opacity-40 -mt-6 rounded-t-full"></div>
      </div>
    </div>
  );
}

export default NotFound;