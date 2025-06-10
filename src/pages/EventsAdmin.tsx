import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface EventFormData {
  title: string;
  description: string;
  date: string;
}

export default function EventsAdmin() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPublished, setFilterPublished] = useState<boolean | undefined>(undefined);

  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterPublished !== undefined) params.append('published', String(filterPublished));

      const response = await axios.get(`/api/events?${params.toString()}`);
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch events');
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/events/${editingId}`, formData);
        toast.success('Event updated successfully');
      } else {
        await axios.post('/api/events', formData);
        toast.success('Event created successfully');
      }

      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchEvents();
    } catch (error) {
      toast.error(editingId ? 'Failed to update event' : 'Failed to create event');
      console.error('Error saving event:', error);
    }
  };

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().split('T')[0]
    });
    setEditingId(event._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await axios.delete(`/api/events/${id}`);
      toast.success('Event deleted successfully');
      fetchEvents();
    } catch (error) {
      toast.error('Failed to delete event');
      console.error('Error deleting event:', error);
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      await axios.patch(`/api/events/${id}/publish`);
      toast.success('Publication status updated');
      fetchEvents();
    } catch (error) {
      toast.error('Failed to update publication status');
      console.error('Error toggling publish status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
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
        <h2 className="text-2xl font-bold">Event Management</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            resetForm();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {showForm ? 'Cancel' : 'Add New Event'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Event' : 'Add New Event'}
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
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
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
                {editingId ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md w-64"
        />
        
        <select
          value={filterPublished === undefined ? '' : String(filterPublished)}
          onChange={(e) => setFilterPublished(e.target.value === '' ? undefined : e.target.value === 'true')}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Status</option>
          <option value="true">Published</option>
          <option value="false">Draft</option>
        </select>

        <button
          onClick={() => {
            setSearchTerm('');
            setFilterPublished(undefined);
          }}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Clear Filters
        </button>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{event.title}</div>
                  <div className="text-sm text-gray-500">{event.description.substring(0, 100)}...</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(event.date), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleTogglePublish(event._id)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${event.published ?
                        'bg-green-100 text-green-800 hover:bg-green-200' :
                        'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    {event.published ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {events.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No events found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
} 