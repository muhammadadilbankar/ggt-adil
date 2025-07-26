import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Spline from "@splinetool/react-spline";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

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

export default function Meditation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSpline = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <Navbar />
      <button
        onClick={toggleSpline}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {isOpen ? "Close Spline" : "View Spline"}
      </button>
      {/* Hero Section with Spline 3D Model */}
      {isOpen && (
      <section className="relative min-h-[420px] flex items-center justify-center overflow-hidden bg-transparent">
        <div className="absolute inset-0 z-0">
          <Spline 
            scene="https://prod.spline.design/kWG69DTJa9NL6IHr/scene.splinecode" 
            className="w-full h-full opacity-90"
          />
        </div>
      </section>
)}

      {/* Navigation Bar */}
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

      {/* About Section Modern Layout */}
      <section className="max-w-5xl mx-auto my-16 px-4">
        {/* Heading Centered */}
        <h2 className="text-4xl md:text-5xl font-extrabold font-sans mb-12 text-green-900 text-center">About Sri Yerramreddy Rama Krishna Murthy, B.A., LL.B., Advocate</h2>
        {/* Two-column: Image + Birth & Education */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
          {/* Image Placeholder */}
          <div className="flex-shrink-0 flex items-center justify-center w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
            {/* Replace src with actual image if available */}
            <img src="public\yrkm.jpg" alt="Sri Yerramreddy Rama Krishna Murthy" className="object-cover w-full h-full" />
          </div>
          {/* Text Content */}
          <div className="flex-1">
            <h4 className="text-2xl font-bold font-sans mb-3 text-green-700">Birth & Education</h4>
            <p className="text-lg md:text-xl font-medium font-sans text-gray-800 leading-relaxed">
              Late Shri Yerramreddy Rama Krishna Murthy born as seventh and last child of Late Shri Mukkaiah and Late Smt Punnamma in 1935 in Vellanki Village of Veerulapadu Mandal of N.T.R. District of Andhra Pradesh. He completed his elementary education in his village and high school education in Veerulapadu village, which is 10 km away from his village. He did his PUC and BA graduation in SRR College, Vijayawada and completed his law graduation LL.B. from Osmania University, Hyderabad.
            </p>
          </div>
        </div>
        {/* Remaining Biography Sections */}
        <div className="space-y-10">
          <div>
            <h4 className="text-2xl font-bold font-sans mb-3 text-green-700">As an advocate</h4>
            <p className="text-lg md:text-xl font-medium font-sans text-gray-800 leading-relaxed">
              He started his career as an advocate in Vijayawada in 1962. When a new court was started in Nandigama in 1966, he left from the city Vijayawada and moved to the small town Nandigama to serve his native people as an advocate. He had good name in dealing both civil and criminal cases not only in Nandigama surroundings but also in entire district. People love him so much because he never given importance for the earning but to fight for the justice.
            </p>
          </div>
          <div>
            <h4 className="text-2xl font-bold font-sans mb-3 text-green-700">As a Mandal President</h4>
            <p className="text-lg md:text-xl font-medium font-sans text-gray-800 leading-relaxed">
              When Nandigama taluk was changed as Nandigama Mandal, he won the election with good majority and served as the first Mandal Prajaparishad President from 1987 to 1992. During his tenure he served the people of Nandigama Mandal and got good name as friendly leader. During this period he started several elementary government schools in Nandigama Mandal and also upgraded Lingalapadu, Rudravaram and Ithavaram schools as High schools.
            </p>
          </div>
          <div>
            <h4 className="text-2xl font-bold font-sans mb-3 text-green-700">As a President of KVR College Committee</h4>
            <p className="text-lg md:text-xl font-medium font-sans text-gray-800 leading-relaxed">
              For more than two decades he served as President for K.V.R. College, an aided institution in Nandigama. To meet the higher educational needs of the rural children especially for girls several UG and PG courses were started by him. Around 3000 students used to study in the campus in various courses. He developed infrastructure of the college by constructing five - three storied buildings, compound wall to the 8 acres land, basketball court, and indoor stadium. With his initiation several computer courses were started and UG and PG level in the college, it was a boon to the rural students, and they were well settled in their lives in all over the world.
            </p>
          </div>
          <div>
            <h4 className="text-2xl font-bold font-sans mb-3 text-green-700">Active in social service</h4>
            <p className="text-lg md:text-xl font-medium font-sans text-gray-800 leading-relaxed">
              Through Lions club he served the needy people. He served in various positions in lions club and constructed an eye hospital in Nandigama with the help of the fellow lion members. Thousands of people were benefitted through vision care activities. Also served as President for Nandigama Bar Association, President for Nandigama Cultural & Recreation Club and also served in the management of Krishna District Co-operative Bank.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: none; }
        }
        nav::-webkit-scrollbar { display: none; }
        nav { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}
