import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export default function CommunityAdmin() {
  const [communities, setCommunities] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    githubLink: "",
    submittedBy: "",
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    console.log("Starting fetchCommunities function");
    try {
      // Get token from localStorage instead of user object
      const token = localStorage.getItem("token");
      console.log("Using token:", token ? "Token found" : "No token found");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("http://localhost:5000/api/community", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response body:", errorText);
        throw new Error(`Failed to fetch communities: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched communities data:", data);
      setCommunities(data || []);
    } catch (error) {
      console.error('Error fetching communities:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to load communities",
        variant: "destructive",
      });
      setCommunities([]);
    } finally {
      setLoading(false);
    }
  };

  // const deleteCommunity = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/community/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to delete community');
  //     }

  //     setCommunities(communities.filter((c) => c._id !== id));
  //     toast({
  //       title: "Success",
  //       description: "Community deleted successfully",
  //     });
  //   } catch (error) {
  //     console.error('Error deleting community:', error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to delete community",
  //       variant: "destructive",
  //     });
  //   }
  // };
  const deleteCommunity = async (id) => {
    console.log("Deleting community with ID:", id);
    try {
      // Get token from localStorage instead of user object
      const token = localStorage.getItem("token");
      console.log("Using token:", token ? "Token found" : "No token found");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`http://localhost:5000/api/community/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Delete response status:", response.status);

      if (!response.ok) {
        // Try to get detailed error message from response
        const errorData = await response.json().catch(() => null);
        console.log("Error response:", errorData);
        throw new Error(
          errorData?.message ||
          `Failed to delete community: ${response.status}`
        );
      }

      console.log("Community deleted successfully");
      setCommunities(communities.filter((c) => c._id !== id));
      toast({
        title: "Success",
        description: "Community deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting community:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete community",
        variant: "destructive",
      });
    }
  };

  // const toggleApproval = async (id, currentStatus) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/community/${id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //       body: JSON.stringify({ isApproved: !currentStatus }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to update approval status');
  //     }

  //     const updatedCommunity = await response.json();
  //     setCommunities(communities.map(c =>
  //       c._id === id ? updatedCommunity : c
  //     ));
  //     toast({
  //       title: "Success",
  //       description: `Community ${!currentStatus ? 'approved' : 'unapproved'} successfully`,
  //     });
  //   } catch (error) {
  //     console.error('Error updating approval status:', error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to update approval status",
  //       variant: "destructive",
  //     });
  //   }
  // };
  const toggleApproval = async (id, currentStatus) => {
    try {
      // Get token from localStorage instead of user object
      const token = localStorage.getItem("token");
      console.log("Using token for approval toggle:", token ? "Token found" : "No token found");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`http://localhost:5000/api/community/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isApproved: !currentStatus }),
      });

      console.log("Approval toggle response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.log("Error response:", errorData);
        throw new Error(errorData?.message || 'Failed to update approval status');
      }

      const updatedCommunity = await response.json();
      setCommunities(communities.map(c =>
        c._id === id ? updatedCommunity : c
      ));
      toast({
        title: "Success",
        description: `Community ${!currentStatus ? 'approved' : 'unapproved'} successfully`,
      });
    } catch (error) {
      console.error('Error updating approval status:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update approval status",
        variant: "destructive",
      });
    }
  };

  const addCommunity = async (e) => {
    e.preventDefault();
    console.log("Adding community with form data:", form);

    try {
      // Get token from localStorage instead of user object
      const token = localStorage.getItem("token");
      console.log("Using token:", token ? "Token found" : "No token found");

      if (!token) {
        throw new Error("No authentication token found");
      }

      // Validate required fields
      if (!form.title || !form.description) {
        throw new Error("Title and description are required");
      }

      const response = await fetch("http://localhost:5000/api/community", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        // Try to get detailed error message from response
        const errorData = await response.json().catch(() => null);
        console.log("Error response:", errorData);
        throw new Error(
          errorData?.message ||
          `Failed to add community: ${response.status}`
        );
      }

      const newCommunity = await response.json();
      console.log("Community added successfully:", newCommunity);

      setCommunities([...communities, newCommunity]);
      setForm({
        title: "",
        description: "",
        imageUrl: "",
        githubLink: "",
        submittedBy: "",
      });
      toast({
        title: "Success",
        description: "Community added successfully",
      });
    } catch (error) {
      console.error('Error adding community:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add community",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Community Management (Projects and Google Groups)</h2>

      <form onSubmit={addCommunity} className="mb-8 space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter community title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Enter community description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            placeholder="Enter image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Community Link</label>
          <input
            type="url"
            placeholder="Enter Community link"
            value={form.githubLink}
            onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Submitted By</label>
          <input
            type="text"
            placeholder="Enter submitter's email or username"
            value={form.submittedBy}
            onChange={(e) => setForm({ ...form, submittedBy: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add Community
        </button>
      </form>

      {communities.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No communities found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {communities.map((community) => (
            <div key={community._id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{community.title}</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => toggleApproval(community._id, community.isApproved)}
                    className={`${
                      community.isApproved 
                        ? 'text-green-500 hover:text-green-700' 
                        : 'text-gray-500 hover:text-gray-700'
                    } transition-colors`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => deleteCommunity(community._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              {community.imageUrl && (
                <img 
                  src={community.imageUrl} 
                  alt={community.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
              {community.description && (
                <p className="text-gray-600 text-sm mb-2">{community.description}</p>
              )}
              <div className="space-y-2">
                {community.githubLink && (
                  <a 
                    href={community.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 text-sm flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    View on GitHub
                  </a>
                )}
                {community.submittedBy && (
                  <p className="text-sm text-gray-500">
                    Submitted by: {community.submittedBy}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Status: {community.isApproved ? 'Approved' : 'Pending'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
