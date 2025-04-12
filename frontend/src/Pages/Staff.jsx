import React from 'react'
import { FaLinkedin, FaInstagram, FaPhone, FaHeadphones,FaEnvelope, FaMusic, FaCode } from "react-icons/fa";

const Staffmember = ({ name, position, linkedin, instagram, phone, pic, email  }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col w-80 border-l-4 border-blue-600 relative">
        {/* Header section with name and role */}
       
          {/* Profile image */}
          
          {/* <div className=' flex justify-center items-center'>
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-blue-300">
              <img
                src={pic}
                alt={name}
                className="w-full h-full object-cover"
                />
            </div>  
            </div> */}
          
          {/* Name and title */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-blue-900">{name}</h2>
            <h3 className="text-sm text-indigo-700">{position}</h3>
            
          </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-blue-500 to-blue-300 my-3"></div>
      
        
        {/* Contact information */}
        <div className="bg-blue-50 rounded-md p-3 mb-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Contact Info</h4>
          <div className="flex items-center mb-2">
            <FaPhone className="text-blue-500 mr-2 text-xs" />
            <span className="text-xs text-gray-700">{phone}</span>
          </div>
          {/* <div className="flex items-center">
            <FaEnvelope className="text-blue-500 mr-2 text-xs" />
            <span className="text-xs text-gray-700">{email}</span>
          </div> */}
        </div>

      </div>
    );
  };




function Staff() {


    const teamMembers = [
        {
          name: "Deepak Kumar",
          position: "G CARD",
          phone: "+91 01615190327",
          pic: "/abhinav.jpg",
        },
        {
          name: "Mandeep Singh",
          position: "H CARD",
          phone: "+91 9855530327",
          pic: "/abhinav.jpg",
        },
        {
          name: "Navjot Singh",
          position: "Asstt Manager Documentation",
          phone: "+91 8198090264",
          pic: "/abhinav.jpg",
        },
        {
          name: "Sanpreet Singh",
          position: "H CARD",
          phone: "+91 7973136403",
          pic: "/abhinav.jpg",
        },
        {
          name: "Amritpal Singh",
          position: "Executive",
          phone: "+91 8725030327",
          pic: "/abhinav.jpg",
        },
        {
          name: "Harwinder Singh",
          position: "H CARD",
          phone: "01615190327",
          pic: "/abhinav.jpg",
        },
        {
          name: "Avnish Yadav",
          position: "H CARD",
          phone: "01615190327",
          pic: "/abhinav.jpg",
        },
        {
          name: "Akash Kumar",
          position: "H CARD",
          phone: "01615190327",
          pic: "/abhinav.jpg",
        },
        
      ];


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">

    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">

        <h1 className="text-4xl font-bold text-blue-900 mb-3">Our Staff</h1>


        <p className="text-lg max-w-2xl mx-auto text-indigo-800">
        Meet our dedicated staff who bring expertise, professionalism, and unwavering commitment to ensuring seamless customs clearance and logistics solutions for our clients worldwide. 🚢✨
        </p>
      </div>

      <div className="flex flex-wrap gap-8 justify-center">
        {teamMembers.map((member, index) => (
          <Staffmember key={index} {...member} />
        ))}
      </div>

      
    </div>
  </div>
  )
}

export default Staff
