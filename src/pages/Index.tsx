
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { events, projects } from "@/data/mockData";

const Index = () => {
  const featuredProjects = projects.filter(project => project.approved).slice(0, 3);
  const upcomingEvents = events.slice(0, 2);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Welcome to ElectronNexus Club
              </h1>
              <p className="text-lg mb-8">
                A community of electronics enthusiasts where innovation meets education.
                Join us to learn, build, and grow your electronics skills!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/skilling">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Explore Courses
                  </Button>
                </Link>
                <Link to="/submission">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                    Submit Project
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-10">
              <div className="bg-white rounded-lg p-1 shadow-xl">
                <img
                  src="https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Electronics Workshop"
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50 circuit-bg">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Electronics Shop</h3>
                <p className="text-gray-600 mb-4">Purchase components and equipment for your electronics projects at student-friendly prices.</p>
                <Link to="/products" className="text-primary font-medium hover:underline">
                  Browse Products
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Skill Development</h3>
                <p className="text-gray-600 mb-4">Learn electronics through structured courses designed for all skill levels.</p>
                <Link to="/skilling" className="text-primary font-medium hover:underline">
                  View Courses
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Events & Workshops</h3>
                <p className="text-gray-600 mb-4">Participate in hands-on workshops, hackathons, and guest lectures.</p>
                <Link to="/events" className="text-primary font-medium hover:underline">
                  See Events
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-600 mb-4">Connect with fellow enthusiasts, share projects, and collaborate on ideas.</p>
                <Link to="/community" className="text-primary font-medium hover:underline">
                  Join Community
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold">Featured Projects</h2>
              <Link to="/community" className="text-primary font-medium hover:underline">
                View All Projects
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-2">By {project.author}</p>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
                        View Project
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold">Upcoming Events</h2>
              <Link to="/events" className="text-primary font-medium hover:underline">
                View All Events
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                  {event.image && (
                    <div className="md:w-1/3">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Date:</span> {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-gray-600 mb-4">
                      <span className="font-medium">Location:</span> {event.location}
                    </p>
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    <Link to={`/events#event-${event.id}`}>
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                        Event Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Our Community?</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Submit your projects, participate in events, and connect with fellow electronics enthusiasts!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/submission">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Submit Your Project
                </Button>
              </Link>
              <Link to="/events">
                <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-primary">
                  Upcoming Events
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
