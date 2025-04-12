import React, { useState } from 'react';
import { FaCross, FaDownload, FaMinus, FaPlus } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

function Files() {
    const [open, setOpen] = useState(false);
    const Download = [
        { label: "E-seling/self seling documents", path: "downloadfiles/CustomNotification.pdf" },
        { label: "Appendix+4RE RODTEP EOU", path: "downloadfiles/Appendix4RERODTEPEOU.pdf" },
        { label: "RODTEP NEW 4R", path: "downloadfiles/RODTEPNEW.pdf" },
        { label: "New DBK Circular", path: "downloadfiles/NewDBKcircular.pdf" },
        { label: "List of KYC Documents", path: "downloadfiles/KYC.docx" },
        { label: "Form A Blank (Word)", path: "downloadfiles/FormA.doc" },
    ];

    const ClearanceDocs = [
        { label: "DBK DECLARATION (Word)", path: "downloadfiles/DBKDECLARATION.docx" },
        { label: "Declaration", path: "downloadfiles/declaration.pdf" },
        { label: "Value Declaration", path: "downloadfiles/ValueDeclaration.pdf" },
        { label: "Import Docs Empty", path: "downloadfiles/ImportDocsEmpty.pdf" },
    ]

    const handleDownload = (path, label) => {
        const link = document.createElement("a");
        link.href = path;
        link.setAttribute("download", label);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen p-8 flex flex-col items-center">
            <div className="max-w-4xl w-full text-center">
                <h1 className="text-4xl font-bold text-blue-900 mb-4">Download Documents</h1>
                <p className="text-gray-900 text-md max-w-2xl mx-auto mb-6">
                    Self Sealing/e-seal circular along with details of documents required for e-sealing Permission.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
  {Download.map((item, index) => (
    <button
      key={index}
      onClick={() => handleDownload(item.path, item.label)}
      className="flex items-center justify-between gap-2 p-4 border border-blue-900 bg-white rounded-lg shadow-md text-blue-900 font-medium hover:bg-blue-900 hover:text-white transition-all duration-300 w-full min-h-[80px]"
    >
      <span className="truncate w-full text-left">{item.label}</span>
      <FaDownload className="text-lg" />
    </button>
  ))}

  {/* Clearance Documents Dropdown */}
  <div className="relative w-full">
    <div
      onClick={() => setOpen(!open)}
      className="flex items-center justify-between gap-2 p-4 border border-blue-900 bg-white rounded-lg shadow-md text-blue-900 font-medium hover:bg-blue-900 hover:text-white transition-all duration-300 w-full min-h-[80px] cursor-pointer"
    >
      <span className="truncate w-full text-left">Clearance Documents</span>
      {open ? <FaXmark/> :<FaPlus className="text-lg" />}
    </div>

    {open && (
      <div className="absolute z-10 mt-2 bg-white border border-blue-900 rounded-lg shadow-lg w-full">
        {ClearanceDocs.map((item, index) => (
          <button
            key={index}
            onClick={() => handleDownload(item.path, item.label)}
            className="flex items-center justify-between gap-2 p-4 border-b last:border-b-0 border-blue-100 text-blue-900 font-medium hover:bg-blue-900 hover:text-white transition-all duration-300 w-full"
          >
            <span className="truncate w-full text-left">{item.label}</span>
            <FaDownload className="text-lg" />
          </button>
        ))}
      </div>
    )}
  </div>
</div>

            </div>
        </div>
    );
}

export default Files;