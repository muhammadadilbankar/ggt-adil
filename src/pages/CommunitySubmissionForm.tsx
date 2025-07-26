import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL; //|| 'http://localhost:5000';

interface ProjectSubmission {
  title: string;
  description: string;
  githubLink?: string;
  liveLink?: string;
  technologies: string[];
  images: File[];
}

interface ValidationErrors {
  title?: string;
  description?: string;
  githubLink?: string;
  liveLink?: string;
  technologies?: string;
  images?: string;
}

export default function CommunitySubmissionForm() {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState<ProjectSubmission>({
    title: '',
    description: '',
    githubLink: '',
    liveLink: '',
    technologies: [],
    images: [],
  });

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to submit a project",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [isAuthenticated, navigate, toast]);

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      errors.title = 'Title must be at least 3 characters long';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      errors.description = 'Description must be at least 20 characters long';
    }

    if (formData.githubLink && !formData.githubLink.match(/^https?:\/\/github\.com\/.+/)) {
      errors.githubLink = 'Please enter a valid GitHub URL';
    }

    if (formData.liveLink && !formData.liveLink.match(/^https?:\/\/.+/)) {
      errors.liveLink = 'Please enter a valid URL';
    }

    if (formData.technologies.length === 0) {
      errors.technologies = 'At least one technology is required';
    }

    if (formData.images.length === 0) {
      errors.images = 'At least one image is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images') {
          Array.from(value).forEach((file) => {
            formDataToSend.append('images', file);
          });
        } else if (key === 'technologies') {
          formDataToSend.append('technologies', JSON.stringify(value));
        } else {
          formDataToSend.append(key, value as string);
        }
      });

      await axios.post(
        `${API_URL}/api/community/showcase`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setSuccess(true);
      toast({
        title: "Success",
        description: "Project submitted successfully!",
      });
      setTimeout(() => {
        navigate('/community');
      }, 2000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to submit project';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(e.target.files as FileList),
      }));
    }
  };

  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techs = e.target.value.split(',').map((tech) => tech.trim());
    setFormData((prev) => ({
      ...prev,
      technologies: techs,
    }));
  };

  if (!isAuthenticated) {
    return null; // Don't render anything if not authenticated
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Submit Your Project</h2>
            <p className="mt-2 text-gray-600">
              Share your amazing project with the community
            </p>
          </div>

          {success ? (
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <p className="text-green-600 font-medium">
                Project submitted successfully! Redirecting...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 rounded-md">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Project Title *
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    validationErrors.title ? 'border-red-500' : ''
                  }`}
                  value={formData.title}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, title: e.target.value }));
                    setValidationErrors((prev) => ({ ...prev, title: undefined }));
                  }}
                />
                {validationErrors.title && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Project Description *
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    validationErrors.description ? 'border-red-500' : ''
                  }`}
                  value={formData.description}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, description: e.target.value }));
                    setValidationErrors((prev) => ({ ...prev, description: undefined }));
                  }}
                />
                {validationErrors.description && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
                )}
              </div>

              <div>
                <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700">
                  GitHub Link
                </label>
                <input
                  type="url"
                  id="githubLink"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    validationErrors.githubLink ? 'border-red-500' : ''
                  }`}
                  value={formData.githubLink}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, githubLink: e.target.value }));
                    setValidationErrors((prev) => ({ ...prev, githubLink: undefined }));
                  }}
                />
                {validationErrors.githubLink && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.githubLink}</p>
                )}
              </div>

              <div>
                <label htmlFor="liveLink" className="block text-sm font-medium text-gray-700">
                  Live Demo Link
                </label>
                <input
                  type="url"
                  id="liveLink"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    validationErrors.liveLink ? 'border-red-500' : ''
                  }`}
                  value={formData.liveLink}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, liveLink: e.target.value }));
                    setValidationErrors((prev) => ({ ...prev, liveLink: undefined }));
                  }}
                />
                {validationErrors.liveLink && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.liveLink}</p>
                )}
              </div>

              <div>
                <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">
                  Technologies Used * (comma-separated)
                </label>
                <input
                  type="text"
                  id="technologies"
                  required
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    validationErrors.technologies ? 'border-red-500' : ''
                  }`}
                  placeholder="React, TypeScript, Node.js"
                  onChange={handleTechChange}
                />
                {validationErrors.technologies && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.technologies}</p>
                )}
              </div>

              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                  Project Images *
                </label>
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  required
                  className={`mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100 ${
                      validationErrors.images ? 'border-red-500' : ''
                    }`}
                  onChange={handleImageChange}
                />
                {validationErrors.images && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.images}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    loading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Project'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 