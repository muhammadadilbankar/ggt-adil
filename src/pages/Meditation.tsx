import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FaBrain, FaFire, FaCalendarCheck, FaYoutube, FaQuestionCircle } from "react-icons/fa";

const QUOTES = [
  "Meditation is not evasion; it is a serene encounter with reality. – Thích Nhất Hạnh",
  "The mind is everything. What you think you become. – Buddha",
  "Almost everything will work again if you unplug it for a few minutes, including you. – Anne Lamott",
  "You should sit in meditation for 20 minutes a day, unless you're too busy; then you should sit for an hour. – Zen proverb",
  "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor. – Thích Nhất Hạnh"
];

const FAQS = [
  {
    q: "How long should I meditate as a beginner?",
    a: "Start with 5-10 minutes daily. Consistency is more important than duration."
  },
  {
    q: "What if I get distracted during meditation?",
    a: "It's normal! Gently bring your focus back to your breath or chosen anchor."
  },
  {
    q: "Can meditation help with engineering stress?",
    a: "Yes, regular meditation can reduce stress and improve focus, which is especially helpful for engineers."
  },
  {
    q: "Do I need a special place to meditate?",
    a: "No, just find a quiet and comfortable spot where you won't be disturbed."
  }
];

export default function Meditation() {
  const { toast } = useToast();
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState("");
  const [playSound, setPlaySound] = useState(true);
  const [showSessionDetails, setShowSessionDetails] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [breathIn, setBreathIn] = useState(true);
  const [stats, setStats] = useState({ sessions: 0, minutes: 0 });
  const [quoteIdx, setQuoteIdx] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const [streak, setStreak] = useState(3); // Placeholder for daily streak

  const sessions = [
    {
      id: "focus",
      title: "Focus Enhancement Tips",
      duration: 10,
      description: "Improve concentration for electronics problem-solving",
      benefits: [
        "Enhanced concentration",
        "Reduced distractions",
        "Improved technical thinking"
      ],
      image: "https://images.pexels.com/photos/3861453/pexels-photo-3861453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: "stress",
      title: "Stress Reduction",
      duration: 15,
      description: "Relieve stress from complex projects and deadlines",
      benefits: [
        "Lowered anxiety",
        "Better sleep quality",
        "Increased patience for debugging"
      ],
      image: "https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: "creativity",
      title: "Creative Thinking",
      duration: 12,
      description: "Stimulate innovative approaches to electronics design",
      benefits: [
        "New perspectives",
        "Breakthrough solutions",
        "Enhanced design thinking"
      ],
      image: "https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const tips = [
    {
      title: "Proper Posture",
      content: "Sit comfortably with your back straight, either on a chair or on the floor with a cushion. This helps maintain alertness during meditation.",
      icon: <FaBrain className="text-primary" />
    },
    {
      title: "Consistent Schedule",
      content: "Meditate at the same time each day, ideally before starting complex electronics work, to build a sustainable practice.",
      icon: <FaCalendarCheck className="text-primary" />
    },
    {
      title: "Mindful Breathing",
      content: "Focus on your breath to anchor your awareness. Count breaths or notice the sensation of breathing to maintain concentration.",
      icon: <FaFire className="text-primary" />
    },
    {
      title: "Start Small",
      content: "Begin with just 5 minutes daily and gradually increase. Consistency is more important than duration.",
      icon: <FaBrain className="text-primary" />
    }
  ];

  const benefits = [
    {
      title: "Enhanced Problem Solving",
      description: "Regular meditation improves cognitive flexibility, helping you approach electronics challenges from different angles.",
      icon: "💡"
    },
    {
      title: "Reduced Frustration",
      description: "Learn to manage emotions when debugging complex circuits or writing challenging code.",
      icon: "🧘"
    },
    {
      title: "Improved Focus",
      description: "Train your mind to concentrate deeply on detailed tasks without getting distracted.",
      icon: "🎯"
    },
    {
      title: "Better Team Collaboration",
      description: "Develop patience and communication skills that enhance group electronics projects.",
      icon: "👥"
    }
  ];

  // Personalized greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning, Engineer!";
    if (hour < 18) return "Good afternoon, Engineer!";
    return "Good evening, Engineer!";
  };

  // Timer and breathing animation
  useEffect(() => {
    let breathInterval: NodeJS.Timeout | null = null;
    if (activeSession) {
      breathInterval = setInterval(() => setBreathIn((b) => !b), 4000);
    } else {
      setBreathIn(true);
    }
    return () => {
      if (breathInterval) clearInterval(breathInterval);
    };
  }, [activeSession]);

  const startSession = (id: string, duration: number) => {
    if (activeSession) {
      toast({
        title: "Session already in progress",
        description: "Please complete or end your current session first.",
      });
      return;
    }
    setActiveSession(id);
    setTimeRemaining(duration * 60);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setActiveSession(null);
          setShowReflection(true);
          setStats((s) => ({
            sessions: s.sessions + 1,
            minutes: s.minutes + duration
          }));
          if (playSound && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
          toast({
            title: "Session Complete",
            description: "Your meditation session has finished. How do you feel?",
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    toast({
      title: "Session Started",
      description: `Your ${duration}-minute meditation session has begun.`,
    });
  };

  const endSession = () => {
    setActiveSession(null);
    setTimeRemaining(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setShowReflection(true);
    toast({
      title: "Session Ended",
      description: "Your meditation session has been ended early.",
    });
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionProgress = () => {
    if (!activeSession) return 0;
    const session = sessions.find(s => s.id === activeSession);
    if (!session) return 0;
    const total = session.duration * 60;
    return ((total - timeRemaining) / total) * 100;
  };

  return (
    <>
      <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa1c82.mp3" preload="auto" />
      <Navbar />
      {/* Hero Section - Bigger */}
      <div className="bg-gradient-to-br from-primary to-secondary min-h-[420px] flex flex-col justify-center items-center text-white px-4 animate-fade-in">
        <div className="text-center pt-24 pb-16 max-w-3xl w-full mx-auto flex flex-col items-center">
          <FaBrain className="text-7xl mb-6 opacity-80" />
          <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">Mindfulness for Engineers</h1>
          <p className="text-2xl mb-2 flex items-center justify-center gap-2">
            <span role="img" aria-label="wave">👋</span> {getGreeting()}
          </p>
          <p className="text-lg max-w-2xl mx-auto opacity-90 mb-6">
            Enhance your technical skills through mindfulness. Meditation sessions designed for electronics enthusiasts to improve focus, problem-solving, and creativity.
          </p>
          <div className="italic text-lg opacity-80 border-l-4 border-white/40 pl-4 mt-2">{QUOTES[quoteIdx]}</div>
        </div>
      </div>

      <main className="bg-gray-100 min-h-screen pb-16">
        {/* Session Carousel - Improved shadow, layout, and polish */}
        <div className="max-w-6xl mx-auto px-4 mt-[-60px] relative z-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Choose a Session</h2>
            <span className="text-gray-500 text-lg">Scroll &rarr;</span>
          </div>
          <div className="flex gap-8 overflow-x-auto pb-4 hide-scrollbar">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="min-w-[340px] max-w-[340px] bg-white/95 border border-gray-200 rounded-2xl shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] relative group transition-all duration-200 hover:-translate-y-2 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.14)] flex flex-col"
                style={{ boxSizing: 'border-box' }}
                onClick={() => setShowSessionDetails(session.id)}
              >
                <img src={session.image} alt={session.title} className="w-full h-52 object-cover rounded-t-2xl" style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }} />
                <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 text-xs font-semibold text-primary shadow">{session.duration} min</div>
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">{session.title}</h3>
                    <p className="text-gray-700 text-base mb-5 line-clamp-2">{session.description}</p>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <Button className="flex-1 h-11 text-base font-semibold" style={{ minWidth: 0 }} onClick={e => { e.stopPropagation(); startSession(session.id, session.duration); }}>Start</Button>
                    <Button variant="outline" className="flex-1 h-11 text-base font-semibold" style={{ minWidth: 0 }} onClick={e => { e.stopPropagation(); setShowSessionDetails(session.id); }}>View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Session Details Modal */}
        <Dialog open={!!showSessionDetails} onOpenChange={() => setShowSessionDetails(null)}>
          <DialogContent className="max-w-lg">
            {showSessionDetails && (
              <>
                <DialogHeader>
                  <DialogTitle>{sessions.find(s => s.id === showSessionDetails)?.title}</DialogTitle>
                </DialogHeader>
                <img src={sessions.find(s => s.id === showSessionDetails)?.image} alt="" className="w-full h-40 object-cover rounded-xl mb-4" />
                <div className="mb-2 text-gray-700">{sessions.find(s => s.id === showSessionDetails)?.description}</div>
                <div className="mb-2 text-gray-800 font-semibold">Benefits:</div>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  {sessions.find(s => s.id === showSessionDetails)?.benefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
                <Button className="w-full" onClick={() => { startSession(showSessionDetails, sessions.find(s => s.id === showSessionDetails)?.duration || 10); setShowSessionDetails(null); }}>Start Session</Button>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Active Session View */}
        {activeSession && (
          <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white/95 rounded-2xl shadow-2xl p-10 flex flex-col items-center relative min-w-[340px] max-w-[95vw] w-full mx-2">
              {/* Circular Progress Bar */}
              <div className="relative w-52 h-52 mb-6">
                <svg className="absolute top-0 left-0" width="208" height="208">
                  <circle cx="104" cy="104" r="88" stroke="#e5e7eb" strokeWidth="14" fill="none" />
                  <circle
                    cx="104" cy="104" r="88"
                    stroke="url(#progress-gradient)"
                    strokeWidth="14"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 88}
                    strokeDashoffset={2 * Math.PI * 88 * (1 - getSessionProgress() / 100)}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.5s' }}
                  />
                  <defs>
                    <linearGradient id="progress-gradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute inset-0 flex flex-col items-center justify-center text-5xl font-extrabold text-primary">
                  {formatTime(timeRemaining)}
                  <span className="text-base font-medium text-gray-700 mt-2">remaining</span>
                </span>
              </div>
              {/* Animated Breathing Guide */}
              <div className="mb-6">
                <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center transition-all duration-1000 ${breathIn ? 'bg-primary/30 scale-110' : 'bg-secondary/30 scale-90'}`}>
                  <span className="text-lg font-semibold text-primary animate-pulse">{breathIn ? 'Breathe In' : 'Breathe Out'}</span>
                </div>
              </div>
              {/* Floating Controls */}
              <div className="flex gap-4 mt-2">
                <Button variant="destructive" onClick={endSession}>End Session</Button>
                <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-full shadow">
                  <Switch checked={playSound} onCheckedChange={setPlaySound} id="sound-toggle" />
                  <label htmlFor="sound-toggle" className="text-gray-600 text-sm">Bell sound</label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tips & Benefits Accordion - More spacing, bigger header, more padding, rounded corners */}
        <div className="max-w-6xl mx-auto px-4 mt-16 animate-fade-in">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Tips & Benefits</h2>
          <Accordion type="multiple" className="rounded-3xl bg-white/90 backdrop-blur-md shadow p-6">
            <AccordionItem value="tips">
              <AccordionTrigger className="text-xl font-semibold">Tips for Meditation</AccordionTrigger>
              <AccordionContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {tips.map((tip, i) => (
                    <Card key={i} className="bg-white/95 flex flex-row items-center gap-4 p-6 rounded-2xl">
                      <div className="text-3xl">{tip.icon}</div>
                      <div>
                        <div className="font-bold mb-1 text-lg">{tip.title}</div>
                        <div className="text-gray-700 text-base">{tip.content}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="benefits">
              <AccordionTrigger className="text-xl font-semibold">Benefits for Engineers</AccordionTrigger>
              <AccordionContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-2xl mt-1">{benefit.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-gray-700 text-base">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* FAQ Accordion - More spacing, centered, same width as Tips & Benefits, bigger header, more padding, rounded corners */}
        <div className="max-w-6xl mx-auto px-4 mt-16 animate-fade-in flex flex-col items-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8 flex items-center gap-2"><FaQuestionCircle className="text-primary" /> Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="rounded-3xl bg-white/90 backdrop-blur-md shadow p-6 w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem value={faq.q} key={i}>
                <AccordionTrigger className="text-lg font-semibold">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-base">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
      {/* Fade-in animation style and hide-scrollbar utility */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: none; }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .aspect-video { aspect-ratio: 16/9; }
      `}</style>
    </>
  );
}
