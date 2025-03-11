import React, { useState } from "react";

const documents = [
    {
      category: "AD Code Registration",
      docs: [
        "Request Letter on letterhead",
        "AD Code Letter from Bank",
        "IEC Code Copy",
        "GST Registration Copy",
        "PAN Card Copy",
        "Aadhar Card Copy"
      ]
    },
    {
      category: "Import Export Code (IEC) Application",
      docs: [
        "PAN Card of the company",
        "Aadhar Card of the proprietor/partners/directors",
        "GST Registration Copy",
        "Bank Certificate or Canceled Cheque",
        "Company Incorporation Certificate",
        "MOA & AOA / Partnership Deed (if applicable)",
        "Digital Signature Certificate (DSC)"
      ]
    },
    {
      category: "Bill of Entry (For Imports)",
      docs: [
        "Invoice & Packing List",
        "Bill of Lading / Airway Bill",
        "Importer’s IEC Code Copy",
        "GST Registration Copy",
        "Purchase Order or Letter of Credit",
        "Insurance Certificate (if applicable)",
        "Product-Specific Licenses (if required)"
      ]
    },
    {
      category: "Shipping Bill (For Exports)",
      docs: [
        "Invoice & Packing List",
        "Bill of Lading / Airway Bill",
        "IEC Code Copy",
        "GST Registration Copy",
        "Export Order Copy",
        "Product-Specific Certificates (if required, e.g., FSSAI, DGFT license)"
      ]
    },
    {
      category: "GST Refund / IGST Claim Documents",
      docs: [
        "Shipping Bill Copy",
        "Export Invoice & Packing List",
        "Bank Realization Certificate (BRC)",
        "GST Return Filing Copy (GSTR-1, GSTR-3B)",
        "FIRC Copy (Foreign Inward Remittance Certificate)"
      ]
    },
    {
      category: "Letter of Undertaking (LUT) for Exports (Without IGST Payment)",
      docs: [
        "LUT Form on Letterhead",
        "IEC Code Copy",
        "GST Registration Copy",
        "PAN Card Copy",
        "Aadhar Card Copy",
        "Previous LUT (if applicable)"
      ]
    },
    {
      category: "Registration with Port Authorities (ICEGATE, SEZ, CFS, etc.)",
      docs: [
        "Registration Form on Letterhead",
        "IEC Code Copy",
        "GST Registration Copy",
        "PAN Card Copy",
        "Company Incorporation Certificate",
        "Address Proof of Business"
      ]
    },
    {
      category: "Certificate of Origin (For Export Benefits)",
      docs: [
        "Request Letter on Letterhead",
        "Invoice & Packing List",
        "Bill of Lading / Airway Bill",
        "Product-Specific Certificates (if applicable)"
      ]
    },
    {
      category: "Customs Clearance Process (CHA Requirement)",
      docs: [
        "Invoice & Packing List",
        "Bill of Lading / Airway Bill",
        "IEC Code Copy",
        "GST Registration Copy",
        "PAN Card Copy",
        "Import License (if required)",
        "Insurance Certificate (if applicable)"
      ]
    }
  ];
  

const Documents = () => {
  const [activeTab, setActiveTab] = useState("AD Code Registration");

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 mt-5">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Documents Required</h2>
          <p className="text-gray-900 max-w-2xl mx-auto">
            Below are the list of documents required for various processes
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {documents.map((item) => (
            <button
              key={item.category}
              onClick={() => setActiveTab(item.category)}
              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === item.category
                  ? "bg-blue-600 text-white transform scale-105"
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              {item.category}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {documents.map((item) =>
            item.category === activeTab ? (
              <div key={item.category}>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {item.category} Documents
                </h3>
                <ul className="space-y-3">
                  {item.docs.map((doc, index) => (
                    <li 
                      key={index}
                      className="flex items-center bg-blue-50 p-3 rounded"
                    >
                      <div className="flex-shrink-0 bg-blue-100 h-8 w-8 flex items-center justify-center rounded-full mr-3">
                        <span className="text-blue-600 font-medium">{index + 1}</span>
                      </div>
                      <span className="text-gray-700">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;