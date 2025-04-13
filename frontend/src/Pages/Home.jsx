import React from 'react';
import ImageSlider from '../components/Imageslider';
import { FaShip, FaBox, FaPlane, FaAnchor, FaGlobe, FaHeadset, FaFileAlt, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';
import { MdSecurity, MdLocalShipping, MdSpeed } from 'react-icons/md';
import ShipOnWaves from '../components/Shipwave';

function Home() {
    // Testimonial Data
    const testimonials = [
        { name: "Mr. Rakesh Singh", company: "Global Exports Ltd.", feedback: "IL Global made our international shipping process seamless. Their expertise saved us time and money!" },
        { name: "Dr. Deepak Kumar", company: "Pharma Logistics", feedback: "Their 24/7 support is a game-changer! We had an urgent issue at customs, and IL Global resolved it within hours." },
        { name: "Mr. Amritpal Singh", company: "Textile Imports", feedback: "Highly professional and efficient. Their knowledge of duty exemptions helped us cut costs significantly." },
        { name: "Mr. Amit Sharma", company: "Tech Solutions", feedback: "The best brokerage service we've used! IL Global's real-time tracking and compliance expertise are unmatched." }
    ];

    // Key stats
    const stats = [
        { number: "25+", label: "Years Experience in industry" },
        { number: "100%", label: "On-Time Service" },
        { number: "24/7", label: "Customer Support" },
        { number: "11+", label: "Years Experience in custom clearance" },
    ];

    // Services data
    const services = [
        {
            icon: <FaShip size={28} />,
            title: "Sea Freight Customs",
            description: "Expert clearance for maritime shipments with complete documentation and regulatory compliance."
        },
        {
            icon: <FaPlane size={28} />,
            title: "Air Freight Customs",
            description: "Expedited processing for time-sensitive air cargo with specialized documentation."
        },
        {
            icon: <FaFileAlt size={28} />,
            title: "Documentation Services",
            description: "Comprehensive management of all shipping documents including Bill of Entry and HS coding."
        },
        {
            icon: <MdSecurity size={28} />,
            title: "Compliance Management",
            description: "Ensuring adherence to international trade laws and regulations for smooth operations."
        },
        {
            icon: <FaAnchor size={28} />,
            title: "Specialized Cargo",
            description: "Handling of hazardous, perishable, and oversized cargo through sea and air routes."
        },
        {
            icon: <MdSpeed size={28} />,
            title: "Express Clearance",
            description: "Fast-track customs solutions for urgent shipments with time-sensitive delivery needs."
        }
    ];

    return (
        <div className="font-sans text-gray-800 bg-gradient-to-r from-blue-50 to-blue-100">
            {/* Hero Section - Modern with Animated Wave Background */}
            <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
                {/* Animated Wave Patterns */}
                <div className="absolute inset-0 opacity-20">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                    >
                        <path
                            fill="#ffffff"
                            fillOpacity="1"
                            d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>

                <div className="container mx-auto px-6 py-20 relative">
                    {/* Main Flex Container (Fixed) */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        {/* Left Text Section */}
                        <div className="lg:w-1/2 text-white -z-0">
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
                            Your Trusted Partner in Hassle-Free Customs Clearance.
                            </h1>
                            <p className="text-xl text-blue-100 mb-8 max-w-lg">
                                Premier customs clearance and shipping solutions for air and sea freight, delivering efficiency and compliance at every port.
                            </p>
                        </div>

                        {/* Right Image Section (Now Inside Flex) */}
                        <div className="hidden md:block lg:w-1/2 mt-10 lg:mt-0">
                            <div className="relative">
                                <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl"></div>
                                <img
                                    src="https://www.savinodelbene.com/wp-content/uploads/2023/10/ocean-freight-shipping.png"
                                    alt="Global Shipping Services"
                                    className="relative z-10 rounded-2xl shadow-2xl w-full object-cover h-96"
                                />
                                <div className="absolute -bottom-4 -right-4 p-4 bg-white rounded-lg shadow-xl z-20">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-2 rounded-full">
                                            <FaAnchor className="text-blue-600 text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Trusted By</p>
                                            <p className="font-bold text-blue-800">500+ Global Businesses</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Stats Section */}
            <section className="py-12 ">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center p-6 border-r last:border-r-0 border-gray-200">
                                <div className="text-4xl md:text-5xl font-bold text-blue-700 mb-2">{stat.number}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section with Modern Design */}
            <section className="py-20">
    <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Image Section */}
            <div className="relative max-w-xs md:max-w-sm lg:max-w-md w-full mx-auto">
                <img
                    src="sanjeev.jpg"
                    alt="Sanjeev Sharma, Managing Director"
                    className="rounded-2xl shadow-xl w-full h-auto object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-500 text-white p-2 rounded-full">
                            <FaShip className="text-xl" />
                        </div>
                        <div>
                            <p className="font-semibold">25+ Years</p>
                            <p className="text-sm text-gray-500">Industry Experience</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-7/12">
                <div className="mb-6">
                    <h2 className="text-blue-600 font-bold mb-1 uppercase tracking-wider text-sm">
                        About Our Leadership
                    </h2>
                    <h3 className="text-4xl font-bold text-gray-900 mb-6">Sanjeev Sharma</h3>
                    <p className="text-xl font-semibold text-blue-800 mb-2">
                        Managing Director, IL GLOBAL SHIPPING
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className="px-3 py-1 bg-blue-200 text-blue-700 rounded-full text-sm font-semibold">
                            Custom Broker
                        </span>
                        <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">
                            Logistics Expert
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                            MBA Finance
                        </span>
                    </div>
                </div>

                <p className="text-gray-700 mb-4">
                    At IL Global, we specialize in custom clearance services, ensuring smooth and hassle-free import/export operations. Our expertise in Custom House Agent Service, Custom Clearance Of Import & Export Consignments Including Handling And Executing Customs Documentation, Inland Clearance and more, allows businesses to navigate the complexities of global trade with confidence.
                </p>
                <p className="text-gray-700 mb-6">
                    Established in 2014, IL Global Shipping is headquartered in Ludhiana, Punjab. With over a decade of experience, we provide end-to-end solutions that reduce delays, optimize costs, and ensure your cargo reaches its destination efficiently through both air and sea channels.
                </p>

                {/* Service List */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <FaShip className="text-blue-600 text-xl" />
                        <span className="font-medium">Sea Transport</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <FaPlane className="text-blue-600 text-xl" />
                        <span className="font-medium">Air Transport</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <MdLocalShipping className="text-blue-600 text-xl" />
                        <span className="font-medium">Inland Transit</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


            {/* Services Section with Card Grid */}
            <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-800 text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-blue-300 font-bold mb-2 uppercase tracking-wider text-sm">Our Expertise</h2>
                        <h3 className="text-4xl font-bold mb-6">Comprehensive Shipping & Customs Solutions</h3>
                        <p className="text-blue-100 text-lg">
                            Delivering excellence in international logistics through air and sea, backed by expert customs handling and regulatory compliance.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all border border-white/10 group">
                                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                                <p className="text-blue-200">{service.description}</p>
                                <a href="#" className="inline-flex items-center mt-6 text-cyan-300 hover:text-cyan-200 transition-colors font-medium">
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Projects/Clients Section */}
            <section className="hidden md:block py-20 bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-blue-600 font-bold mb-2 uppercase tracking-wider text-sm">Our Operation</h2>
                        <h3 className="text-4xl font-bold text-blue-900 mb-6">Global Logistics In Action</h3>
                        <p className="text-blue-600 text-lg">
                            See how we navigate international waters and skies to bring your cargo safely to its destination.
                        </p>
                    </div>


                    <div className="aspect-w-16 aspect-h-9 relative">
                        <ImageSlider />
                    </div>

                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-blue-600 font-bold mb-2 uppercase tracking-wider text-sm">Client Testimonials</h2>
                        <h3 className="text-4xl font-bold text-blue-900 mb-6">What Our Clients Say</h3>
                        <p className="text-blue-600 text-lg">
                            Don't just take our word for it – here's what our satisfied clients have to say about our services.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-1">
                                <div className="relative h-full rounded-lg bg-gradient-to-br from-blue-50 to-white p-6 overflow-hidden">
                                    <div className="absolute top-4 left-4 text-blue-200">
                                        <FaQuoteLeft size={40} />
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-gray-700 italic mb-6 pt-6">{testimonial.feedback}</p>
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 text-blue-700 font-bold w-10 h-10 rounded-full flex items-center justify-center">
                                                {testimonial.name.charAt(0)}
                                            </div>
                                            <div className="ml-3">
                                                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                                <p className="text-blue-600 text-sm">{testimonial.company}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
                        {/* <ShipOnWaves/> */}
        </div>
    );
}

export default Home;