import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Spline from "@splinetool/react-spline";
import { Link, useLocation } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
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

const GALLERY_IMAGES = Array.from({ length: 12 }, (_, i) => `/g${i + 1}.jpg`);

export default function Gallery() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
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
      {/* Spline Header */}
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
      <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-2">
        <h1 className="text-4xl font-bold mb-4">Gallery</h1>
        <p className="text-lg text-gray-700 mb-8">Explore our moments. Click any image to view fullscreen and swipe through the gallery!</p>
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((src, idx) => (
              <button
                key={src}
                className="group relative overflow-hidden rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={() => { setSelectedIdx(idx); setOpen(true); }}
                style={{ aspectRatio: '1/1', background: '#e0e0e0' }}
              >
                <img
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 group-hover:brightness-90"
                  loading="lazy"
                />
                <span className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
        {/* Lightbox Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="max-w-3xl w-full bg-transparent shadow-none border-none p-0 flex items-center justify-center">
            <div className="relative w-full">
              <Carousel opts={{ startIndex: selectedIdx }}>
                <CarouselPrevious className="z-20" />
                <CarouselContent>
                  {GALLERY_IMAGES.map((src, idx) => (
                    <CarouselItem key={src} className="flex items-center justify-center">
                      <img
                        src={src}
                        alt={`Gallery ${idx + 1}`}
                        className="max-h-[70vh] w-auto rounded-2xl shadow-2xl object-contain mx-auto transition-all duration-300"
                        style={{ background: '#e0e0e0' }}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext className="z-20" />
              </Carousel>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
      <style>{`
        nav::-webkit-scrollbar { display: none; }
        nav { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
} 