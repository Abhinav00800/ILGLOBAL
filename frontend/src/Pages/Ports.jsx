import React, { useState } from 'react';
import { MapPin, Ship, Plane, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

function Ports() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const ports = [
    {
      id:1,
      name: "ICD Container Corporation of India Ltd",
      location: "Dhandari Kalan Ludhiana",
      maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.3556679554895!2d75.9098667!3d30.876709899999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a9d14276bc0db%3A0x4a46b0767dddb155!2sContainer%20Corporation%20Of%20India%20Ltd!5e0!3m2!1sen!2sin!4v1743413225200!5m2!1sen!2sin",
    },
    {
      id:2,
      name: "ICD Gateway Distriparks Limited",
      location: "G.T.Road Sahnewal Ludhiana-141120",
      maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3426.065776825063!2d75.98672979999999!3d30.828823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3910766dfd6b5805%3A0x7d8280a79d4893aa!2sGateway%20Rail%20freight%20limited(GRFL)%20ICD!5e0!3m2!1sen!2sin!4v1743413660275!5m2!1sen!2sin",
    },
    {
      id:3,
      name: "ICD Pristine Mega Logistics Park Pvt. Ltd",
      location: "Chawapayal Ludhiana-141412",
      maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3428.5309975923233!2d76.1344539!3d30.759673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39100c5f23f78417%3A0x239edd78212f63dd!2sPristine%20Mega%20Logistics%20Park%20Ltd!5e0!3m2!1sen!2sin!4v1743413698712!5m2!1sen!2sin",
    },
    {
      id:4,
      name: "ICD HIND TERMINALS PVT. LTD",
      location: "Kila Raipur , Ludhiana 141118",
      maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.402716848289!2d75.8324375!3d30.735187500000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39107b5591cd5233%3A0xba673539c2102885!2sHind%20Terminals%20Private%20Limited!5e0!3m2!1sen!2sin!4v1743413742246!5m2!1sen!2sin",
    },
    {
      id:5,
      name: " ICD Adani Multimodal Logistics Park",
      location: "Kila Raipur",
      maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3428.8901069220346!2d75.82814619999999!3d30.749588199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39107be043d7ecdf%3A0xcd4e0997e8fc5293!2sAdani%20Logistics%20Park%2C%20Kila%20Raipur!5e0!3m2!1sen!2sin!4v1743413801034!5m2!1sen!2sin",
    },
    {
      id:6,
      name: "CFS Punjab State Warehousing corporation",
      location: "",
      maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.294565256576!2d75.92175927558611!3d30.87841967451433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a9d9baaaaaaab%3A0x71a3dd8ac54603c8!2sPunjab%20State%20Warehousing%20Corporation!5e0!3m2!1sen!2sin!4v1743413881290!5m2!1sen!2sin",
    },
    {
      id:7,
      name: "CFS Overseas Warehousing Pvt.Ltd",
      location: "Ramgarh Ludhiana",
      maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.2772133380645!2d75.92090259999999!3d30.878905200000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a9d3fb9051863%3A0xc6336894b2001548!2sOverseas%20Warehousing%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1743413923854!5m2!1sen!2sin",
    },
  ]

  return (
    <div className="bg-blue-50 min-h-screen p-4 md:p-8">
    {/* Header with animated elements */}
    <div className="max-w-5xl mx-auto relative">
      {/* Animated ship and plane */}
      <div className="absolute top-4 left-4 animate-bounce">
        <Ship className="text-blue-800" size={36} />
      </div>
      <div className="absolute top-4 right-4 animate-pulse">
        <Plane className="text-blue-800" size={36} />
      </div>
      
      <div className="text-center mb-12 mt-5">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Clearance Ports/ICD's/CFS in Ludhiana
        </h1>
        <p className="text-blue-700 max-w-2xl mx-auto">
          Explore the major Clearance Ports/ICD's/CFS in Ludhiana in Ludhiana.
        </p>
      </div>

      {/* Port cards */}
      <div className="grid grid-cols-1 gap-8 mb-12">
        {ports.map((port) => (
          <div 
            key={port.id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden   border-2 border-blue-600 hover:shadow-xl transition-all duration-300"
          >
            <div 
              className="flex items-center justify-between p-4 cursor-pointer bg-white"
              onClick={() => toggleExpand(port.id)}
            >
              <div className="items-center">
                <h2 className="text-2xl font-bold text-blue-800">{port.name}</h2>
                <div className="flex items-center mb-2">
                  <MapPin className="text-red-500 mr-2" size={20} />
                  <p className="text-gray-700">{port.location}</p>
                </div>
              </div>
              {expandedId === port.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
            
            {expandedId === port.id && (
              <div className="p-4">
                
                
                
                <div className="h-64 overflow-hidden rounded-lg shadow-inner mb-4">
                  <iframe
                    title={`Google Map - ${port.name}`}
                    className="w-full h-full border-0"
                    src={port.maps}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
               
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  </div>

  )
}

export default Ports
