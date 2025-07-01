import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Spline from "@splinetool/react-spline";
import { Link, useLocation } from "react-router-dom";
import { FaMapMarkerAlt, FaGlobe, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const NAV_SECTIONS = [
  { id: "home", label: "Home", path: "/meditation" },
  { id: "about", label: "About Centre", path: "/about-centre" },
  { id: "objectives", label: "Objectives", path: "/objectives" },
  { id: "gallery", label: "Gallery", path: "/gallery" },
  { id: "facilities", label: "Facilities & Registrations/Booking", path: "/facilities" },
  { id: "activities", label: "Activities", path: "/activities" },
  { id: "contact", label: "Contact Us", path: "/contact-us" },
  { id: "donate", label: "Donate Us", path: "/donate-us" },
];

export default function ContactUs() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      {/* Spline Header */}
      <section className="relative min-h-[420px] flex items-center justify-center overflow-hidden bg-transparent">
        <div className="absolute inset-0 z-0">
          <Spline 
            scene="https://prod.spline.design/kWG69DTJa9NL6IHr/scene.splinecode" 
            className="w-full h-full opacity-90"
          />
        </div>
      </section>
      {/* Meditation Navbar */}
      <nav className="w-full flex justify-center z-30 relative" style={{ background: '#57cc99', marginTop: '2rem', borderBottom: '2px solid #fff', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}>
        <div className="flex gap-2 rounded-lg px-2 py-1" style={{overflowX: 'auto', maxWidth: '95vw'}}>
          {NAV_SECTIONS.map((section) => (
            <Link
              key={section.id}
              to={section.path}
              className={`px-4 py-2 rounded-md font-medium transition-colors text-base whitespace-nowrap ${location.pathname === section.path ? 'bg-[#80ed99] text-green-900 font-semibold shadow' : 'bg-transparent text-white hover:bg-[#80ed99] hover:text-green-900'}`}
              style={{ minWidth: 0 }}
            >
              {section.label}
            </Link>
          ))}
        </div>
      </nav>
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 mt-8">Where To Find Us?</h1>
        {/* Contact Info Cards */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-8 px-4">
          {/* Location */}
          <div className="flex flex-col items-center flex-1 min-w-[200px]">
            <FaMapMarkerAlt className="h-12 w-12 mb-2 text-green-700" />
            <span className="text-lg font-semibold mt-2">LOCATION</span>
            <span className="text-gray-700 text-center mt-1">Vellanki, Krishna (Dist), AP-521181</span>
          </div>
          {/* Website */}
          <div className="flex flex-col items-center flex-1 min-w-[200px]">
            <FaGlobe className="h-12 w-12 mb-2 text-green-700" />
            <span className="text-lg font-semibold mt-2">WEBSITE</span>
            <a href="https://www.yrkmgstc.in" className="text-green-600 mt-1 hover:underline" target="_blank" rel="noopener noreferrer">www.yrkmgstc.in</a>
          </div>
          {/* Call Us */}
          <div className="flex flex-col items-center flex-1 min-w-[200px]">
            <FaPhoneAlt className="h-12 w-12 mb-2 text-green-700" />
            <span className="text-lg font-semibold mt-2">CALL US</span>
            <span className="text-gray-700 text-center mt-1">9137692917 / 9820962870</span>
          </div>
          {/* Email */}
          <div className="flex flex-col items-center flex-1 min-w-[200px]">
            <FaEnvelope className="h-12 w-12 mb-2 text-green-700" />
            <span className="text-lg font-semibold mt-2">EMAIL</span>
            <span className="text-gray-700 text-center mt-1">ysrao@spit.ac.in<br/>gogreenramakrishna@gmail.com</span>
          </div>
        </div>
        {/* Google Map Embed */}
        <div className="w-full max-w-6xl flex justify-center mb-12 px-4">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=16.764975,80.368592&z=17&output=embed"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '12px', minHeight: '300px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </main>
      <Footer />
      <style>{`
        nav::-webkit-scrollbar { display: none; }
        nav { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
} 