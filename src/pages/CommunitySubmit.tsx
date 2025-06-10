import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ProjectFormData {
  title: string;
  description: string;
  projectUrl: string;
  imageUrl: string;
  tags: string;
}

export default function CommunitySubmit() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    projectUrl: '',
    imageUrl: '',
    tags: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        toast.error('Please log in to submit a project');
        return;
      }

      const data = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        userId
      };

      await axios.post('/api/community/submit', data);
      toast.success('Project submitted successfully! Waiting for admin approval.');

      // Reset form
      setFormData({
        title: '',
        description: '',
        projectUrl: '',
        imageUrl: '',
        tags: ''
      });
    } catch (error) {
      toast.error('Failed to submit project');
      console.error('Error submitting project:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6">Submit Your Project</h1>
            <p className="text-gray-600 mb-8">
              Share your creative project with the community. All submissions will be reviewed by our admins before being published.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter your project title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your project in detail"
                  className="h-32"
                  required
                />
              </div>

              <div>
                <Label htmlFor="projectUrl">Project URL</Label>
                <Input
                  id="projectUrl"
                  type="url"
                  value={formData.projectUrl}
                  onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                  placeholder="Link to your project (GitHub, Demo, etc.)"
                  required
                />
              </div>

              <div>
                <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="Link to a preview image of your project"
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Add tags separated by commas (e.g., react, web, mobile)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Separate tags with commas
                </p>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Project'}
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-4">Submission Guidelines</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Projects must be your own work or clearly credit contributors</li>
              <li>Include a working link to your project (GitHub, live demo, etc.)</li>
              <li>Provide a clear description of what your project does</li>
              <li>Add relevant tags to help others find your project</li>
              <li>Submissions will be reviewed by admins before being published</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 