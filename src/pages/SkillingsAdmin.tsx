import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

interface Skilling {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  resourceUrl: string | null;
  tags: string[];
  published: boolean;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  updatedAt: string;
}

interface SkillingFormData {
  title: string;
  description: string;
  videoUrl: string;
  resourceUrl: string;
  tags: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export default function SkillingsAdmin() {
  const [skillings, setSkillings] = useState<Skilling[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterPublished, setFilterPublished] = useState<boolean | undefined>(undefined);

  const [formData, setFormData] = useState<SkillingFormData>({
    title: '',
    description: '',
    videoUrl: '',
    resourceUrl: '',
    tags: '',
    duration: 0,
    difficulty: 'beginner'
  });

  useEffect(() => {
    fetchSkillings();
  }, []);

  const fetchSkillings = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterDifficulty) params.append('difficulty', filterDifficulty);
      if (filterPublished !== undefined) params.append('published', String(filterPublished));

      const response = await axios.get(`/api/skilling?${params.toString()}`);
      setSkillings(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch skilling content');
      console.error('Error fetching skilling content:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        resourceUrl: formData.resourceUrl || null
      };

      if (editingId) {
        await axios.put(`/api/skilling/${editingId}`, data);
        toast.success('Skilling content updated successfully');
      } else {
        await axios.post('/api/skilling', data);
        toast.success('Skilling content created successfully');
      }

      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchSkillings();
    } catch (error) {
      toast.error(editingId ? 'Failed to update skilling content' : 'Failed to create skilling content');
      console.error('Error saving skilling content:', error);
    }
  };

  const handleEdit = (skilling: Skilling) => {
    setFormData({
      title: skilling.title,
      description: skilling.description,
      videoUrl: skilling.videoUrl,
      resourceUrl: skilling.resourceUrl || '',
      tags: skilling.tags.join(', '),
      duration: skilling.duration,
      difficulty: skilling.difficulty
    });
    setEditingId(skilling._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this content?')) return;

    try {
      await axios.delete(`/api/skilling/${id}`);
      toast.success('Skilling content deleted successfully');
      fetchSkillings();
    } catch (error) {
      toast.error('Failed to delete skilling content');
      console.error('Error deleting skilling content:', error);
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      await axios.patch(`/api/skilling/${id}/publish`);
      toast.success('Publication status updated');
      fetchSkillings();
    } catch (error) {
      toast.error('Failed to update publication status');
      console.error('Error toggling publish status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      videoUrl: '',
      resourceUrl: '',
      tags: '',
      duration: 0,
      difficulty: 'beginner'
    });
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
        <h2 className="text-2xl font-bold">Skilling Content Management</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            resetForm();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {showForm ? 'Cancel' : 'Add New Content'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Content' : 'Add New Content'}
          </h3>
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
                <label className="block text-sm font-medium text-gray-700">Video URL</label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Resource URL (Optional)</label>
                <input
                  type="url"
                  value={formData.resourceUrl}
                  onChange={(e) => setFormData({ ...formData, resourceUrl: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as 'beginner' | 'intermediate' | 'advanced' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g. javascript, react, web"
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
                {editingId ? 'Update Content' : 'Create Content'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md w-64"
        />
        
        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <select
          value={filterPublished === undefined ? '' : String(filterPublished)}
          onChange={(e) => setFilterPublished(e.target.value === '' ? undefined : e.target.value === 'true')}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Status</option>
          <option value="true">Published</option>
          <option value="false">Unpublished</option>
        </select>

        <button
          onClick={() => {
            setSearchTerm('');
            setFilterDifficulty('');
            setFilterPublished(undefined);
          }}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Clear Filters
        </button>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {skillings.map((skilling) => (
              <tr key={skilling._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{skilling.title}</div>
                  <div className="text-sm text-gray-500">{skilling.tags.join(', ')}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${skilling.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      skilling.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                    {skilling.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {skilling.duration} min
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleTogglePublish(skilling._id)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${skilling.published ?
                        'bg-green-100 text-green-800 hover:bg-green-200' :
                        'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    {skilling.published ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(skilling)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(skilling._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {skillings.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No content found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
} 