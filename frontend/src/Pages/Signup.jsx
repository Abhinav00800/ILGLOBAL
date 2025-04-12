import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/signup/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log("Response:", data);
            alert("Signup successfull");
        } catch (error) {
            console.log(error);
            alert("Error in signup");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-50">
            <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
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
                        Sign Up
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Already have an account?
                    <Link to="/login" className="text-blue-500 hover:underline ml-1">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup
