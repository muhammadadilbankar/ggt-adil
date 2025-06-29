import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { events, projects } from "@/data/mockData";
import { motion } from "framer-motion";
import Spline from '@splinetool/react-spline';

const Index = () => {
  const featuredProjects = projects.filter(project => project.approved).slice(0, 3);
  const upcomingEvents = events.slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-primary overflow-hidden">
          {/* Spline 3D Background */}
          <div className="absolute inset-0 z-0">
            <Spline 
              scene="https://prod.spline.design/us04LImB2HUgqS2d/scene.splinecode" 
              className="w-full h-full opacity-30"
            />
          </div>
          
          
          {/* Main Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-6 py-20">
            {/* Hero Content Grid */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Text Content */}
              <motion.div 
                className="text-center lg:text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.h1 
                  className="text-6xl md:text-8xl font-bold mb-8 text-white leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    GoGreen
                  </motion.span>
                  <motion.span 
                    className="block text-4xl md:text-5xl text-green-200 font-light mt-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    Technologies
                  </motion.span>
                </motion.h1>
                
                {/* Animated subtitle */}
                <motion.div
                  className="text-xl md:text-2xl text-green-100 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    Where innovation meets education.
                  </motion.span>
                  <br />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                  >
                    Join our community of electronics enthusiasts to learn, build, and grow together.
                  </motion.span>
                </motion.div>
                
                {/* CTA Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/skilling">
                      <Button size="lg" className="bg-white text-primary hover:bg-green-50 px-10 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        Explore Courses
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/submission">
                      <Button size="lg" className="bg-white text-primary hover:bg-green-50 px-10 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        Submit Project
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Right Column - Visual Content */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <div className="relative">
                  {/* Enhanced glow effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-3xl opacity-40"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.4, 0.6, 0.4],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                  
                  {/* Floating elements */}
                  <motion.div
                    className="absolute -top-6 -left-6 w-12 h-12 bg-green-400 rounded-full opacity-60"
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-6 -right-6 w-8 h-8 bg-blue-400 rounded-full opacity-60"
                    animate={{
                      y: [0, 15, 0],
                      rotate: [0, -360],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />
                  
                  {/* Main image container */}
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-3 border border-white/20">
                    <motion.img
                      src="https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Electronics Workshop"
                      className="rounded-2xl w-full h-auto shadow-2xl"
                      whileHover={{ 
                        scale: 1.02,
                        rotateY: 5
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Enhanced scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div 
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div 
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
                animate={{ 
                  y: [0, 8, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                What We Offer
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover everything you need to excel in electronics and join our thriving community
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                  title: "Electronics Shop",
                  description: "Purchase components and equipment for your electronics projects at student-friendly prices.",
                  link: "/products",
                  linkText: "Browse Products",
                  color: "bg-blue-500"
                },
                {
                  icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                  title: "Skill Development",
                  description: "Learn electronics through structured courses designed for all skill levels.",
                  link: "/skilling",
                  linkText: "View Courses",
                  color: "bg-primary"
                },
                {
                  icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                  title: "Events & Workshops",
                  description: "Participate in hands-on workshops, hackathons, and guest lectures.",
                  link: "/events",
                  linkText: "See Events",
                  color: "bg-secondary"
                },
                {
                  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                  title: "Community",
                  description: "Connect with fellow enthusiasts, share projects, and collaborate on ideas.",
                  link: "/community",
                  linkText: "Join Community",
                  color: "bg-green-500"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-xl"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                  ></motion.div>
                  <div className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <motion.div 
                      className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                    <Link to={feature.link} className="inline-flex items-center text-primary font-semibold hover:underline group-hover:scale-105 transition-transform duration-300">
                      {feature.linkText}
                      <motion.svg 
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        whileHover={{ x: 5 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              className="flex justify-between items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                  Featured Projects
                </h2>
                <p className="text-xl text-gray-600">Showcasing the best work from our community</p>
              </div>
              <Link to="/community" className="hidden md:block text-primary font-semibold hover:underline text-lg">
                View All Projects →
              </Link>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    {project.image && (
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-56 object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        ></motion.div>
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-primary font-medium mb-3">By {project.author}</p>
                      <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                      {project.link && (
                        <motion.a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center text-primary font-semibold hover:underline group-hover:scale-105 transition-transform duration-300"
                          whileHover={{ x: 5 }}
                        >
                          View Project
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link to="/community">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  View All Projects
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              className="flex justify-between items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                  Upcoming Events
                </h2>
                <p className="text-xl text-gray-600">Don't miss out on our exciting workshops and events</p>
              </div>
              <Link to="/events" className="hidden md:block text-primary font-semibold hover:underline text-lg">
                View All Events →
              </Link>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div className="flex flex-col lg:flex-row">
                      {event.image && (
                        <div className="lg:w-2/5 relative overflow-hidden">
                          <motion.img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-64 lg:h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          />
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          ></motion.div>
                        </div>
                      )}
                      <div className="p-8 lg:w-3/5">
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors duration-300">
                          {event.title}
                        </h3>
                        <div className="space-y-3 mb-6">
                          <motion.div 
                            className="flex items-center text-gray-600"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <svg className="w-5 h-5 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">
                              {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                          </motion.div>
                          <motion.div 
                            className="flex items-center text-gray-600"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <svg className="w-5 h-5 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-medium">{event.location}</span>
                          </motion.div>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>
                        <Link to={`/events#event-${event.id}`}>
                          <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                            Event Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link to="/events">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  View All Events
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-40 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
          
          <motion.div 
            className="relative max-w-4xl mx-auto px-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ready to Join Our Community?
            </motion.h2>
            <motion.p 
              className="text-xl text-green-100 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Submit your projects, participate in events, and connect with fellow electronics enthusiasts!
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/submission">
                <Button size="lg" className="bg-white text-primary hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Submit Your Project
                </Button>
              </Link>
              <Link to="/events">
              <Button size="lg" className="bg-white text-primary hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Upcoming Events
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
