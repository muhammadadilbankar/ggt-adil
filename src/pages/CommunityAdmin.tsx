import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

interface Project {
  _id: string;
  title: string;
  description: string;
  projectUrl: string;
  imageUrl?: string;
  tags: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedBy?: {
    name: string;
    email: string;
  };
  rejectionReason?: string;
  isAdminUpload: boolean;
  createdAt: string;
}

interface ProjectFormData {
  title: string;
  description: string;
  projectUrl: string;
  imageUrl: string;
  tags: string;
}

export default function CommunityAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

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
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterStatus) params.append('status', filterStatus);

      const response = await axios.get(`/api/community?${params.toString()}`);
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch projects');
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim())
      };

      await axios.post('/api/community', data);
      toast.success('Project uploaded successfully');

      setShowForm(false);
      resetForm();
      fetchProjects();
    } catch (error) {
      toast.error('Failed to upload project');
      console.error('Error uploading project:', error);
    }
  };

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      if (status === 'rejected' && !rejectionReason) {
        toast.error('Please provide a rejection reason');
        return;
      }

      await axios.put(`/api/community/${id}/status`, {
        status,
        rejectionReason: status === 'rejected' ? rejectionReason : undefined
      });

      toast.success(`Project ${status} successfully`);
      setShowRejectModal(false);
      setRejectingId(null);
      setRejectionReason('');
      fetchProjects();
    } catch (error) {
      toast.error(`Failed to ${status} project`);
      console.error('Error updating project status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await axios.delete(`/api/community/${id}`);
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project');
      console.error('Error deleting project:', error);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Community Projects</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            resetForm();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {showForm ? 'Cancel' : 'Upload Project'}
        </button>
      </div>

      {/* Upload Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Upload New Project</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Project URL</label>
                <input
                  type="url"
                  value={formData.projectUrl}
                  onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g. react, web, mobile"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Upload Project
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md w-64"
        />
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <button
          onClick={() => {
            setSearchTerm('');
            setFilterStatus('');
          }}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Clear Filters
        </button>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project._id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{project.title}</div>
                  <div className="text-sm text-gray-500">{project.description.substring(0, 100)}...</div>
                  <div className="mt-1 text-xs text-gray-500">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="mr-2 px-2 py-1 bg-gray-100 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {project.isAdminUpload ? (
                    <span className="italic">Admin Upload</span>
                  ) : project.submittedBy ? (
                    <>
                      <div>{project.submittedBy.name}</div>
                      <div className="text-xs">{project.submittedBy.email}</div>
                    </>
                  ) : (
                    'Unknown'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                  {project.status === 'rejected' && project.rejectionReason && (
                    <div className="mt-1 text-xs text-red-600">
                      Reason: {project.rejectionReason}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {project.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(project._id, 'approved')}
                        className="text-green-600 hover:text-green-900 mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          setRejectingId(project._id);
                          setShowRejectModal(true);
                        }}
                        className="text-red-600 hover:text-red-900 mr-2"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No projects found matching your criteria.
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Reject Project</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rejection Reason
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={3}
                className="w-full border rounded-md p-2"
                placeholder="Please provide a reason for rejection..."
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectingId(null);
                  setRejectionReason('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => rejectingId && handleStatusUpdate(rejectingId, 'rejected')}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 