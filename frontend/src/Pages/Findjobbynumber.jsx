import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from 'axios';

export default function Findjobbynumber() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  axios.defaults.withCredentials= true;
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
  
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/jobregister/fetchdatabyshippingno/${query}`
      );
  
      setResult(response.data?.data || null);
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

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="mb-6 border-b border-gray-200 pb-4 text-center">
        <h1 className="text-4xl font-bold text-blue-900 m-4">Shipping Bill Lookup</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">View your container details by shipping bill number</p>
      </div>
      <input
        type="text"
        placeholder="Enter Shipping Bill Number"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded-md"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && (
        <div className="mt-6 p-4 border rounded-md shadow-md">
          <h3 className="text-xl font-semibold mb-2">Container Details</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(result).map(([key, value]) => (
              <div key={key} className="border-b py-1">
                <span className="font-medium capitalize">{key.replace(/_/g, " ")}: </span>
                {value}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
