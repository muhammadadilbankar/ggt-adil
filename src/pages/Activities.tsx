import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Spline from "@splinetool/react-spline";
import { Link, useLocation } from "react-router-dom";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

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

function Activities() {
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
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-16">
        <h1 className="text-4xl font-bold mb-4">Activities</h1>
        <p className="text-lg text-gray-700 mb-8">Explore interactive meditation activities below!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-12">
          {/* Breathing Exercise */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full h-48 flex flex-col items-center justify-center bg-gradient-to-br from-green-200 to-green-400 shadow-lg hover:scale-105 transition-transform">
                <span className="text-2xl mb-2">🧘‍♂️</span>
                <span className="text-xl font-semibold">Guided Breathing</span>
                <span className="text-sm mt-2">Relax with a simple breathing exercise</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Guided Breathing Exercise</DialogTitle>
                <DialogDescription>Follow the animation: Inhale as the circle expands, exhale as it contracts.</DialogDescription>
              </DialogHeader>
              <BreathingExercise />
            </DialogContent>
          </Dialog>
          {/* Gratitude Prompt */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full h-48 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 shadow-lg hover:scale-105 transition-transform">
                <span className="text-2xl mb-2">🙏</span>
                <span className="text-xl font-semibold">Gratitude Prompt</span>
                <span className="text-sm mt-2">Reflect on something positive today</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Gratitude Prompt</DialogTitle>
                <DialogDescription>Flip the card for a new gratitude question.</DialogDescription>
              </DialogHeader>
              <GratitudePrompt />
            </DialogContent>
          </Dialog>
          {/* Mood Tracker */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full h-48 flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 shadow-lg hover:scale-105 transition-transform">
                <span className="text-2xl mb-2">😊</span>
                <span className="text-xl font-semibold">Mood Tracker</span>
                <span className="text-sm mt-2">How are you feeling right now?</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Mood Tracker</DialogTitle>
                <DialogDescription>Select your mood and get a positive message.</DialogDescription>
              </DialogHeader>
              <MoodTracker />
            </DialogContent>
          </Dialog>
        </div>
        {/* Meditation Media Dropdown */}
        <div className="mb-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-lg px-6 py-3 shadow-md">Meditation Media ▼</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="horizontal-dropdown">
              <DropdownMenuItem asChild>
                <a href="https://drive.google.com/file/d/1_b1hxnNTKxhv82jcdS1AUU1QQt2GLVul/view" target="_blank" rel="noopener noreferrer">Audio 1</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="https://drive.google.com/file/d/1nsqUoDyT2CJqLK56Zm2TUu4gUq-xeJB7/preview" target="_blank" rel="noopener noreferrer">Audio 2</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="https://drive.google.com/file/d/10GsKxfhV9aMgG4fwhX1BDgoj98nxMs3S/view" target="_blank" rel="noopener noreferrer">Video</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="https://drive.google.com/file/d/149-1Ew2ZIin8pCIgV629ufIahDFqH59E/view" target="_blank" rel="noopener noreferrer">Image 1</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="https://drive.google.com/file/d/149-1Ew2ZIin8pCIgV629ufIahDFqH59E/view" target="_blank" rel="noopener noreferrer">Image 2</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </main>
      <Footer />
      <style>{`
        nav::-webkit-scrollbar { display: none; }
        nav { -ms-overflow-style: none; scrollbar-width: none; }
        .horizontal-dropdown {
          display: flex !important;
          flex-direction: row !important;
          min-width: unset !important;
          padding: 0.5rem 1rem;
          gap: 1rem;
          background: #fff;
          box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
        }
        .horizontal-dropdown [data-radix-dropdown-menu-item] {
          min-width: 80px;
          justify-content: center;
          border-radius: 8px;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          color: #222;
          background: #f7f7f7;
          transition: background 0.2s;
          margin: 0;
        }
        .horizontal-dropdown [data-radix-dropdown-menu-item]:hover {
          background: #e0ffe0;
          color: #388e3c;
        }
      `}</style>
    </>
  );
}

function BreathingExercise() {
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [timer, setTimer] = useState(4);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t === 1) {
          setPhase((p) => (p === 'inhale' ? 'exhale' : 'inhale'));
          return 4;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-40 h-40 flex items-center justify-center mb-4">
        <div
          className={`absolute rounded-full bg-green-200 transition-all duration-1000 ease-in-out ${phase === 'inhale' ? 'w-40 h-40' : 'w-24 h-24'}`}
          style={{ boxShadow: '0 0 40px 10px #b7e4c7' }}
        ></div>
        <span className="absolute text-2xl font-bold text-green-900">{phase === 'inhale' ? 'Inhale' : 'Exhale'}</span>
      </div>
      <div className="text-lg font-semibold mb-2">{timer}s</div>
      <div className="text-gray-600">Breathe {phase === 'inhale' ? 'in deeply...' : 'out slowly...'}</div>
    </div>
  );
}

const GRATITUDE_PROMPTS = [
  "What made you smile today?",
  "Name one thing you're grateful for right now.",
  "Who is someone you appreciate?",
  "Recall a recent act of kindness you received.",
  "What is a simple pleasure you enjoyed today?",
];

function GratitudePrompt() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  function nextPrompt() {
    setFlipped(false);
    setIndex((i) => (i + 1) % GRATITUDE_PROMPTS.length);
  }
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-64 h-32 bg-yellow-100 rounded-lg shadow-lg flex items-center justify-center text-lg font-semibold cursor-pointer transition-transform duration-500 ${flipped ? 'rotate-y-180' : ''}`}
        style={{ perspective: '1000px', minHeight: '80px' }}
        onClick={() => setFlipped((f) => !f)}
      >
        {flipped ? <span className="text-yellow-700">Click for next prompt</span> : <span className="text-yellow-800">{GRATITUDE_PROMPTS[index]}</span>}
      </div>
      <Button variant="ghost" className="mt-4" onClick={nextPrompt}>Next Prompt</Button>
    </div>
  );
}

const MOODS = [
  { emoji: '😃', label: 'Happy', msg: 'Keep shining your light!' },
  { emoji: '😌', label: 'Calm', msg: 'Enjoy the peace within you.' },
  { emoji: '😔', label: 'Sad', msg: "It's okay to feel down. Be kind to yourself." },
  { emoji: '😠', label: 'Angry', msg: 'Take a deep breath. This too shall pass.' },
  { emoji: '😴', label: 'Tired', msg: 'Rest is important. Take care!' },
];

function MoodTracker() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4 mb-4">
        {MOODS.map((mood, idx) => (
          <button
            key={mood.label}
            className={`text-3xl transition-transform duration-200 ${selected === idx ? 'scale-125' : 'hover:scale-110'}`}
            onClick={() => setSelected(idx)}
            aria-label={mood.label}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="mt-2 text-blue-700 font-semibold text-lg">{MOODS[selected].msg}</div>
      )}
    </div>
  );
}

export default Activities; 