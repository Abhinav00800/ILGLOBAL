import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import * as XLSX from "xlsx";
import axios from 'axios';

export default function FindJob() {
    // State for storing job data
    const [jobData, setJobData] = useState([]);
    // State for loading indication
    const [loading, setLoading] = useState(true);
    const [viewjob, setViewjob] = useState(false);
    // State for error handling
    const [error, setError] = useState(null);
    // State for filtered data
    const [filteredData, setFilteredData] = useState([]);
    // States for filters
    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        exporterName: "",
        portOfDestination: "",
        currentStatus: "",
        dateField: "date" // Which date field to filter on: date, date2, forwarding_date, etc.
    });
    // State for sorting
    const [sortConfig, setSortConfig] = useState({
        key: "",
        direction: "ascending"
    });
    const navigate = useNavigate();
    axios.defaults.withCredentials= true;
    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/jobregister/fetchjobregisterdata`
                );

                setJobData(response.data.data);
                setFilteredData(response.data.data);
            } catch (err) {
                setError(`Failed to fetch data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Apply filters
    const applyFilters = () => {
        let result = [...jobData];

        // Filter by date range if both dates are provided
        if (filters.startDate && filters.endDate) {
            const start = new Date(filters.startDate);
            const end = new Date(filters.endDate);

            result = result.filter(job => {
                const jobDate = new Date(job[filters.dateField]);
                return jobDate >= start && jobDate <= end;
            });
        }

        // Filter by exporter name
        if (filters.exporterName) {
            result = result.filter(job =>
                job.exporter_name.toLowerCase().includes(filters.exporterName.toLowerCase())
            );
        }

        // Filter by port of destination
        if (filters.portOfDestination) {
            result = result.filter(job =>
                job.port_of_destination.toLowerCase().includes(filters.portOfDestination.toLowerCase())
            );
        }

        // Filter by current status
        if (filters.currentStatus) {
            result = result.filter(job =>
                job.current_status.toLowerCase() === filters.currentStatus.toLowerCase()
            );
        }

        setFilteredData(result);
    };

    // Reset filters
    const resetFilters = () => {
        setFilters({
            startDate: "",
            endDate: "",
            exporterName: "",
            portOfDestination: "",
            currentStatus: "",
            dateField: "date"
        });
        setFilteredData(jobData);
    };

    // Handle sorting
    const requestSort = (key) => {
        let direction = 'ascending';

        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        setSortConfig({ key, direction });

        const sortedData = [...filteredData].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setFilteredData(sortedData);
    };

    // Handle Excel download
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "JobRegister");

        // Auto-size columns
        const maxWidth = filteredData.reduce((w, r) => Math.max(w, r.exporter_name?.length || 0), 10);
        worksheet["!cols"] = [{ wch: maxWidth }];

        // Generate a download
        XLSX.writeFile(workbook, "JobRegisterData.xlsx");
    };

    // Get unique values for filter dropdown
    const getUniqueValues = (key) => {
        return [...new Set(jobData.map(item => item[key]))].filter(Boolean);
    };

    const HandleEdit = (shipping_bill_number) => {
        navigate("/jobregister", { state: { shipping_bill_number: shipping_bill_number } })
    }

    const HandleView = (shipping_bill_number) => {
        setViewjob(true);
    }


    return (
        <div className="text-center bg-blue-50">

            <div className="mb-6 border-b border-gray-200 pb-4">
                <h1 className="text-4xl font-bold text-blue-900 m-4">Job Register Data</h1>
                <p className="text-gray-700 max-w-2xl mx-auto">View and filter shipping and export details</p>
            </div>

            <div className="max-w-7xl mx-auto p-6 rounded-lg ">
                {/* Filters Section */}
                <div className="bg-gray-50 p-4 rounded-md mb-6 shadow-lg">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Filters</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Date Filter */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Date Field</label>
                            <select
                                name="dateField"
                                value={filters.dateField}
                                onChange={handleFilterChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="date">Invoice Date</option>
                                <option value="date2">Shipping Bill Date</option>
                                <option value="scroll_date">Scroll Date</option>
                                <option value="forwarding_date">Forwarding Date</option>
                                <option value="rail_out_date">Rail Out Date</option>
                                <option value="leo_date">LEO Date</option>
                                <option value="mundra_arrival_date">Mundra Arrival Date</option>
                            </select>

                            <div className="flex space-x-2">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={filters.startDate}
                                        onChange={handleFilterChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={filters.endDate}
                                        onChange={handleFilterChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Exporter and Status Filters */}
                        <div className="space-y-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Exporter Name</label>
                                <input
                                    type="text"
                                    name="exporterName"
                                    value={filters.exporterName}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Search exporter..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Current Status</label>
                                <select
                                    name="currentStatus"
                                    value={filters.currentStatus}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">All Statuses</option>
                                    {getUniqueValues("current_status").map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Port and Action Buttons */}
                        <div className="space-y-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Port of Destination</label>
                                <select
                                    name="portOfDestination"
                                    value={filters.portOfDestination}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">All Ports</option>
                                    {getUniqueValues("port_of_destination").map(port => (
                                        <option key={port} value={port}>{port}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex space-x-2 pt-6">
                                <button
                                    onClick={applyFilters}
                                    className="flex-1 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                                >
                                    Apply Filters
                                </button>
                                <button
                                    onClick={resetFilters}
                                    className="flex-1 border border-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-50"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Summary */}
                <div className="flex justify-between items-center mb-4 ">
                    <div>
                        <span className="text-gray-700">
                            Showing <span className="font-medium">{filteredData.length}</span> of <span className="font-medium">{jobData.length}</span> jobs
                        </span>
                    </div>
                    <div>
                        <button
                            onClick={downloadExcel}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download Excel
                        </button>
                    </div>
                </div>

                {/* Data Table */}
                {loading ? (
                    <div className="text-center py-10">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
                        <p className="mt-2 text-gray-500">Loading data...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                        {error}
                    </div>
                ) : (
                    <div className="overflow-x-auto shadow-lg">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-3 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('exporter_name')}>
                                        Exporter Name
                                        {sortConfig.key === 'exporter_name' && (
                                            <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                                        )}
                                    </th>
                                    <th className="px-3 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('invoice_number')}>
                                        Invoice #
                                        {sortConfig.key === 'invoice_number' && (
                                            <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                                        )}
                                    </th>
                                    <th className="px-3 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('date')}>
                                        Date
                                        {sortConfig.key === 'date' && (
                                            <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                                        )}
                                    </th>
                                    <th className="px-3 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('shipping_bill_number')}>
                                        SB #
                                        {sortConfig.key === 'shipping_bill_number' && (
                                            <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                                        )}
                                    </th>
                                    <th className="px-3 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('port_of_destination')}>
                                        Destination
                                        {sortConfig.key === 'port_of_destination' && (
                                            <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                                        )}
                                    </th>
                                    <th className="px-3 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('fob_value')}>
                                        FOB Value
                                        {sortConfig.key === 'fob_value' && (
                                            <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                                        )}
                                    </th>
                                    <th className="px-3 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('container_number')}>
                                        Container #
                                        {sortConfig.key === 'container_number' && (
                                            <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                                        )}
                                    </th>
                                    <th className="px-3 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('current_status')}>
                                        Status
                                        {sortConfig.key === 'current_status' && (
                                            <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                                        )}
                                    </th>
                                    <th className="px-3 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('current_status')}>
                                        Edit/View
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                                            No job records found matching your criteria
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((job, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-white text-start' : 'bg-gray-50 text-start'}>
                                            <td className="px-3 py-3 text-sm text-gray-900">{job.exporter_name}</td>
                                            <td className="px-3 py-3 text-sm text-gray-900">{job.invoice_number}</td>
                                            <td className="px-3 py-3 text-sm text-gray-900">{new Date(job.date).toLocaleDateString()}</td>
                                            <td className="px-3 py-3 text-sm text-gray-900">{job.shipping_bill_number}</td>
                                            <td className="px-3 py-3 text-sm text-gray-900">{job.port_of_destination}</td>
                                            <td className="px-3 py-3 text-sm text-gray-900">{job.fob_value}</td>
                                            <td className="px-3 py-3 text-sm text-gray-900">{job.container_number}</td>
                                            <td className="px-3 py-3 text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${job.current_status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                        job.current_status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                            job.current_status === 'Pending' ? 'bg-red-100 text-red-800' :
                                                                'bg-blue-100 text-blue-800'}`}>
                                                    {job.current_status}
                                                </span>
                                            </td>
                                            <td className="px-3 py-3 text-md flex gap-4 cursor-pointer">
                                                <FaEdit onClick={() => HandleEdit(job.shipping_bill_number)} />
                                                <FaEye onClick={() => HandleView(job.shipping_bill_number)} />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        {viewjob && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                    <h2 className="text-xl font-semibold mb-4">Popup Title</h2>
                                    <p className="text-gray-600">This is a simple pop-up content.</p>
                                    <button
                                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        onClick={() => setViewjob(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )
                        }
                    </div>
                )}
            </div>
        </div>
    );
}