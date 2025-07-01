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

export default function Objectives() {
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
        <h1 className="text-4xl font-bold mb-4 text-green-800">Our Objectives</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4">
          {/* Objective 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <svg className="w-12 h-12 text-green-500 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636" /><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" /></svg>
            <h3 className="text-xl font-semibold mb-2">Promote Spiritual Activities</h3>
            <p className="text-gray-600">Fostering spiritual growth and mindfulness through regular activities and events.</p>
          </div>
          {/* Objective 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <svg className="w-12 h-12 text-green-500 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.5 10.5a4 4 0 117 0c0 2.485-2 4.5-4 4.5s-4-2.015-4-4.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14.5V19" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 19h6" /></svg>
            <h3 className="text-xl font-semibold mb-2">Emergency Medical Facility</h3>
            <p className="text-gray-600">Providing emergency medical support and organizing regular health checkup camps.</p>
          </div>
          {/* Objective 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <svg className="w-12 h-12 text-green-500 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 17v-2a4 4 0 014-4h10a4 4 0 014 4v2" /><rect width="18" height="6" x="3" y="17" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0v4" /></svg>
            <h3 className="text-xl font-semibold mb-2">Modern Tools for Agriculture</h3>
            <p className="text-gray-600">Empowering farmers with modern tools and techniques for agricultural upliftment.</p>
          </div>
          {/* Objective 4 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <svg className="w-12 h-12 text-green-500 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0121 13.5c0 2.485-2 4.5-4 4.5s-4-2.015-4-4.5z" /></svg>
            <h3 className="text-xl font-semibold mb-2">Skill Development & Research</h3>
            <p className="text-gray-600">Offering skill development, research activities, and internship programs for students.</p>
          </div>
          {/* Objective 5 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <svg className="w-12 h-12 text-green-500 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4h-1" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 20H4v-2a4 4 0 014-4h1" /><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" /></svg>
            <h3 className="text-xl font-semibold mb-2">Cultural & Sports Activities</h3>
            <p className="text-gray-600">Encouraging cultural and sports activities for rural schools and communities.</p>
          </div>
          {/* Objective 6 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <svg className="w-12 h-12 text-green-500 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3v1a3 3 0 006 0v-1c0-1.657-1.343-3-3-3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 17v.01" /><path strokeLinecap="round" strokeLinejoin="round" d="M17 16v-1a5 5 0 00-10 0v1" /></svg>
            <h3 className="text-xl font-semibold mb-2">Hindu Marriages & Rituals</h3>
            <p className="text-gray-600">Supporting Hindu marriages and rituals for the community.</p>
          </div>
          {/* Objective 7 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform col-span-1 lg:col-start-2">
            <svg className="w-12 h-12 text-green-500 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h2a4 4 0 014 4v2" /><rect width="18" height="6" x="3" y="17" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0v4" /></svg>
            <h3 className="text-xl font-semibold mb-2">Support for Physically Challenged & Elderly</h3>
            <p className="text-gray-600">Assisting physically challenged and elderly people with care and resources.</p>
          </div>
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