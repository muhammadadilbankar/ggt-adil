import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser, RedirectToSignIn } from '@clerk/clerk-react';
// import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@clerk/clerk-react'; // Make sure this is at the top

const API_URL = import.meta.env.VITE_API_URL; //|| 'http://localhost:5000';

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
  const [redirecting, setRedirecting] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [show, setShow] = useState(false);
  const { getToken } = useAuth();
  const [allProjectsNumber, setAllProjectsNumber] = useState(false)
  const [softwareProjectsTab, setSoftwareProjectsTab] = useState(false)
  const [hardwareProjectsTab, setHardwareProjectsTab] = useState(false)
  const [iotProjectsTab,setIotProjectsTab] = useState(false)


  const location = useLocation();
  // const { toast } = useToast();

  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    projectUrl: '',
    imageUrl: '',
    tags: ''
  });

  useEffect(() => {
    if (!isLoaded) return;
    fetchProjects();
    if (publicProjects.length > 0) {
      const tags = publicProjects.flatMap(project => project.tags || []);

      setSoftwareProjectsTab(tags.includes('software'));
      setHardwareProjectsTab(tags.includes('hardware'));
      setIotProjectsTab(tags.includes('iot'));
    }
    else {
      setSoftwareProjectsTab(false);
      setHardwareProjectsTab(false);
      setIotProjectsTab(false);
    }
  }, [isLoaded]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("showForm") === "true" && isSignedIn) {
      setShowForm(true);
    }
  }, [location.search, isSignedIn]);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);


  const fetchProjects = async () => {
    try {
      setLoading(true);
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
    setIsSubmitting(true)
    try {
      //const userId = localStorage.getItem('token');
      //console.log("Entered handleSubmit",userId)
      //console.log("Handled Submit:"+userId)
      // if (!userId) {
      //   toast.error('Please log in to submit a project');
      //   return;
      // }
      const data = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        //userId
      };

      await axios.post('/api/community/submit/public', data);
      alert("Project submitted successfully! Waiting for admin approval.")
      toast.success('Project submitted successfully! Waiting for admin approval.');

      setFormData({
      title: '',
      description: '',
      projectUrl: '',
      imageUrl: '',
      tags: ''
    });
      setShowForm(false);
      resetForm();
      fetchProjects();
    } catch (error) {
      toast.error('Failed to submit project');
      console.error('Error submitting project:', error);
    } finally {
    setIsSubmitting(false);
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

  const handleSubmitClick = () => {
    if (!isSignedIn) {
      setRedirecting(true);
      return;
    }
    setShowForm(true);
  };

  const filteredProjects = publicProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || project.tags.includes(activeTab);
    return matchesSearch && matchesTab;
  });

  if (!isLoaded) return null;
  if (redirecting) return <RedirectToSignIn redirectUrl="/community?showForm=true" />;

  function parseDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
}

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen pb-16 pt-10">
        {/* <div className="bg-gradient-to-r from-primary to-secondary text-white py-12 mb-8">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Community Showcase</h1>
            <p className="text-lg max-w-3xl">
              Explore projects created by our club members. Get inspired and see what's possible with creativity and electronics skills.
            </p>
          </div>
        </div> */}

        {/* Welcome to our community */}
        <div className={`transition-all duration-700 ease-out transform ${show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        } relative overflow-hidden bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-lg border border-green-100 mx-auto max-w-4xl`}>
      {/* Background decorative elements */}
      {/* <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full opacity-20 transform translate-x-8 -translate-y-8"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-200 rounded-full opacity-20 transform -translate-x-6 translate-y-6"></div> */}
      
      {/* Main content */}
      <div className="relative px-12 py-16 text-center">
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
            <img
      src="public/favicon-logo.png" // Replace with your image path
      alt="Community Icon"
      className="absolute w-12 h-12 object-contain"
    />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">
          Welcome to our{' '}
          <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            community
          </span>
        </h1>
        
        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
        
        <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
          Join thousands of like-minded individuals sharing ideas, experiences, and building lasting connections.
        </p>
      </div>
      
      {/* Subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </div>

        <div className={`mt-10 max-w-7xl mx-auto px-6 transition-all duration-700 ease-out transform ${show ? "translate-y-0 opacity-100 delay-300" : "translate-y-8 opacity-0"
        }`}>
          {/* Project Tabs */}
          {/* <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="hardware">Hardware</TabsTrigger>
                <TabsTrigger value="software">Software</TabsTrigger>
                <TabsTrigger value="iot">IoT</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <div
                      key={project._id}
                      className="bg-white rounded-lg shadow-md hover:scale-105 transition-transform overflow-hidden"
                    >
                      {project.imageUrl && (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-5">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <p className="text-gray-600 mt-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-200 text-sm px-3 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center col-span-full text-gray-500">No projects found</p>
                )}
              </div>
            </TabsContent>
          </Tabs> */}

    <div>
      {(() => {
        // Filter projects with "group" in title
        const groupProjects = filteredProjects.filter(project => 
          project.title.toLowerCase().includes('group')
        );
        
        // Filter projects without "group" in title
        const nonGroupProjects = filteredProjects.filter(project => 
          !project.title.toLowerCase().includes('group')
        );
        
        // Combine arrays: group projects first, then non-group projects
        const sortedProjects = [...groupProjects, ...nonGroupProjects];

        const sortedGroup = [...groupProjects]

        const sortedNonGroupProjects = [...nonGroupProjects]
        
        return sortedProjects.length > 0 ? (
          <>
          <div className='justify-center align-items items-center flex mb-8'>
            <h1 className='text-black-800 text-4xl font-bold'>Google Community Groups</h1>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
            {/* <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="hardware">Hardware</TabsTrigger>
                <TabsTrigger value="software">Software</TabsTrigger>
                <TabsTrigger value="iot">IoT</TabsTrigger>
              </TabsList>
            </div> */}
          <TabsContent value={activeTab}>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {
            sortedGroup.length > 0 ? (
          sortedGroup.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-lg shadow-md hover:scale-105 transition-transform overflow-hidden"
            >
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <h5 className='text-sm text-gray-500'>Created on {parseDate(`${project.createdAt}`)}</h5>
                  </div>
                  <div>
                    <Button>
                      <a href={project.projectUrl} target="_blank">Join Group</a>
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-sm px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))):(<>
          <p className="text-center col-span-full text-gray-500">No groups found &nbsp;&nbsp; OR &nbsp;&nbsp; No groups for chosen tab category &nbsp;&nbsp; OR &nbsp;&nbsp; Try logging in with us (Click on 'MDM Submit Project' tab) to view the Community Groups!</p>
          </>)
        }
        </div>
        </TabsContent>
      </Tabs>

        <div className='justify-center align-items items-center flex mb-8'>
            <h1 className='text-black-800 text-4xl font-bold'>Our Community Projects</h1>
        </div>
        {/* Search and Submit */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
            <div className="w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={handleSubmitClick}>
              Submit Your Project
            </Button>
          </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                {
                  hardwareProjectsTab ? (
                <TabsTrigger value="hardware">Hardware</TabsTrigger>):(<></>)
      }
      {          
                softwareProjectsTab ? (
                <TabsTrigger value="software">Software</TabsTrigger>):(<></>)
      }
      {
                iotProjectsTab?(
                <TabsTrigger value="iot">IoT</TabsTrigger>):(<></>)
      }
              </TabsList>
            </div>

      <TabsContent value={activeTab}>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          sortedNonGroupProjects.length > 0 ? (
          sortedNonGroupProjects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-lg shadow-md hover:scale-105 transition-transform overflow-hidden"
            >
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <h5 className='text-sm text-gray-500'>Submitted on {parseDate(`${project.createdAt}`)}</h5>
                  </div>
                  <div>
                    <Button>
                      <a href={project.projectUrl} target="_blank">View Project</a>
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-sm px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))):(<>
          <p className="text-center col-span-full text-gray-500">No projects found or OR Try logging in with us (Click on 'MDM Submit Project' tab) to view the Projects!</p>
          </>)
        }
        </div>
        </TabsContent>
      </Tabs>
        </>
        ) : (
          <p className="text-center col-span-full text-gray-500">No projects found or OR Try logging in with us (Click on 'MDM Submit Project' tab) to view the Projects!</p>
        );
      })()}
    </div>
        </div>
      </main>

      {/* Submission Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Submit Your Project</DialogTitle>
          </DialogHeader>
          <p>We are so glad you would like to share your project with our  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            community
          </span>! Please fill all the required details below, upon approval from website admin, your project will get featured on our website!</p>
          <p className='text-gray-500'>Note: <span className="text-red-400 font-bold">MDM</span> course students please do <span className='underline'>not</span> submit your project here. There is a separate tab as 'MDM Submit Project'.</p>
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
              placeholder="Demo Video URL (Google Drive Link)"
              value={formData.projectUrl}
              onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
              required
            />
            <Input
              placeholder="Image URL (Google Drive Link)"
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
