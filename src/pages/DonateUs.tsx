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

export default function DonateUs() {
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
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-0">
        <h1 className="text-4xl font-bold mb-8 mt-10">Donate Us</h1>
        <div className="max-w-2xl w-full mb-6 px-4">
          <h2 className="text-2xl font-semibold mb-4 text-green-800 text-center">Donations and Gifts</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Donations and materialistic gifts are accepted from the public for the establishment and maintenance of the Centre.</li>
            <li>Names of the donor's are displayed in the Centre at appropriate location as decided by the Trust.</li>
            <li>Donors may be offered to serve as the Members of Committees constituted by the Trust for the functioning of the Centre.</li>
            <li>Concession to Donor's on utilization of the Centre as decided by the Trust from time to time.</li>
          </ul>
        </div>
        
        <h1 className="text-4xl font-bold mb-8 mt-10">Our Proud Donors</h1>
        <div className="max-w-2xl w-full mb-6 px-4">
          <h2 className="text-2xl font-semibold mb-4 text-green-800 text-center">Donors List</h2>
          <center>
           <iframe style={{width:"90%",height:"2050px"}} 
                        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSIbZpboiO825u8fgfAItXm9cvImmM2T1L9GFLNyEF7YB5YgIMyAt_ifWoeZTqISQ/pubhtml?gid=1675550864&amp;single=true&amp;widget=false&amp;headers=false&amp;chrome=false">           
           </iframe>
           </center>
        </div>

        <section
          className="w-full flex flex-col items-center justify-center py-16 px-4"
          style={{
            background: 'linear-gradient(120deg, #3a86ff 0%, #36c486 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="max-w-3xl w-full flex flex-col items-center text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">Donate and make a difference</h3>
            <p className="text-lg md:text-2xl text-white mb-8 font-medium">
              We respectfully ask that you consider making a gift to help the Meditation Center.<br/>
              Your gift will make a significant impact on our ability to keep our<br/>
              Center running and provide Meditation and social activities in our area.<br/>
              Even a small gift will have an impact on the ability of the Center.
            </p>
            <hr className="w-full border-t border-white/70 mb-8" />
            <div className="text-white text-base md:text-lg mb-6">
              <div className="mb-4">
                Shri Yerramreddy Ramakrishna's Go Green Science & Technology Trust<br/>
                <span className="font-bold text-xl">A/C No: <span className="font-extrabold">1645234591</span></span><br/>
                IFSC: KKBK0007857<br/>
                Kotak Mahindra Bank Ltd., Nandigama
              </div>
              <div className="font-bold text-lg mb-4">[OR]</div>
              <div className="mb-4">
                Yerramreddy Srinivasa Rao<br/>
                <span className="font-bold text-xl">A/C No: <span className="font-extrabold">35439719096</span></span><br/>
                IFSC: SBIN0014173<br/>
                State Bank of India, Nandigama Town
              </div>
              <div className="mb-4">
                <span className="font-bold">Phone Pay:</span> 9137692917 / 9820962870
              </div>
            </div>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdEzzwv3Gnk-SIkY4Ur61FofSvuVaZm9MqKvhtk7Io3S8hQ6g/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#36c486] font-semibold px-8 py-3 rounded-full shadow-lg border-2 border-white hover:bg-[#36c486] hover:text-white transition-colors text-lg mt-2"
            >
              Donation Form
            </a>
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