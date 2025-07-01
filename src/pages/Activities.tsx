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
  { id: "skill-development", label: "Skill Development Progress", path: "/skill-development" },
  { id: "activities", label: "Activities", path: "/activities" },
  { id: "agri-tech", label: "Agricultural Technologies", path: "/agricultural-technologies" },
  { id: "donors", label: "Donors", path: "/donors" },
  { id: "contact", label: "Contact Us", path: "/contact-us" },
  { id: "donate", label: "Donate Us", path: "/donate-us" },
];

export default function Activities() {
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
        {/* Overlay Title */}
        <div className="absolute z-10 flex items-center justify-center w-full h-full">
          <div className="border-8 border-white px-12 py-4 rounded-lg bg-transparent flex items-center justify-center">
            <span className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-wide" style={{letterSpacing: '0.04em'}}>
              ACTIVITIES
            </span>
          </div>
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
        <h1 className="text-4xl font-bold mb-4">Activities</h1>
        <p className="text-lg text-gray-700">This is the Activities page. Add your content here.</p>
      </main>
      <Footer />
      <style>{`
        nav::-webkit-scrollbar { display: none; }
        nav { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
} 