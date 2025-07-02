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
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
          {/* Spline 3D Background */}
          <div className="absolute inset-0 z-0">
            <Spline 
              scene="https://prod.spline.design/us04LImB2HUgqS2d/scene.splinecode" 
              className="w-full h-full opacity-90"
            />
          </div>
        </section>

        {/* About the Company Section */}
        <section className="py-16 bg-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
                About the Company
              </h2>
            </motion.div>
            <motion.div 
              className="bg-gray-100 rounded-2xl shadow-md p-8 md:p-12 max-w-5xl mx-auto relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-lg md:text-xl text-gray-800 text-center leading-relaxed">
                <span className="text-2xl align-top mr-1 text-primary">"</span>
                <span className="font-semibold text-primary">Go-Green Technologies Pvt. Ltd.</span> <span className="text-gray-700">formerly known as</span> <span className="font-semibold text-secondary">Emtron technologies</span> <span className="text-gray-700">is an</span> <span className="font-semibold text-green-700">IIT-Bombay alumnus venture</span> <span className="text-gray-700">and it is recognized as a Startup company by the Government of India. Currently, it is incubated at</span> <span className="font-semibold text-blue-700">Sardar Patel Technology Incubation Center (SP-TBI)</span>, Bhavans Campus, Andheri-W, Mumbai-58. <span className="text-gray-700">For the past twenty years, we are in the field of developing customizable solutions for</span> <span className="font-semibold text-primary">Cyber-Physical Systems</span>, <span className="font-semibold text-primary">and Digital Power Electronics applications</span>.
                <span className="text-2xl align-bottom ml-1 text-primary">"</span>
              </p>
              {/* <div className="text-center mt-6">
                <Link to="/about">
                  <Button className="bg-primary text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-primary/90 transition-all duration-300">Learn More</Button>
                </Link>
              </div> */}
            </motion.div>
          </div>
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

        {/* About the Managing Director Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
                About the Managing Director
              </h2>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-10 md:gap-16 mb-0">
              <img
                src="/ysr.png"
                alt="Dr. Y. Srinivasa Rao"
                className="w-80 h-80 object-cover rounded-2xl shadow-lg mb-8 md:mb-0"
              />
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-left">
                Dr. Y.Srinivasa Rao holds a Ph.D. degree from IIT-Bombay and has a work experience of more than 10 years in the industry. He has been in the teaching profession for over 30+ years, of which he has been associated with Bhartiya Vidya Bhavans' Sardar Patel College of Engineering and subsequently, Sardar Patel Institute of Technology for more than 20 years. He has served as the Head of Department several times and is currently the Vice-Principal as well as the Dean of R&D at Sardar Patel Institute of Technology. He is also a guest faculty for various institutes. Dr. Y. S. Rao has been an expert lecturer at Short Term Teachers Training Program (STTP) of ISTE and TEQIP programs of AICTE. The lecture topics cover robotics, embedded system design, real-time systems, DSP applications and many more. He has also developed IDE systems for short term training programs.
              </p>
            </div>
            <div className="max-w-4xl mx-auto mt-10">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-justify mb-6">
                He has been awarded by the IEEE Computer Society, Washington D.C., USA, at the International Design Competition (CSIDC-2002), for the project 'Swift Doc'. His research work ranges from Electrical Load Emulation using Power Electronic Converters, designing Real-time systems and operating system development for various applications, Signal processing to Embedded systems, VLSI design, Power electronics, etc. He has submitted seven patents, also consultant, and corporate trainer to companies like Gadhia Solar, Siemens Information Systems Ltd., KarRox Technologies Ltd., and L&T.
              </p>
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-justify">
                His major research publications are in Embedded Systems, Digital Power Electronics, and Communication Systems
              </p>
            </div>
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
