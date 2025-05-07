import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { projects } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Community() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Only show approved projects
  const approvedProjects = projects.filter((project) => project.approved);

  const filteredProjects = approvedProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen pb-16">
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-12 mb-8">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Community Showcase</h1>
            <p className="text-lg max-w-3xl">
              Explore projects created by our club members. Get inspired and
              see what's possible with creativity and electronics skills.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Search and Submit */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
            <div className="w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Button className="w-full md:w-auto" asChild>
                <a href="/submission">Submit Your Project</a>
              </Button>
            </div>
          </div>

          {/* Projects Grid */}
          <Tabs defaultValue="all" className="mb-10">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="hardware">Hardware</TabsTrigger>
                <TabsTrigger value="software">Software</TabsTrigger>
                <TabsTrigger value="iot">IoT</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
                    >
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
                        <p className="text-gray-600 mb-2 text-sm">{new Date(project.date).toLocaleDateString()}</p>
                        <p className="text-gray-700 mb-4 line-clamp-2">{project.description}</p>
                        <Button variant="outline" onClick={() => setSelectedProject(project)}>
                          View Project
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-gray-500">No projects found matching your search.</p>
                    <Button variant="link" onClick={() => setSearchTerm("")}>
                      Clear search
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Other tabs would have similar content but filtered differently */}
            <TabsContent value="hardware">
              <div className="text-center py-10">
                <p className="text-gray-500">Use the category filter to browse hardware projects.</p>
              </div>
            </TabsContent>
            <TabsContent value="software">
              <div className="text-center py-10">
                <p className="text-gray-500">Use the category filter to browse software projects.</p>
              </div>
            </TabsContent>
            <TabsContent value="iot">
              <div className="text-center py-10">
                <p className="text-gray-500">Use the category filter to browse IoT projects.</p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Featured Members */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-10">
            <h2 className="text-2xl font-bold mb-8 text-center">Featured Club Members</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src="https://i.pravatar.cc/150?img=1" 
                    alt="John Smith"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium">John Smith</h3>
                <p className="text-sm text-gray-600">Club President</p>
              </div>
              <div>
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src="https://i.pravatar.cc/150?img=5" 
                    alt="Emma Johnson"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium">Emma Johnson</h3>
                <p className="text-sm text-gray-600">Project Lead</p>
              </div>
              <div>
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src="https://i.pravatar.cc/150?img=12" 
                    alt="Michael Brown"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium">Michael Brown</h3>
                <p className="text-sm text-gray-600">Hardware Specialist</p>
              </div>
              <div>
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src="https://i.pravatar.cc/150?img=9" 
                    alt="Sarah Wilson"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium">Sarah Wilson</h3>
                <p className="text-sm text-gray-600">IoT Developer</p>
              </div>
            </div>
          </div>

          {/* Community Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">45+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">120+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">36</div>
              <div className="text-gray-600">Workshops Held</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">12</div>
              <div className="text-gray-600">Awards Won</div>
            </div>
          </div>

          {/* Join CTA */}
          <div className="bg-gradient-to-r from-secondary to-primary text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Become a member of our electronics club to access exclusive resources, 
              participate in workshops, and collaborate with fellow enthusiasts.
            </p>
            <Button 
              className="bg-white text-primary hover:bg-gray-100"
              onClick={() => {
                window.location.href = "/membership";
              }}
            >
              Become a Member
            </Button>
          </div>
        </div>
      </main>

      {/* Project Details Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
              <DialogDescription>
                By {selectedProject.author} • {new Date(selectedProject.date).toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {selectedProject.image && (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full max-h-96 object-cover rounded-md"
                />
              )}
              <p className="text-gray-700">{selectedProject.description}</p>
              
              {selectedProject.video && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Project Demo Video:</h4>
                  <div className="bg-gray-100 p-4 rounded-md text-center">
                    <p>Video link: <a href={selectedProject.video} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{selectedProject.video}</a></p>
                  </div>
                </div>
              )}
              
              {selectedProject.link && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Project Details:</h4>
                  <div className="bg-gray-100 p-4 rounded-md text-center">
                    <p>For more information, visit: <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{selectedProject.link}</a></p>
                  </div>
                </div>
              )}
              
              <div className="pt-4 flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedProject(null)}
                >
                  Close
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
