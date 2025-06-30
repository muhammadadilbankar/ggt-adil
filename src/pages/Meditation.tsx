
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Meditation() {
  const { toast } = useToast();
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
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
      content: "Sit comfortably with your back straight, either on a chair or on the floor with a cushion. This helps maintain alertness during meditation."
    },
    {
      title: "Consistent Schedule",
      content: "Meditate at the same time each day, ideally before starting complex electronics work, to build a sustainable practice."
    },
    {
      title: "Mindful Breathing",
      content: "Focus on your breath to anchor your awareness. Count breaths or notice the sensation of breathing to maintain concentration."
    },
    {
      title: "Start Small",
      content: "Begin with just 5 minutes daily and gradually increase. Consistency is more important than duration."
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

  const startSession = (id: string, duration: number) => {
    if (activeSession) {
      toast({
        title: "Session already in progress",
        description: "Please complete or end your current session first.",
      });
      return;
    }
    
    setActiveSession(id);
    // Convert minutes to seconds
    setTimeRemaining(duration * 60);
    
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setActiveSession(null);
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
    toast({
      title: "Session Ended",
      description: "Your meditation session has been ended early.",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen pb-16">
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-12 mb-8">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Mindfulness for Engineers</h1>
            <p className="text-lg max-w-3xl">
              Enhance your technical skills through mindfulness. Our meditation sessions
              are designed specifically for electronics enthusiasts to improve focus,
              problem-solving, and creativity.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Active Session Display */}
          {activeSession && (
            <div className="mb-12 bg-white rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-2">
                {sessions.find(s => s.id === activeSession)?.title} Session in Progress
              </h2>
              <div className="text-5xl font-bold my-6 text-primary">
                {formatTime(timeRemaining)}
              </div>
              <p className="mb-6 text-gray-600">
                Focus on your breathing and clear your mind.
              </p>
              <Button variant="destructive" onClick={endSession}>
                End Session Early
              </Button>
            </div>
          )}

          {/* Main Content */}
          <Tabs defaultValue="sessions" className="space-y-8">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="sessions">Meditation Sessions</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="tips">Meditation Tips</TabsTrigger>
              </TabsList>
            </div>
            
            {/* Meditation Sessions Tab */}
            <TabsContent value="sessions" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
                {sessions.map((session) => (
                  <Card key={session.id} className="overflow-hidden">
                    <img 
                      src={session.image} 
                      alt={session.title}
                      className="w-full h-40 object-cover"
                    />
                    <CardHeader>
                      <CardTitle>{session.title}</CardTitle>
                      <CardDescription>{session.duration} minutes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{session.description}</p>
                      <h4 className="font-medium mb-2">Benefits:</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600 mb-6">
                        {session.benefits.map((benefit, i) => (
                          <li key={i}>{benefit}</li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full"
                        onClick={() => startSession(session.id, session.duration)}
                        disabled={!!activeSession}
                      >
                        Start Session
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Track Your Progress</h2>
                <p className="mb-6">
                  Regular meditation practice can significantly improve your engineering abilities.
                  We recommend at least three 10-minute sessions per week.
                </p>
                <div className="flex justify-center">
                  <Button onClick={() => {
                    toast({
                      title: "Feature Coming Soon",
                      description: "Progress tracking will be available in the next update.",
                    });
                  }}>
                    View Your Meditation Stats
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Benefits Tab */}
            <TabsContent value="benefits">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-8 text-center">How Meditation Benefits Engineers</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex">
                      <div className="mr-4 text-3xl">{benefit.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-gray-700">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Science Behind Mindfulness</h3>
                  <p className="mb-4">
                    Research shows that regular meditation practice increases gray matter density
                    in brain regions associated with memory, learning, and emotional regulation.
                    For engineers and technical professionals, this translates to improved problem-solving
                    abilities and reduced stress when tackling complex projects.
                  </p>
                  <p>
                    A study published in the Journal of Cognitive Enhancement found that just 
                    10 minutes of mindfulness meditation per day improved participants' ability
                    to focus on complex tasks by 16% after 8 weeks.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            {/* Tips Tab */}
            <TabsContent value="tips">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-8 text-center">Meditation Tips for Beginners</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {tips.map((tip, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <CardTitle>{tip.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{tip.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-12 text-center">
                  <h3 className="text-xl font-bold mb-4">Join Our Weekly Group Meditation</h3>
                  <p className="mb-6">
                    Every Wednesday at 5:00 PM in the Electronics Lab. No experience necessary.
                  </p>
                  <Button onClick={() => {
                    toast({
                      title: "RSVP Received",
                      description: "We'll send you a reminder before the next session.",
                    });
                  }}>
                    RSVP for Next Session
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}
