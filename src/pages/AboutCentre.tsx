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

export default function AboutCentre() {
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
              ABOUT CENTRE
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
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        {/* OUR VISION CARD */}
        <section className="w-full flex justify-center mt-10 mb-16">
          <div className="bg-gradient-to-r from-green-200 via-green-100 to-green-50 shadow-2xl rounded-3xl border-4 border-green-300 flex flex-col items-center px-10 py-12 max-w-4xl w-full">
            <h2 className="text-5xl font-extrabold text-green-800 mb-6 tracking-wide text-center" style={{letterSpacing: '0.05em'}}>OUR VISION</h2>
            <p className="text-2xl text-gray-700 text-center font-medium">
              The establishment and construction of a Meditation Center in the rural area will serve the diverse spiritual needs of an entire community with warmth and spiritual openness. It will serve as a technological development center for agriculture, and also to conduct various technical, nontechnical, social, cultural activities.
            </p>
          </div>
        </section>

        {/* ABOUT MEDITATION SECTION */}
<section className="w-full flex flex-col items-center justify-center mb-20 max-w-6xl">
  {/* First part with image on left */}
  <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10 mb-12">
    {/* Left image */}
    <div className="flex-shrink-0 flex justify-center items-start w-full md:w-1/2">
      <img src="/lord.png" alt="Meditation Illustration" className="w-70 h-auto object-contain" />
    </div>
    {/* Right text */}
    <div className="w-full md:w-3/4">
      <h2 className="text-3xl font-bold mb-4">About Meditation</h2>
      <p className="text-lg mb-4 text-gray-700">Meditation can be defined as a set of techniques that are intended to encourage a heightened state of awareness and focused attention. Meditation is also a consciousness-changing technique that has been shown to have a wide number of benefits on psychological well-being.</p>
      <h3 className="text-xl font-semibold mb-2">Some key things to note about meditation:</h3>
      <ul className="list-disc pl-6 text-lg mb-4 text-gray-700">
        <li>Meditation has been practiced in cultures all over the world for thousands of years. Nearly every religion, including Buddhism, Hinduism, Christianity, Judaism, and Islam, has a tradition of using meditative practices.</li>
        <li>While meditation is often used for religious purposes, many people practice it independently of any religious or spiritual beliefs or practices. Meditation can also be used as a psychotherapeutic technique.</li>
      </ul>
    </div>
  </div>
  
  {/* Second part centered */}
  <div className="w-full max-w-4xl text-left">
    <p className="text-lg mb-2 text-gray-700">Meditation can take on many different forms, but there are two main types: <b>Concentrative Meditation</b> and <b>Mindfulness Meditation</b>:</p>
    <ul className="list-disc text-left pl-6 text-lg text-gray-700 max-w-3xl mx-auto">
      <li><b>Concentrative meditation</b> involves focusing all of your attention on a specific thing while tuning out everything else around you. The goal is to really experience whatever you are focusing on, whether it's your breath, a specific word, or a mantra in order to reach a higher state of being.</li>
      <li><b>Mindfulness meditation</b> includes, among others, both mindfulness-based stress reduction (MBSR) and mindfulness-based cognitive therapy (MBCT). Mindfulness can target different issues, such as depression, which means that its focus may be different from practice to practice. Overall, it involves the state of being aware of and involved in the present moment and making yourself open, aware, and accepting.</li>
    </ul>
  </div>
</section>

        {/* SITE PLAN & FACILITIES SECTION */}
        <section className="w-full flex flex-col items-center mb-20 max-w-6xl">
  <h2 className="text-3xl font-bold mb-6">Our Site Plan & Facilities:</h2>
  <div className="w-full flex justify-center">
    <img
      src="/siteplan.png"
      alt="Site Plan & Facilities"
      className="w-full max-w-3xl object-contain rounded-2xl shadow-lg border-2 border-gray-200"
    />
  </div>
</section>

      </main>
      <Footer />
      <style>{`
        nav::-webkit-scrollbar { display: none; }
        nav { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
} 