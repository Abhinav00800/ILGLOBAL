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
import Ports from "./Pages/Ports";
import Files from "./Pages/Files";
import Jobregister from "./Pages/Jobregister";
import FindJob from "./Pages/Findjob";
import Findjobbynumber from "./Pages/Findjobbynumber";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import JobregisterByexcel from "./Pages/JobregisterByexcel";
import AboutUS from "./Pages/AboutUS";
import NotFound from "./Pages/NotFound";

function App() {
  const role = localStorage.getItem("role");
  return (
    <div className="h-screen">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQTestimonials />} />
          <Route path="/links" element={<UsefullLinks />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/ports" element={<Ports />} />
          <Route path="/files" element={<Files />} />
          <Route path="/findjobbynumber" element={<Findjobbynumber />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/aboutus" element={<AboutUS />} />
          <Route path="*" element={<NotFound />} />

          {/* Admin-only routes */}
          {role === "admin" && <Route path="/jobregister" element={<Jobregister />} />}
          {role === "admin" && <Route path="/findjob" element={<FindJob />} />}
          {role === "admin" && <Route path="/jobregisterbyexcel" element={<JobregisterByexcel />} />}
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
