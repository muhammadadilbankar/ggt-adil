
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { events } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const { toast } = useToast();

  const filteredEvents = events.filter(
    (event) =>
      (searchTerm === "" ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!date || new Date(event.date).toDateString() === date.toDateString())
  );

  const handleRSVP = (eventTitle: string) => {
    toast({
      title: "RSVP Successful",
      description: `You've successfully registered for "${eventTitle}". We'll send you a reminder before the event.`,
    });
  };

  const eventDates = events.map((event) => new Date(event.date));
  
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen pb-16">
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-12 mb-8">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Club Events & Workshops</h1>
            <p className="text-lg max-w-3xl">
              Stay updated with our upcoming events, workshops, and hackathons. 
              Join us to learn new skills, network with peers, and showcase your talents.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar with Calendar */}
            <div className="md:w-1/3 lg:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
                <h2 className="text-xl font-bold mb-4">Find Events</h2>
                <Input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-6"
                />

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Filter by Date</h3>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    highlightedDays={eventDates.map(date => date.getDate())}
                  />
                  {date && (
                    <div className="mt-2 text-right">
                      <Button 
                        variant="ghost" 
                        className="text-sm" 
                        onClick={() => setDate(undefined)}
                      >
                        Clear date
                      </Button>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Event Categories</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
                      <span>Workshops</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-secondary rounded-full mr-2"></span>
                      <span>Competitions</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                      <span>Lectures</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                      <span>Networking</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <h3 className="font-medium mb-2">Suggest an Event</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Have an idea for a workshop or event? Let us know!
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => {
                    toast({
                      title: "Thank you for your interest!",
                      description: "Event suggestions can be submitted through the club email.",
                    });
                  }}>
                    Suggest Event
                  </Button>
                </div>
              </div>
            </div>

            {/* Events List */}
            <div className="md:w-2/3 lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {filteredEvents.length} {filteredEvents.length === 1 ? "Event" : "Events"} Found
                </h2>
                <Button onClick={() => {
                  toast({
                    title: "Calendar Synced",
                    description: "Events have been added to your calendar.",
                  });
                }}>
                  Add to Calendar
                </Button>
              </div>

              {filteredEvents.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <p className="text-gray-500">No events matching your criteria.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      id={`event-${event.id}`}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="md:flex">
                        {event.image ? (
                          <div className="md:w-1/3">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="md:w-1/3 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                          </div>
                        )}
                        <div className="p-6 md:w-2/3">
                          <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                          <div className="flex flex-wrap gap-y-2 mb-4">
                            <div className="w-full sm:w-1/2 flex items-center text-gray-700">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span>
                                {format(new Date(event.date), "EEEE, MMMM d, yyyy")}
                              </span>
                            </div>
                            <div className="w-full sm:w-1/2 flex items-center text-gray-700">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-6">{event.description}</p>
                          <div className="flex flex-wrap gap-3">
                            <Button
                              onClick={() => handleRSVP(event.title)}
                            >
                              RSVP Now
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setSelectedEvent(event)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Featured Workshop */}
              <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-primary text-white p-4 text-center">
                  <span className="font-bold text-xl">Featured Workshop</span>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">PCB Design Masterclass</h3>
                  <p className="text-gray-600 mb-6">
                    A comprehensive 2-day workshop on professional PCB design techniques
                    with industry-standard tools. Limited spots available!
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium mb-2">What You'll Learn:</h4>
                      <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        <li>PCB layout fundamentals</li>
                        <li>Component selection</li>
                        <li>Design for manufacturing</li>
                        <li>Testing and troubleshooting</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Workshop Details:</h4>
                      <div className="text-gray-700 space-y-1">
                        <p>
                          <span className="font-medium">Date:</span> July 15-16, 2025
                        </p>
                        <p>
                          <span className="font-medium">Time:</span> 10:00 AM - 4:00 PM
                        </p>
                        <p>
                          <span className="font-medium">Location:</span> Engineering Lab 101
                        </p>
                        <p>
                          <span className="font-medium">Instructor:</span> Robert Johnson
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={() => {
                      toast({
                        title: "Registration Confirmed",
                        description: "You have reserved a spot for the PCB Design Masterclass.",
                      });
                    }}>
                      Register Now
                    </Button>
                    <Button variant="outline">Download Materials List</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Event Details Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        {selectedEvent && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogDescription>
                {format(new Date(selectedEvent.date), "EEEE, MMMM d, yyyy")} at {selectedEvent.location}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {selectedEvent.image && (
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-64 object-cover rounded-md"
                />
              )}
              <p>{selectedEvent.description}</p>
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">What to Bring:</h4>
                <ul className="list-disc pl-5">
                  <li>Laptop with required software installed</li>
                  <li>Student ID</li>
                  <li>Notebook and pen</li>
                </ul>
              </div>
              <div className="pt-4 border-t flex justify-end gap-3">
                <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                  Close
                </Button>
                <Button onClick={() => {
                  handleRSVP(selectedEvent.title);
                  setSelectedEvent(null);
                }}>
                  RSVP Now
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
      <Footer />
    </>
  );
}
