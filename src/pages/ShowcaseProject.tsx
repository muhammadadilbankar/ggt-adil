import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface ShowcaseFormData {
  title: string;
  description: string;
  projectUrl: string;
  imageUrl: string;
  tags: string;
  name: string;
  email: string;
}

export default function ShowcaseProject() {
  const [formData, setFormData] = useState<ShowcaseFormData>({
    title: '',
    description: '',
    projectUrl: '',
    imageUrl: '',
    tags: '',
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.projectUrl || !formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        projectUrl: formData.projectUrl,
        imageUrl: formData.imageUrl || undefined,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        submittedBy: {
          name: formData.name,
          email: formData.email
        }
      };

      await axios.post('/api/community/showcase', projectData);
      toast.success('Project submitted successfully for review!');
      setIsSuccess(true);
      
      // Reset form data
      setFormData({
        title: '',
        description: '',
        projectUrl: '',
        imageUrl: '',
        tags: '',
        name: '',
        email: ''
      });
    } catch (error) {
      console.error('Error submitting project:', error);
      toast.error('Failed to submit project. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Showcase Your Project</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Submit your project to be featured in our community showcase. All submissions are reviewed by our team before being published.
        </p>
      </div>

      {isSuccess && (
        <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium">Success!</h3>
              <div className="text-sm mt-1">
                Your project has been submitted for review. You'll be notified when it's approved and published.
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Details */}
              <div className="space-y-6 md:col-span-2">
                <h2 className="text-xl font-medium text-gray-900">Project Information</h2>
                
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Explain what your project does, technologies used, and any other interesting information."
                    required
                  />
                </div>
              </div>

              {/* Project Links */}
              <div>
                <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Project URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="projectUrl"
                  name="projectUrl"
                  value={formData.projectUrl}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://github.com/your-username/your-project"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Link to your GitHub repo, live demo, or product page
                </p>
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://example.com/your-image.jpg"
                />
                <p className="mt-1 text-xs text-gray-500">
                  URL to a screenshot or image of your project
                </p>
              </div>
            
              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="react, web development, machine learning"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Add relevant tags to make your project easier to discover
                </p>
              </div>

              {/* Contact Info */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  We'll notify you when your project is approved
                </p>
              </div>
            </div>

            {/* Image Preview */}
            {formData.imageUrl && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Image Preview</h3>
                <div className="border rounded-md overflow-hidden w-full max-w-md">
                  <img 
                    src={formData.imageUrl} 
                    alt="Project preview" 
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Invalid+Image+URL';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Terms */}
            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                  <p className="text-sm text-blue-700">
                    By submitting your project, you agree that it may be featured on our platform. 
                    We will review all submissions before publishing.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 