import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function JobregisterByexcel() {
  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(jsonData);
    };
    reader.readAsBinaryString(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setExcelData(null);
  };

  const handleUpload = () => {
    if (!file || !excelData) {
      toast.error("Please select a file first.");
      return;
    }
    setShowConfirmation(true);
  };

  axios.defaults.withCredentials= true;
  const confirmUpload = async () => {
    setIsLoading(true);
    setShowConfirmation(false);
    
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/jobregister/uploadjobregisterdata`, excelData);
      toast.success("Data uploaded successfully");
      setFile(null);
      setExcelData(null);
    } catch (err) {
      toast.error("Oops! Something went wrong." + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">JOB Register</h1>
          <p className="text-gray-600 mt-2">Upload your Excel file with job register data</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-all">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-10 h-10 mb-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="mb-2 text-sm text-gray-700">
                  <span className="font-semibold">Click to select Excel file</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">XLSX or XLS files only</p>
              </div>
              <input 
                type="file"
                accept=".xlsx, .xls"
                className="hidden"
                onChange={handleFileSelect}
                disabled={isLoading}
              />
            </label>
          </div>
        </div>

        {file && (
          <div className="mb-6 bg-blue-50 p-4 rounded-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium text-gray-900">Selected File:</h3>
                <p className="text-gray-700">{file.name}</p>
              </div>
              <button
                onClick={handleRemoveFile}
                className="px-3 py-1 text-sm text-red-600 bg-red-100 rounded hover:bg-red-200 transition-colors"
                disabled={isLoading}
              >
                Remove
              </button>
            </div>

            {excelData && excelData.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium text-gray-900 mb-2">Data Preview:</h3>
                <div className="overflow-x-auto shadow-sm rounded-md">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        {Object.keys(excelData[0]).map((key) => (
                          <th key={key} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {excelData.slice(0, 3).map((row, index) => (
                        <tr key={index}>
                          {Object.values(row).map((value, i) => (
                            <td key={i} className="px-4 py-2 text-sm text-gray-700 border-b">
                              {String(value)}
                            </td>
                          ))}
                        </tr>
                      ))}
                      {excelData.length > 3 && (
                        <tr>
                          <td colSpan={Object.keys(excelData[0]).length} className="px-4 py-2 text-sm text-gray-500 text-center">
                            ... {excelData.length - 3} more rows not shown
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleUpload}
            disabled={!file || isLoading}
            className={`px-6 py-3 rounded-md text-white font-medium 
              ${(!file || isLoading) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
              transition-colors flex items-center`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Upload Job Register Data'
            )}
          </button>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-blue-50 bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Confirm Upload</h3>
              <p className="mb-6">Are you sure you want to upload this file? This action cannot be undone.</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmUpload}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Confirm Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobregisterByexcel;