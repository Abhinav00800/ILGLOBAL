import React, { useState,useEffect } from "react";
import { FaEnvelope, FaUser, FaCommentAlt, FaPaperPlane } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Inquiry = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .send(
                import.meta.env.VITE_SERVICE_ID,
                import.meta.env.VITE_TEMPLATE_ID,
                formData,
                import.meta.env.VITE_PUBLIC_KEY
            )
            .then(
                (response) => {
                    toast.success("Mail sent! We'll get back to you soon.", {
                        autoClose: 10000,
                    });
                    setFormData({ name: "", email: "", message: "" });
                },
                (error) => {
                    toast.error("Something went wrong. Please try again.", {
                        autoClose: 10000,
                    });
                }
            );
    };

    // useEffect(() => {
    //     toast.success("Mail sent! We'll get back to you soon.");
    // }, []);


    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
            <div className="flex-grow">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-blue-900 mb-3 mt-10">
                        👉 Interested in partnering with us? Contact us today!
                    </h2>
                    <p className="text-xl font-semibold text-black mb-10">
                        We're always listening! 🙏🏻 Reach out with any questions or just say hello 👋🏻.
                    </p>

                    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-purple-100">
                        <form onSubmit={sendEmail}>
                            <div className="mb-5">
                                <label
                                    htmlFor="name"
                                    className="flex items-center text-sm font-medium text-blue-900 mb-2"
                                >
                                    <FaUser className="mr-2 text-blue-900" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-purple-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all duration-300"
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="email"
                                    className="flex items-center text-sm font-medium text-blue-900 mb-2"
                                >
                                    <FaEnvelope className="mr-2 text-blue-900" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-purple-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all duration-300"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="message"
                                    className="flex items-center text-sm font-medium text-blue-900 mb-2"
                                >
                                    <FaCommentAlt className="mr-2 text-blue-900" />
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full p-3 border border-purple-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all duration-300"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button
                                type="submit"
                                className="cursor-pointer w-full py-3 px-4 bg-gradient-to-r from-blue-800 to-blue-900 text-white font-semibold rounded-md hover:from-purple-800 hover:to-indigo-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                                <span>Send Message</span>
                                <FaPaperPlane className="text-sm animate-bounce" />
                            </button>
                        </form>
                    </div>

                    <div className="my-12 flex justify-center">
                        <div className="flex items-center space-x-3 text-blue-900">
                            <p className="text-sm">We typically respond within an hour</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Container for displaying notifications */}
            <ToastContainer />
        </div>
    );
};

export default Inquiry;
