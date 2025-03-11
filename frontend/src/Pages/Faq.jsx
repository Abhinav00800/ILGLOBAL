import React, { useState } from "react";
import { FaQuoteLeft, FaChevronDown, FaQuestionCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// FAQ Data
const faqs = [
  { question: "What is a customs broker, and why do I need one?", answer: "A customs broker helps businesses clear imports and exports through customs, ensuring compliance while reducing delays and penalties." },
  { question: "What documents are required for customs clearance?", answer: "Common documents include Bill of Entry, Shipping Bill, Commercial Invoice, Packing List, and Certificate of Origin." },
  { question: "How long does customs clearance take?", answer: "Clearance time depends on the type of goods and regulations, but we work to ensure quick processing, usually within 24-72 hours." },
  { question: "Do you provide import duty calculation services?", answer: "Yes, we assist in tariff classification, duty calculation, and exemptions, ensuring you don't overpay." },
  { question: "Can you help with restricted or hazardous goods?", answer: "Absolutely! We handle special permits, compliance checks, and customs clearance for hazardous, restricted, and perishable items." },
  { question: "What happens if my shipment is delayed at customs?", answer: "We quickly identify the cause, communicate with customs, and provide solutions to expedite clearance." },
  { question: "Do you provide real-time shipment tracking?", answer: "Yes! We offer real-time tracking so you can monitor your cargo's status at every stage." },
  { question: "Do you offer global customs clearance?", answer: "Yes, we provide multi-country clearance services, ensuring smooth international trade operations." }
];



const FAQTestimonials = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  // Categories for filtering FAQs
  const categories = {
    all: "All Questions",
    process: "Process & Timing",
    services: "Our Services",
    documents: "Documentation"
  };

  // Map FAQs to categories
  const categorizedFaqs = {
    process: [0, 2, 5, 6],
    services: [3, 4, 7],
    documents: [1]
  };

  const filteredFaqs = activeCategory === "all" 
    ? faqs 
    : faqs.filter((_, index) => categorizedFaqs[activeCategory].includes(index));

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto px-6 py-16">
        
        {/* FAQ Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get quick answers to common questions about our customs brokerage services
          </p>
        </div>
        
        {/* FAQ Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === key
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-blue-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-16">
          {filteredFaqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border-b border-gray-100 last:border-b-0 ${
                openFAQ === index ? "bg-blue-50" : ""
              }`}
            >
              <button
                className="w-full flex justify-between items-center text-left px-6 py-4 focus:outline-none cursor-pointer"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                aria-expanded={openFAQ === index}
              >
                <span className="text-lg font-medium text-gray-800 pr-8">{faq.question}</span>
                <div className={`flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 transition-transform duration-300 ${
                  openFAQ === index ? "rotate-180" : ""
                }`}>
                  <FaChevronDown className="text-blue-600 text-sm" />
                </div>
              </button>
              
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-2 text-gray-600 border-l-4 border-blue-400 ml-6 mb-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        </div>
    </div>
  );
};

export default FAQTestimonials;