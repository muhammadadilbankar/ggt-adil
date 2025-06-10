import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export default function SkillingsAdmin() {
  const [skillings, setSkillings] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", videoUrl: "", tags: "" });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchSkillings();
  }, []);

  const fetchSkillings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/skillings", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch skillings');
      }
      
      const data = await response.json();
      setSkillings(data || []);
    } catch (error) {
      console.error('Error fetching skillings:', error);
      toast({
        title: "Error",
        description: "Failed to load skillings",
        variant: "destructive",
      });
      setSkillings([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteSkilling = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/skillings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete skilling');
      }

      setSkillings(skillings.filter((s) => s._id !== id));
      toast({
        title: "Success",
        description: "Skilling deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting skilling:', error);
      toast({
        title: "Error",
        description: "Failed to delete skilling",
        variant: "destructive",
      });
    }
  };

  const addSkilling = async (e) => {
    e.preventDefault();
    try {
      const skillingData = {
        ...form,
        tags: form.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      };

      const response = await fetch("http://localhost:5000/api/skillings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(skillingData),
      });

      if (!response.ok) {
        throw new Error('Failed to add skilling');
      }

      const newSkilling = await response.json();
      setSkillings([...skillings, newSkilling]);
      setForm({ title: "", description: "", videoUrl: "", tags: "" });
      toast({
        title: "Success",
        description: "Skilling added successfully",
      });
    } catch (error) {
      console.error('Error adding skilling:', error);
      toast({
        title: "Error",
        description: "Failed to add skilling",
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
      <h2 className="text-2xl font-bold mb-6">Skillings Management</h2>

      <form onSubmit={addSkilling} className="mb-8 space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Enter description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
          <input
            type="url"
            placeholder="Enter video URL"
            value={form.videoUrl}
            onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            placeholder="web, development, react"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add Skilling
        </button>
      </form>

      {skillings.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No skillings found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillings.map((s) => (
            <div key={s._id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <button 
                  onClick={() => deleteSkilling(s._id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              {s.description && (
                <p className="text-gray-600 text-sm mb-2">{s.description}</p>
              )}
              <a 
                href={s.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 text-sm inline-block mb-2"
              >
                Watch Video
              </a>
              <div className="flex flex-wrap gap-2">
                {s.tags?.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
