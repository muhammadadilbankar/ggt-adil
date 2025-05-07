
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { courses } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

export default function Skilling() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = (courseTitle: string) => {
    toast({
      title: "Enrollment Request Sent",
      description: `You've requested to join "${courseTitle}". A club administrator will contact you with further details.`,
    });
  };

  // Group courses by level for the filter sidebar
  const levels = [...new Set(courses.map((course) => course.level))];

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen pb-16">
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-12 mb-8">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Electronics Skill Development</h1>
            <p className="text-lg max-w-3xl">
              Enhance your electronics knowledge with our curated courses and workshops. 
              From beginner basics to advanced concepts, we offer hands-on learning
              experiences for all skill levels.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="md:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
                <h2 className="text-xl font-bold mb-4">Search & Filter</h2>
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-6"
                />

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Filter by Level</h3>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <div key={level} className="flex items-center">
                        <Badge variant={level === "Beginner" ? "default" : level === "Intermediate" ? "secondary" : "outline"}>
                          {level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Not sure which course is right for you? Contact our club mentors 
                    for personalized guidance.
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => {
                    toast({
                      title: "Request Sent",
                      description: "A club mentor will contact you soon to discuss course options.",
                    });
                  }}>
                    Request Guidance
                  </Button>
                </div>
              </div>
            </div>

            {/* Courses Section */}
            <div className="md:w-3/4">
              <h2 className="text-2xl font-bold mb-6">Available Courses</h2>

              {filteredCourses.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <p className="text-gray-500">No courses matching your search criteria.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
                    >
                      <div className="md:w-1/3">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex flex-wrap justify-between items-start mb-2">
                          <h3 className="text-xl font-bold">{course.title}</h3>
                          <Badge variant={course.level === "Beginner" ? "default" : course.level === "Intermediate" ? "secondary" : "outline"}>
                            {course.level}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">
                          Duration: {course.duration}
                        </p>
                        <p className="text-gray-700 mb-6">
                          {course.description}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <Button
                            onClick={() => handleEnroll(course.title)}
                          >
                            Enroll Now
                          </Button>
                          <Button variant="outline">
                            View Syllabus
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Instructor Section */}
              <div className="mt-12 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Our Instructors</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xl font-bold">JS</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Prof. John Smith</h3>
                      <p className="text-sm text-gray-600">Digital Electronics</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xl font-bold">AT</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Dr. Alice Thomas</h3>
                      <p className="text-sm text-gray-600">Embedded Systems</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xl font-bold">RJ</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Robert Johnson</h3>
                      <p className="text-sm text-gray-600">PCB Design</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xl font-bold">MP</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Maria Parker</h3>
                      <p className="text-sm text-gray-600">IoT Applications</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
