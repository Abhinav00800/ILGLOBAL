import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  axios.defaults.withCredentials= true;

  const HandleLogout=async (e) => {
    e.preventDefault();
  
    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/logout/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const role=response.data.role
      localStorage.removeItem("role");
      console.log("Response:", response.data);
      toast.success("Logout Successful");
      navigate('/');
    } catch (error) {
      console.error("Error:", error);
      const message =
        error.response?.data?.message || error.message || "Error in Ḷogout";
        toast.error("Oops! Something went wrong.",message);
    }
  
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!formData?.email || !formData?.password) {
      alert("Please fill in all fields");
      return;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/login/`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const role=response.data.role
    localStorage.setItem("role",role);
    console.log("Response:", response.data);
    toast.success("Login successful");
    navigate('/');
  } catch (error) {
    console.error("Error:", error);
    const message =
      error.response?.data?.message || error.message || "Error in Login";
      toast.error("Oops! Something went wrong.",message);
  }

};

  

  return (
    <div className='bg-blue-50'>
       <ToastContainer position="top-right" autoClose={3000} />
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition cursor-pointer"
          >
            Login
          </button>
        </form>
        <div className='flex justify-center items-center'>
        <button onClick={HandleLogout} className='border-2 bg-red-600 border-red-600 rounded-2xl p-2 m-2 mt-10 text-white text-center cursor-pointer flex justify-center'>Logout Now</button>
        </div>
        {/* <p className="text-center mt-4 text-gray-600">
          Don't have an account?
          <Link to="/signup" className="text-blue-500 hover:underline ml-1">
            Sign Up
          </Link>
        </p> */}
      </div>
    </div>
    </div>
  );
};

export default Login
