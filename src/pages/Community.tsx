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
  const [redirecting, setRedirecting] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getToken } = useAuth();


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
  }, [isLoaded]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("showForm") === "true" && isSignedIn) {
      setShowForm(true);
    }
  }, [location.search, isSignedIn]);

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

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen pb-16">
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-12 mb-8">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Community Showcase</h1>
            <p className="text-lg max-w-3xl">
              Explore projects created by our club members. Get inspired and see what's possible with creativity and electronics skills.
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
              />
            </div>
            <Button onClick={handleSubmitClick}>
              Submit Your Project
            </Button>
          </div>

          {/* Project Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
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
          </Tabs>
        </div>
      </main>

      {/* Submission Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Your Project</DialogTitle>
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
