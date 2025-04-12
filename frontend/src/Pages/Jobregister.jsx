import { useState, useEffect } from "react";
import { data, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function JobRegister() {
    const location = useLocation();
    const [formData, setFormData] = useState({
        // Exporter Details
        exporter_name: "",
        invoice_number: "",
        date: "",

        // Shipping Details
        shipping_bill_number: "",
        date2: "",
        port_of_destination: "",
        fob_value: "",

        // Container Details
        container_number: "",
        size: "",
        custom_seal: "",
        h_over: "",

        // Scheme Details
        scheme: "",
        dbk_depb: "",
        location: "",

        // Status and Weight
        current_status: "",
        scroll_date: "",
        no_of_pakages: "",
        net_weight: "",
        gross_weight: "",

        // Dates
        forwarding_date: "",
        rail_out_date: "",
        edi_job: "",
        leo_date: "",
        mundra_arrival_date: "",

        // Additional Info
        remarks: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        console.log(location.state);
        if (location.state) {
            fetch(`${import.meta.env.VITE_API_URL}/jobregister/fetchdatabyshippingno/${location.state.shipping_bill_number}`)
                .then((response) => response.json())
                .then((json) => setFormData(json.data))
                .catch((error) => console.error("Error fetching data:", error));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/jobregister/uploadjobregisterdata`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log("Response:", data);
            toast.success("Success! Data saved.");
        } catch (error) {
            toast.error("Oops! Something went wrong.");
        }
    };

    // Simple reset function
    const handleReset = () => {
        const emptyData = Object.keys(formData).reduce((acc, key) => {
            acc[key] = "";
            return acc;
        }, {});
        setFormData(emptyData);
    };

    return (
        <div className="bg-blue-50 m-3">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="mb-6 border-b border-gray-200 pb-4 text-center">
                <h1 className="text-4xl font-bold text-blue-900 mb-4">JOB Register Form</h1>
                <p className="text-gray-700 max-w-2xl mx-auto">Enter shipping and export details for job registration</p>
            </div>
            <div className="max-w-4xl mx-auto p-6  bg-blue-100 rounded-2xl shadow-lg">


                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Exporter Information Section */}
                    <div className="bg-gray-50 p-4 rounded-md">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Exporter Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label htmlFor="exporter_name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Exporter/Company Name
                                </label>
                                <input
                                    type="text"
                                    id="exporter_name"
                                    name="exporter_name"
                                    value={formData.exporter_name}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="invoice_number" className="block text-sm font-medium text-gray-700 mb-1">
                                    Invoice Number<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="invoice_number"
                                    name="invoice_number"
                                    value={formData.invoice_number}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                                    Invoice Date
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Shipping Details Section */}
                    <div className="bg-gray-50 p-4 rounded-md">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Shipping Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label htmlFor="shipping_bill_number" className="block text-sm font-medium text-gray-700 mb-1">
                                    Shipping Bill Number<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="shipping_bill_number"
                                    name="shipping_bill_number"
                                    value={formData.shipping_bill_number}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="date2" className="block text-sm font-medium text-gray-700 mb-1">
                                    Shipping Bill Date
                                </label>
                                <input
                                    type="date"
                                    id="date2"
                                    name="date2"
                                    value={formData.date2}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="port_of_destination" className="block text-sm font-medium text-gray-700 mb-1">
                                    Port of Destination
                                </label>
                                <input
                                    type="text"
                                    id="port_of_destination"
                                    name="port_of_destination"
                                    value={formData.port_of_destination}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="fob_value" className="block text-sm font-medium text-gray-700 mb-1">
                                    FOB Value
                                </label>
                                <input
                                    type="text"
                                    id="fob_value"
                                    name="fob_value"
                                    value={formData.fob_value}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Container Details Section */}
                    <div className="bg-gray-50 p-4 rounded-md">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Container Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label htmlFor="container_number" className="block text-sm font-medium text-gray-700 mb-1">
                                    Container Number
                                </label>
                                <input
                                    type="text"
                                    id="container_number"
                                    name="container_number"
                                    value={formData.container_number}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                                    Container Size
                                </label>
                                <input
                                    type="text"
                                    id="size"
                                    name="size"
                                    value={formData.size}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="custom_seal" className="block text-sm font-medium text-gray-700 mb-1">
                                    Custom Seal
                                </label>
                                <input
                                    type="text"
                                    id="custom_seal"
                                    name="custom_seal"
                                    value={formData.custom_seal}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="h_over" className="block text-sm font-medium text-gray-700 mb-1">
                                    H/Over
                                </label>
                                <input
                                    type="text"
                                    id="h_over"
                                    name="h_over"
                                    value={formData.h_over}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Scheme and Status Section */}
                    <div className="bg-gray-50 p-4 rounded-md">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Scheme & Location</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label htmlFor="scheme" className="block text-sm font-medium text-gray-700 mb-1">
                                    Scheme
                                </label>
                                <input
                                    type="text"
                                    id="scheme"
                                    name="scheme"
                                    value={formData.scheme}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="dbk_depb" className="block text-sm font-medium text-gray-700 mb-1">
                                    DBK & DEPB Amount
                                </label>
                                <input
                                    type="text"
                                    id="dbk_depb"
                                    name="dbk_depb"
                                    value={formData.dbk_depb}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="current_status" className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Status
                                </label>
                                <input
                                    type="text"
                                    id="current_status"
                                    name="current_status"
                                    value={formData.current_status}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Package and Weight Section */}
                    <div className="bg-gray-50 p-4 rounded-md">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Package & Weight Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label htmlFor="no_of_pakages" className="block text-sm font-medium text-gray-700 mb-1">
                                    Number of Packages
                                </label>
                                <input
                                    type="text"
                                    id="no_of_pakages"
                                    name="no_of_pakages"
                                    value={formData.no_of_pakages}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="net_weight" className="block text-sm font-medium text-gray-700 mb-1">
                                    Net Weight
                                </label>
                                <input
                                    type="text"
                                    id="net_weight"
                                    name="net_weight"
                                    value={formData.net_weight}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="gross_weight" className="block text-sm font-medium text-gray-700 mb-1">
                                    Gross Weight
                                </label>
                                <input
                                    type="text"
                                    id="gross_weight"
                                    name="gross_weight"
                                    value={formData.gross_weight}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="scroll_date" className="block text-sm font-medium text-gray-700 mb-1">
                                    Scroll no. & Date
                                </label>
                                <input
                                    type="date"
                                    id="scroll_date"
                                    name="scroll_date"
                                    value={formData.scroll_date}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Important Dates Section */}
                    <div className="bg-gray-50 p-4 rounded-md">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Important Dates</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label htmlFor="forwarding_date" className="block text-sm font-medium text-gray-700 mb-1">
                                    Forwarding Date
                                </label>
                                <input
                                    type="date"
                                    id="forwarding_date"
                                    name="forwarding_date"
                                    value={formData.forwarding_date}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="rail_out_date" className="block text-sm font-medium text-gray-700 mb-1">
                                    Rail Out Date
                                </label>
                                <input
                                    type="date"
                                    id="rail_out_date"
                                    name="rail_out_date"
                                    value={formData.rail_out_date}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="edi_job" className="block text-sm font-medium text-gray-700 mb-1">
                                    EDI Job
                                </label>
                                <input
                                    type="text"
                                    id="edi_job"
                                    name="edi_job"
                                    value={formData.edi_job}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="leo_date" className="block text-sm font-medium text-gray-700 mb-1">
                                    LEO Date
                                </label>
                                <input
                                    type="date"
                                    id="leo_date"
                                    name="leo_date"
                                    value={formData.leo_date}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="mundra_arrival_date" className="block text-sm font-medium text-gray-700 mb-1">
                                    Mundra Arrival Date
                                </label>
                                <input
                                    type="date"
                                    id="mundra_arrival_date"
                                    name="mundra_arrival_date"
                                    value={formData.mundra_arrival_date}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Remarks Section */}
                    <div className="bg-gray-50 p-4 rounded-md">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Additional Information</h2>
                        <div>
                            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">
                                Remarks
                            </label>
                            <textarea
                                id="remarks"
                                name="remarks"
                                rows="3"
                                value={formData.remarks}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            ></textarea>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Update Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}