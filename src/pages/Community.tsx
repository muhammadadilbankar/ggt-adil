import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
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
import { useNavigate } from 'react-router-dom';
import { useUser, RedirectToSignIn } from '@clerk/clerk-react';
import { useToast } from '@/components/ui/use-toast';



const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Project {
  _id: string;
  title: string;
  description: string;
  projectUrl: string;
  imageUrl?: string;
  tags: string[];
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  createdAt: string;
}

interface ProjectFormData {
  title: string;
  description: string;
  projectUrl: string;
  imageUrl: string;
  tags: string;
}

export default function Community() {
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [publicProjects, setPublicProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const [redirecting, setRedirecting] = useState(false);


  // const { toast } = useToast();

  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    projectUrl: '',
    imageUrl: '',
    tags: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      // Get public projects
      const publicResponse = await axios.get(`${API_URL}/api/community/public`);
      setPublicProjects(publicResponse.data);

      // Get user's projects if authenticated
      // if (isAuthenticated && token) {
      //   const userResponse = await axios.get(`${API_URL}/api/community/user/me`, {
      //     headers: { Authorization: `Bearer ${token}` }
      //   });
      //   setUserProjects(userResponse.data);
      // }
    } catch (error: any) {
      toast.error("Failed to fetch projects"
        // title: "Error",
        // description: error.response?.data?.message || "Failed to fetch projects",
        // variant: "destructive",
      );
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('token');
      console.log("Handled Submit:"+userId)
      if (!userId) {
        toast.error('Please log in to submit a project');
        return;
      }

      const data = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        userId
      };

      await axios.post('/api/community/submit/public', data);
      alert("Project submitted successfully! Waiting for admin approval.")
      toast.success('Project submitted successfully! Waiting for admin approval.');

      setShowForm(false);
      resetForm();
      fetchProjects();
    } catch (error) {
      toast.error('Failed to submit project');
      console.error('Error submitting project:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      projectUrl: '',
      imageUrl: '',
      tags: ''
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  

 const handleSubmitClick = () => {
  if (!isSignedIn) {
    setShowForm(false);
    setRedirecting(true); // <-- new state to trigger redirect
  } else {
    setShowForm(true);
  }
};


  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const filteredProjects = publicProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || project.tags.includes(activeTab);
    return matchesSearch && matchesTab;
  });

  const formatDate = (isoString:string) => {
  const date = new Date(isoString);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

  return (


    <>
      {redirecting && <RedirectToSignIn />}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Button 
                onClick={handleSubmitClick}
                className="w-full md:w-auto"
              >
                Submit Your Project
              </Button>
            </div>
          </div>

          {/* Google Community Groups */}
          <h1 className="text-4xl font-bold mb-6 justify-center align-items flex">Google Communities</h1>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.length > 0 ? (
                  filteredProjects
                  .filter(project => project.title.toLowerCase().includes("group"))
                  .map((project) => (
                    <div
                      key={project._id}
                      className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
                    >
                      <div className="p-6">
                        {project.imageUrl ? (
                        // <img
                        //   src={project.imageUrl}
                        //   alt={project.title}
                        //   className="w-full h-48 object-cover"
                        // />
                        <a href={project.imageUrl} className='underline text-blue-500'>View Image</a>
                      ): project.title.toLowerCase().includes("group") ? <></> : <span className='text-gray-500' >Image Unavailable</span>}
                        
                        <div className='flex flex-row justify-between items-center'>
                         <div className='mb-4'>
                            <h3 className="text-xl font-semibold">{project.title}</h3>
                            <h5 className="text-xs text-gray-500">{formatDate(project.createdAt)}</h5>
                          </div>
                        <Button 
                          className="w-full md:w-auto"
                        >
                          <a href={project.projectUrl}>Join Group</a>
                        </Button>
                        </div>
                        <p className="text-gray-600 mb-4 mt-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500">No Communities found</p>
                  </div>
                )}
              </div>

          {/* Projects Grid */}
          <h1 className="text-4xl font-bold mt-10 mb-6 justify-center align-items flex">Projects</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="hardware">Hardware</TabsTrigger>
                <TabsTrigger value="software">Software</TabsTrigger>
                <TabsTrigger value="iot">IoT</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.length > 0 ? (
                  filteredProjects
                  .filter(project => !project.title.toLowerCase().includes("group"))
                  .map((project) => (
                    <div
                      key={project._id}
                      className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
                    >
                      <div className="p-6">
                        {project.imageUrl ? (
                        <a href={project.imageUrl} className='underline text-blue-500'>View Image</a>
                      ): project.title.toLowerCase().includes("group") ? <></> : <span className='text-gray-500' >Image Unavailable</span>}
                        {/* CreatedAt:{project.createdAt}<br></br> */}
                        <div className='flex flex-row justify-between items-center'>
                          <div className='mb-4 mt-2'>
                            <h3 className="text-xl font-semibold">{project.title}</h3>
                            <h5 className="text-xs text-gray-500">{formatDate(project.createdAt)}</h5>
                          </div>
                          <Button 
                            className="w-full md:w-auto"
                          >
                            <a href={project.projectUrl}>View Project</a>
                          </Button>
                        </div>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500">No projects found</p>
                  </div>
                )}
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
      <Dialog open={showForm} onOpenChange={setShowForm}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className="text-xl font-bold">Submit Your Project</DialogTitle>
    </DialogHeader>
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <Input
        placeholder="Project Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <Input
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
      />
      <Input
        placeholder="Demo Video URL"
        value={formData.projectUrl}
        onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
        required
      />
      <Input
        placeholder="Image URL"
        value={formData.imageUrl}
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
      />
      <Input
        placeholder="Tags (comma-separated)"
        value={formData.tags}
        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
      />
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  </DialogContent>
</Dialog>

      <Footer />
    </>
  );
}
