import { useState } from "react";
import Header from "./components/Headers/Header";
import { BrowserRouter as Router, Routes, Route, Links } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home";
import FAQTestimonials from "./Pages/Faq"
import Staff from "./Pages/Staff";
import UsefullLinks from "./Pages/UsefullLinks";
import Inquiry from "./Pages/Inquiry";
import Documents from "./Pages/Documents"


function App() {
  return (
    <div className="h-screen">
      <Router>
        <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faq" element={<FAQTestimonials/>} />
            <Route path="/links" element={<UsefullLinks/>} />
            <Route path="/staff" element={<Staff/>} />
            <Route path="/inquiry" element={<Inquiry/>} />
            <Route path="/documents" element={<Documents/>} />
          </Routes>
   

        <Footer />
      </Router>
    </div>
  );
}

export default App;
