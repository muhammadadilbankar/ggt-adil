import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface CommunitySubmission {
  _id: string;
  title: string;
  description: string;
  projectUrl?: string;
  images: string[];
  tags: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  } | null;
}

export default function CommunitySubmissionsAdmin() {
  const { token } = useAuth();
  const [submissions, setSubmissions] = useState<CommunitySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const API_URL = import.meta.env.VITE_API_URL; //|| 'http://localhost:5000';

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/community`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response format');
      }
      
      setSubmissions(response.data);
      setError('');
    } catch (err: any) {
      console.error('Error fetching submissions:', err);
      setError(err.response?.data?.message || 'Failed to fetch submissions');
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchSubmissions();
    }
  }, [token]);

  const handleStatusUpdate = async (submissionId: string, newStatus: 'approved' | 'rejected', rejectionReason?: string) => {
    try {
      await axios.put(
        `${API_URL}/api/community/${submissionId}/status`,
        { 
          status: newStatus,
          ...(rejectionReason && { rejectionReason })
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchSubmissions();
      setError('');
    } catch (err: any) {
      console.error('Error updating submission status:', err);
      setError(err.response?.data?.message || 'Failed to update submission status');
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const filteredSubmissions = submissions.filter(submission => submission.status === activeTab);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Community Project Submissions</h2>
        <p className="mt-1 text-sm text-gray-600">
          Review and manage community project submissions
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          {(['pending', 'approved', 'rejected'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="ml-2 text-xs text-gray-500">
                ({submissions.filter(s => s.status === tab).length})
              </span>
            </button>
          ))}
        </nav>
      </div>

      {filteredSubmissions.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No {activeTab} submissions found.</p>
      ) : (
        <div className="space-y-6">
          {filteredSubmissions.map((submission) => (
            <div
              key={submission._id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{submission.title}</h3>
                  <StatusBadge status={submission.status} />
                </div>

                <div className="prose max-w-none text-gray-500 mb-4">
                  <p>{submission.description}</p>
                </div>

                {submission.tags && submission.tags.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {submission.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {submission.images && submission.images.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Project Images:</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {submission.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Project screenshot ${index + 1}`}
                          className="rounded-lg shadow-sm"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-image.png';
                            target.alt = 'Image failed to load';
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {submission.projectUrl && (
                  <div className="mb-4">
                    <a
                      href={submission.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Project →
                    </a>
                  </div>
                )}

                <div className="mt-4">
                  <div className="text-sm text-gray-500 mb-4">
                    Submitted by {submission.userId?.name || 'Unknown'} on{' '}
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </div>
                  {submission.status === 'pending' && (
                    <div className="space-x-4">
                      <button
                        onClick={() => handleStatusUpdate(submission._id, 'approved')}
                        className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          const reason = window.prompt('Please enter a reason for rejection:');
                          if (reason) {
                            handleStatusUpdate(submission._id, 'rejected', reason);
                          }
                        }}
                        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 