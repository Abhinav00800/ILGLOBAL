import React from 'react';
import { FaShip, FaPlane, FaExternalLinkAlt,FaLink } from 'react-icons/fa';

const LinkCard = ({ name, address, index }) => {
  const Icon = index % 2 === 0 ? FaShip : FaPlane;
  
  const bgColor = "bg-gradient-to-br from-sky-100 to-sky-200"
  const borderColor = "border-sky-500";
  
  return (
    <div className={`rounded-lg shadow-md ${bgColor} border-2 ${borderColor} transition-transform duration-300 hover:scale-105 hover:shadow-lg`}>
      <div className="p-5">
        <div className="flex items-center mb-3">
          <Icon className={`text-xl mr-2 ${index % 2 === 0 ? "text-blue-600" : "text-sky-600"}`} />
          <h3 className="font-bold text-lg">{name}</h3>
        </div>
        
        <button
          onClick={() => window.open(address, "_blank")}
          className={`cursor-pointer mt-2 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-blue-900 hover:bg-blue-700
            text-white transition-colors duration-200`}
        >
          <span>Visit</span>
          <FaExternalLinkAlt className="text-sm" />
        </button>
      </div>
    </div>
  );
};

function UsefulLinks() {
  const links = [
    {
      name: "ICE Gate (new) Website",
      address: "https://www.icegate.gov.in/",
    },
    {
      name: "ICE Gate (old) Website",
      address: "https://old.icegate.gov.in/index.html",
    },
    {
      name: "DGFT Website",
      address: "https://www.dgft.gov.in/CP/",
    },
    {
      name: "Custom duty calculator",
      address: "https://old.icegate.gov.in/Webappl/",
    },
    {
      name: "View exchange rate",
      address: "https://foservices.icegate.gov.in/#/services/viewExchangeRate",
    },
    {
      name: "Shipping bill/ bill of entry",
      address: "https://enquiry.icegate.gov.in/",
    },
  ];

  return (
    <div className="p-4  bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      <div className='flex  mt-10 mb-3 justify-center items-center gap-3'>
      <FaLink className='text-blue-900 text-4xl text-center  ' />
      <h2 className="text-4xl font-bold text-center  text-blue-900">Transport & Customs Resources</h2>
      </div>
      <h3 className='text-xl font-semibold text-center mb-10'>👉 Tap "Visit" to explore the website!</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link, index) => (
          <LinkCard key={index} name={link.name} address={link.address} index={index} />
        ))}
      </div>
    </div>
  );
}

export default UsefulLinks;