import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
import axios from "axios";

// Define Event interface to match your MongoDB schema
interface Event {
  _id: string;
  title: string;
  description: string;
  shortDescription?: string;
  imageUrl?: string;
  redirectUrl: string;
  date: string;
  location: string;
  tags?: string[];
  published: boolean;
}

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
    var [titleDict, setTitleDict] = useState({});
  const { toast } = useToast();

  // useEffect(() => {
  //   if (events.length > 0) {
  //     console.log("First event:", events[0]);
  //     console.log("Location value:", events[0].location);
  //   }
  // }, [events]);
  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        // Get the token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("No authentication token found");
          // You might want to redirect to login page here
          // window.location.href = '/login';
          setLoading(false);
          return;
        }
        
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/public`);
        // const response = await fetch("http://localhost:5000/api/events", {
        //   headers: {
        //     "Authorization": `Bearer ${token}`
        //   }
        // });

        if (response.status === 401) {
          // Token expired or invalid
          console.error("Authentication token expired or invalid");
          toast({
            title: "Authentication Error",
            description: "Your session has expired. Please log in again.",
            variant: "destructive",
          });
          // Redirect to login or show login modal
          // window.location.href = '/login';
          setLoading(false);
          return;
        }

        // if (!response.ok) {
        //   throw new Error(`Failed to fetch events: ${response.status}`);
        // }

        const data = await response.data;
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast({
          title: "Error",
          description: "Failed to load events",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [toast]);

  useEffect(() => {
    if (events.length > 0) {
      fetchEventImages();
      setFlag(true)
    }
  }, [events]);

  function cleanString(str) {
    return str.replace(/[^a-zA-Z0-9]/g, '');
    }
  
  const [flag, setFlag] = useState(false)

  const fetchEventImages = async () => {
      if(flag){
        console.log("Events:",events);
        console.log("Fetching event images");
        const token = localStorage.getItem("token");
        console.log("Using token:", token ? "Token found" : "No token found");
  
        if (!token) {
          throw new Error("No authentication token found");
        }
  
        const newDict = {}
  
     await Promise.all(
        events.map(async (event)=>{
          var key = "events";
          var imageIdname = cleanString(event.title);
          // console.log("Key",key)
          // console.log("ImageID:",imageIdname)
          try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/imageapi/imageCloudinarypublic/publicgetimageURL`, 
          { key, imageIdname },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //console.log("API Fetch done")
        //setStatus(`Fetched Image URL: ${res.data.result}`);
        newDict[event.title] = res.data.result
        if(res.data.result != ""){
          console.log("image Found")
        }
        //setImageUrl(res.data.result);
      } catch (err) {
        console.error(err);
        newDict[event.title] = "";
        //setStatus('Failed to fetch image');
      }
          //newDict[product.title] = cleanString(product.title);
        })
      );
  
        setTitleDict(newDict)
        setFlag(true)
        console.log("NEWDICT:",newDict)
    }
  }
  // Filter events based on search term and selected date
  const filteredEvents = events.filter(
    (event) =>
      (searchTerm === "" ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!date || new Date(event.date).toDateString() === date.toDateString())
  );

  const handleRSVP = (eventTitle: string, eventURL:string) => {
    toast({
      title: "See you at the event!",
      //description: `You've requested to register for "${eventTitle}". We are redirecting you to the ${<a href={eventURL} className="underline">registration page</a>}.`,
      description: (
      <>
        You've requested to register for "<strong>{eventTitle}</strong>". We are redirecting you to the{" "}
        <a href={eventURL} className="underline" target="_blank" rel="noopener noreferrer">
          registration page
        </a>.
      </>
    ),
    });
  };

  // Get all event dates for calendar highlighting
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
            <div className="">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
                <div>
                  <h2 className="text-xl font-bold mb-4">Find Events</h2>
                  <Input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-6"
                  />
                </div>


                {/* <div className="">
                  <div className="">
                    <h3 className="font-medium mb-2">Filter by Date</h3>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border
                                [&_.rdp-table]:w-full 
                                [&_.rdp-day]:w-full 
                                [&_.rdp-caption_label]:text-center"
                  
                    />
                  </div>
                 </div> */}
                 {/* <div>
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
                </div> */}

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Event Categories</h3>
                  <div className="space-y-2">
                    {/* Display unique tags from events */}
                    {Array.from(new Set(events.flatMap(event => event.tags || []))).map((tag, index) => (
                      <div key={index} className="flex items-center">
                        <span className={`w-3 h-3 bg-${['primary', 'secondary', 'yellow-500', 'purple-500'][index % 4]} rounded-full mr-2`}></span>
                        <span>{tag}</span>
                      </div>
                    ))}
                    {/* Fallback if no tags */}
                    {events.flatMap(event => event.tags || []).length === 0 && (
                      <>
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
                          <span>Workshops</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-secondary rounded-full mr-2"></span>
                          <span>Competitions</span>
                        </div>
                      </>
                    )}
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
                      description: "Event suggestions can be submitted through the club email or sent to ysrao@spit.ac.in",
                    });
                  }}>
                    Suggest Event
                  </Button>
                </div>
              </div>
            </div>

            {/* Events List */}
            <div className="md:w-2/3 lg:w-3/4">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                      {filteredEvents.length} {filteredEvents.length === 1 ? "Event" : "Events"} Found
                    </h2>
                    {/* <Button onClick={() => {
                      toast({
                        title: "Calendar Synced",
                        description: "Events have been added to your calendar.",
                      });
                    }}>
                      Add to Calendar
                    </Button> */}
                  </div>

                  {filteredEvents.length === 0 ? 
                  (
                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                      <p className="text-gray-500">No events matching your criteria.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredEvents.map((event, index) => {
                        const imageUrl = titleDict[event.title]
                      return(
                        <div
                          key={event._id}
                          id={`event-${event._id}`}
                          className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                          {index === 0 && (
                          <div className="bg-primary text-white p-4 text-center">
                            <span className="font-bold text-xl">Featured Workshop</span>
                          </div>
                          )}
                          <div className="md:flex">
                            {imageUrl &&  (
            <img
              src={imageUrl}
              alt="event-image"
              className="mt-2 ml-2 w-auto h-full object-cover rounded"
            />
          )}
                            {/* {event.imageUrl ? (
                              <div className="md:w-1/3">
                                <img
                                  src={event.imageUrl}
                                  alt={event.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="md:w-1/3 bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">No Image</span>
                              </div>
                            )} */}
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
                                  <span>{event.location || "Location unspecified"}</span>
                                </div>
                              </div>
                              <p className="text-gray-700 mb-6">
                                {event.shortDescription || event.description.substring(0, 150) + (event.description.length > 150 ? "..." : "")}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {event.tags?.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex flex-wrap gap-3">
                                <Button
                                  asChild
                                  onClick={() => handleRSVP(event.title,event.redirectUrl)}
                                >
                                  <a
                                    href={event.redirectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Register Now
                                  </a>
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
                      )}
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Keep the Featured Workshop section if you want */}
              {/* {!loading && events.length > 0 && (
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
              )} */}
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
              {selectedEvent.imageUrl && (
                <img
                  src={selectedEvent.imageUrl}
                  alt={selectedEvent.title}
                  className="w-full h-64 object-cover rounded-md"
                />
              )}
              <p>{selectedEvent.description}</p>
              {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  <span className="font-medium">Tags:</span>
                  {selectedEvent.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="pt-4 border-t flex justify-end gap-3">
                <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                  Close
                </Button>
                <Button asChild onClick={() => {
                  handleRSVP(selectedEvent.title, selectedEvent.redirectUrl);
                  setSelectedEvent(null);
                }}>
                  <a
                    href={selectedEvent.redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register Now
                  </a>
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