import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from 'axios';
import { Search, Printer, ClipboardCheck, FileText } from "lucide-react";

export default function FindJobByNumber() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  axios.defaults.withCredentials = true;
  
  const justDate = (isoDate) => new Date(isoDate).toISOString().split("T")[0];

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.warning("Please enter a Shipping Bill Number");
      return;
    }
  
    setLoading(true);
    setError(null);
    setResult(null);
  
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/jobregister/fetchdatabyshippingno/${query}`
      );
  
      let data = response.data?.data || null;
  
      if (data) {
        // Convert all date-like fields using justDate
        Object.keys(data).forEach((key) => {
          if (typeof data[key] === "string" && /^\d{4}-\d{2}-\d{2}T/.test(data[key])) {
            data[key] = justDate(data[key]);
          }
        });
      }
  
      setResult(data);
  
      if (!data) {
        toast.info("No records found for this shipping bill number");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 404) {
        toast.error("Enter correct Shipping Bill Number");
      } else {
        setError("Error fetching data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handlePrint = () => {
    window.print();
  };

  const formatFieldName = (name) => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Shipping Bill Lookup</h1>
          <p className="text-gray-600 mt-2">View detailed container and shipment information</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter Shipping Bill Number"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center transition-colors duration-200"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
      </div>
      
      {result && (
        <div className="bg-white rounded-lg shadow-md p-6 print:shadow-none">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FileText className="mr-2 text-blue-600" />
              Shipping Details
            </h2>
            <div className="flex space-x-2">
              <button 
                onClick={handlePrint}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md flex items-center transition-colors duration-200"
              >
                <Printer size={18} className="mr-1" />
                Print
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-md p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Invoice Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-blue-100 pb-1">
                    <span className="font-medium text-gray-700">Invoice Number:</span>
                    <span className="text-gray-900">{result.invoice_number || "Expected Soon"}</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-100 pb-1">
                    <span className="font-medium text-gray-700">Date:</span>
                    <span className="text-gray-900">{result.date || "Expected Soon"}</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-100 pb-1">
                    <span className="font-medium text-gray-700">Shipping Bill No:</span>
                    <span className="text-gray-900 font-semibold">{result.shipping_bill_number || "Expected Soon"}</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-100 pb-1">
                    <span className="font-medium text-gray-700">FOB Value:</span>
                    <span className="text-gray-900">{result.fob_value || "Expected Soon"}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-md p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Container Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-green-100 pb-1">
                    <span className="font-medium text-gray-700">Container Number:</span>
                    <span className="text-gray-900">{result.container_number || "Expected Soon"}</span>
                  </div>
                  <div className="flex justify-between border-b border-green-100 pb-1">
                    <span className="font-medium text-gray-700">Size:</span>
                    <span className="text-gray-900">{result.size || "Expected Soon"}</span>
                  </div>
                  <div className="flex justify-between border-b border-green-100 pb-1">
                    <span className="font-medium text-gray-700">Custom Seal:</span>
                    <span className="text-gray-900">{result.custom_seal || "Expected Soon"}</span>
                  </div>
                  <div className="flex justify-between border-b border-green-100 pb-1">
                    <span className="font-medium text-gray-700">H Over:</span>
                    <span className="text-gray-900">{result.h_over || "Expected Soon"}</span>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 rounded-md p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Important Dates</h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-green-100 pb-1">
                    <span className="font-medium text-gray-700">Forwarding date:</span>
                    <span className="text-gray-900">{result.forwarding_date || "Expected Soon"}</span>
                  </div>
                  <div className="flex justify-between border-b border-green-100 pb-1">
                    <span className="font-medium text-gray-700">Rail out date:</span>
                    <span className="text-gray-900">{result.rail_out_date || "Expected Soon"}</span>
                  </div>
                  <div className="flex justify-between border-b border-green-100 pb-1">
                    <span className="font-medium text-gray-700">Port arrival date:</span>
                    <span className="text-gray-900">{result.mundra_arrival_date || "Expected Soon"}</span>
                  </div>
                  <div className="flex justify-between border-b border-green-100 pb-1">
                    <span className="font-medium text-gray-700">Scroll no & date:</span>
                    <span className="text-gray-900">{result.scroll_date || "Expected Soon"}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-purple-50 rounded-md p-4">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">Shipping Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-blue-100 pb-1">
                    <span className="font-medium text-gray-700">Exporter Name:</span>
                    <span className="text-gray-900">{result.exporter_name || "Expected Soon"}</span>
                  </div>
                  <div className="flex justify-between border-b border-purple-100 pb-1">
                    <span className="font-medium text-gray-700">Port of Destination:</span>
                    <span className="text-gray-900">{result.port_of_destination || "Expected Soon"}</span>
                  </div>
                  <div className="flex justify-between border-b border-purple-100 pb-1">
                    <span className="font-medium text-gray-700">Scheme:</span>
                    <span className="text-gray-900">{result.scheme || "Expected Soon"}</span>
                  </div>
                  <div className="flex justify-between border-b border-purple-100 pb-1">
                    <span className="font-medium text-gray-700">DBK DEPB:</span>
                    <span className="text-gray-900">{result.dbk_depb || "Expected Soon"}</span>
                  </div>
                  <div className="flex justify-between border-b border-purple-100 pb-1">
                    <span className="font-medium text-gray-700">Location:</span>
                    <span className="text-gray-900">{result.location || "Expected Soon"}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 rounded-md p-4">
                <h3 className="text-lg font-semibold text-amber-800 mb-3">Package Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-amber-100 pb-1">
                    <span className="font-medium text-gray-700">No of Packages:</span>
                    <span className="text-gray-900">{result.no_of_pakages || "Expected Soon"}</span>
                  </div>
                  <div className="flex justify-between border-b border-amber-100 pb-1">
                    <span className="font-medium text-gray-700">Net Weight:</span>
                    <span className="text-gray-900">{result.net_weight || "Expected Soon"}</span>
                  </div>
                  <div className="flex justify-between border-b border-amber-100 pb-1">
                    <span className="font-medium text-gray-700">Gross Weight:</span>
                    <span className="text-gray-900">{result.gross_weight || "Expected Soon"}</span>
                  </div>
                  <div className="flex justify-between border-b border-amber-100 pb-1">
                    <span className="font-medium text-gray-700">Current status:</span>
                    <span className="text-gray-900">{result.current_status || "Expected Soon"}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-100 rounded-md p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="font-medium text-gray-700">EDI Job:</span>
                    <span className="text-gray-900">{result.edi_job || "Expected Soon"}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="font-medium text-gray-700">LEO Date:</span>
                    <span className="text-gray-900">{result.leo_date || "Expected Soon"}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="font-medium text-gray-700">Remarks:</span>
                    <span className="text-gray-900">{result.remarks || "Expected Soon"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500 print:hidden">
            <p>This information was retrieved from the database based on the shipping bill number you provided.</p>
          </div>
        </div>
      )}
    </div>
  );
}