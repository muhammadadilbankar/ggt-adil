import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Spline from "@splinetool/react-spline";
import { Link, useLocation } from "react-router-dom";

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

export default function Facilities() {
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
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8">
        <h1 className="text-4xl font-bold mb-4 text-green-800">Facilites and Registrations/Booking</h1>
        <p className="text-lg text-black-1000 mb-5 max-w-4xl text-center">
          Explore our diverse range of facilities designed to support meditation, learning, recreation, and community engagement. Please review the list below and check the availability before proceeding with your booking.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-800 max-w-2xl mb-8">
          <li>Block - 1 (300 square feet with attached toilet)</li>
          <li>Block - 2 (300 square feet with attached toilet)</li>
          <li>Block - 3 (300 square feet with attached toilet)</li>
          <li>Block - 4 (300 square feet with attached toilet)</li>
          <li>Block - 5 (300 square feet with attached toilet)</li>
          <li>Tree House Level-1 (Neem tree house 150 square feet with attached toilet)</li>
          <li>Tree House Level-2 (Neem tree house 150 square feet with balcony)</li>
          <li>Under Ground Meditation Hall (1600 square feet hexagon)</li>
          <li>Amphitheatre (1600 square feet hexagon + openspace)</li>
          <li>Open space</li>
          <li>Musical Garden</li>
          <li>Botanical Garden</li>
          <li>Science & Technology Center</li>
          <li>Meditation</li>
          <li>Yoga</li>
          <li>Sports</li>
          <li>Visit</li>
        </ul>
        <div className="w-full max-w-2xl flex flex-col items-center mb-8">
          <p className="text-lg text-gray-700 mb-4 text-center">
            Please check the availability of the facility in sheet below, then kindly fill the form given below.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf3WJm4DxCBJE9RuujC82Pd4JteP976SqGcsa82DYFAhoVvaw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-white text-lg px-8 py-4 rounded-full bg-green-600 border-4 border-green-300 shadow transition-all duration-200 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
style={{ boxShadow: '0 0 0 4px #22c55e, 0 2px 8px 0 rgba(0,0,0,0.08)' }}

          >
            Facilities Registration/Booking Form
          </a>
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