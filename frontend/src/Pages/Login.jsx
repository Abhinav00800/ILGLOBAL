import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!formData?.email || !formData?.password) {
        alert("Please fill in all fields");
        return;
      }
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
  
      console.log("Response:", data);
      alert("Login successful");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Error in Login");
    }
  };
  

  return (
    <div className='bg-blue-50'>
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
            className="w-full p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?
          <Link to="/signup" className="text-blue-500 hover:underline ml-1">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login
