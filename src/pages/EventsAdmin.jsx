import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export default function EventsAdmin() {
  const [events, setEvents] = useState([]);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  var [titleDict, setTitleDict] = useState({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    shortDescription: "",
    location: "",
    imageUrl: "",
    redirectUrl: "",
    date: "",
    tags: "",
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      fetchEventImages();
      setFlag(true)
    }
  }, [events]);

  function cleanString(str) {
  return str.replace(/[^a-zA-Z0-9]/g, '');
  }

  const [flag, setFlag] = useState(false)

  const fetchEventImages = async () => {
    if(flag){
      console.log("Events:",events);
      console.log("Fetching event images");
      const token = localStorage.getItem("token");
      console.log("Using token:", token ? "Token found" : "No token found");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const newDict = {}

   await Promise.all(
      events.map(async (event)=>{
        var key = "events";
        var imageIdname = cleanString(event.title);
        // console.log("Key",key)
        // console.log("ImageID:",imageIdname)
        try {
      const res = await axios.post('http://localhost:5000/imageapi/imageCloudinary/getimageURL', 
        { key, imageIdname },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //console.log("API Fetch done")
      //setStatus(`Fetched Image URL: ${res.data.result}`);
      newDict[event.title] = res.data.result
      if(res.data.result != ""){
        console.log("image Found")
      }
      //setImageUrl(res.data.result);
    } catch (err) {
      console.error(err);
      newDict[event.title] = "";
      //setStatus('Failed to fetch image');
    }
        //newDict[product.title] = cleanString(product.title);
      })
    );

      setTitleDict(newDict)
      setFlag(true)
      console.log("NEWDICT:",newDict)
  }
}

  // const fetchEvents = async () => {
  //   console.log("Starting fetchEvents function");
  //   try {
  //     const response = await fetch("http://localhost:5000/api/events", {
  //       headers: {
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //     });
  //     console.log("Response status:", response.status);
  //     console.log("Response headers:", Object.fromEntries(response.headers.entries()));
      
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       console.log("Error response body:", errorText);
  //       throw new Error('Failed to fetch events');
  //     }
      
  //     const data = await response.json();
  //     console.log("Fetched data:", data);
  //     setEvents(data || []);
  //   } catch (error) {
  //     console.error('Error fetching events:', error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to load events",
  //       variant: "destructive",
  //     });
  //     setEvents([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchEvents = async () => {
    console.log("Starting fetchEvents function");
    try {
      // Get token from localStorage instead of user object
      const token = localStorage.getItem("token");
      console.log("Using token:", token ? `${token.substring(0, 10)}...` : "none");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("http://localhost:5000/api/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response body:", errorText);
        throw new Error(`Failed to fetch events: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to load events",
        variant: "destructive",
      });
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };
  // const deleteEvent = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/events/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to delete event');
  //     }

  //     setEvents(events.filter((e) => e._id !== id));
  //     toast({
  //       title: "Success",
  //       description: "Event deleted successfully",
  //     });
  //   } catch (error) {
  //     console.error('Error deleting event:', error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to delete event",
  //       variant: "destructive",
  //     });
  //   }
  // };

  // const addEvent = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const eventData = {
  //       ...form,
  //       tags: form.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
  //     };

  //     const response = await fetch("http://localhost:5000/api/events", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //       body: JSON.stringify(eventData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to add event');
  //     }

  //     const newEvent = await response.json();
  //     setEvents([...events, newEvent]);
  //     setForm({
  //       title: "",
  //       description: "",
  //       imageUrl: "",
  //       redirectUrl: "",
  //       date: "",
  //       tags: "",
  //     });
  //     toast({
  //       title: "Success",
  //       description: "Event added successfully",
  //     });
  //   } catch (error) {
  //     console.error('Error adding event:', error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to add event",
  //       variant: "destructive",
  //     });
  //   }
  // };
  const deleteEvent = async (id) => {
    console.log("Deleting event with ID:", id);
    try {
      // Get token from localStorage instead of user object
      const token = localStorage.getItem("token");
      console.log("Using token:", token ? "Token found" : "No token found");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`http://localhost:5000/api/events/${id}`, {
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
          `Failed to delete event: ${response.status}`
        );
      }

      console.log("Event deleted successfully");
      setEvents(events.filter((e) => e._id !== id));
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  const deleteEventImage = async (imagetitle) => {
      const token = localStorage.getItem("token");
      console.log("Using token:", token ? "Token found" : "No token found");

      if (!token) {
        throw new Error("No authentication token found");
      }
      var imagename = cleanString(imagetitle);
      var key = 'events'
      var imageId = imagename;
      if (!key || !imageId) return;
      console.log("Key:",key)
      console.log("imageid:",imageId)
      try {
      const res = await axios.post('http://localhost:5000/imageapi/imageCloudinary/delete', 
        { key, imageId },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      if(res.data.result.result == "ok"|| res == "ok"){
        setStatus("Success")
      }
      else{
        setStatus("Error")
      }
      toast(
        {
          title: `${status}`,
          description:`Image delete ${status}`
        }
      )
      //setStatus(`Deleted: ${res.data.result.result}`);
      console.log(res)
    } catch (err) {
      console.error(err);
      setStatus('Failed to delete image');
       toast(
        {
          title: "Error",
          description:`${status}`
        }
      )
    }
  }

  const addEvent = async (e) => {
    e.preventDefault();
    console.log("Raw form data before submission:", JSON.stringify(form, null, 2));
    // Add validation for location
    if (!form.location?.trim()) {
      toast({
        title: "Error",
        description: "Location is required for all events",
        variant: "destructive",
      });
      return;
    }

    const key = 'events';
    if (!form.title){
      throw new Error("Title required");
    }
    const imageId = cleanString(form.title);
     if (!key || !imageId || !file) {
      setStatus('Please fill all fields and select an image.');
       toast({
        title:"Error",
        description:`${status}`
      })
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);
    formData.append('folder', key); // e.g., 'products'
    formData.append('public_id', imageId); // e.g., 'apple123'

    try {
      // Get token from localStorage instead of user object
      const token = localStorage.getItem("token");
      console.log("Using token:", token ? "Token found" : "No token found");

      if (!token) {
        throw new Error("No authentication token found");
      }

      // Process tags if they exist in the form
      const eventData = {
        ...form,
        tags: form.tags?.split(',').map(tag => tag.trim()).filter(tag => tag) || [],
      };

      console.log("Processed event data:", eventData);
      console.log("Final request payload:", JSON.stringify(eventData, null, 2));

      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        // Try to get detailed error message from response
        const errorData = await response.json().catch(() => null);
        console.log("Error response:", errorData);
        throw new Error(
          errorData?.message ||
          `Failed to add event: ${response.status}`
        );
      }

      //Upload image to Cloudinary
      try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        formData
      );
      setStatus('Success'); //URL: ${res.data.secure_url}
      console.log(`URL: ${res.data.secure_url}`)
      } catch (err) {
      console.error(err);
      setStatus('Error');
      }


      const newEvent = await response.json();
      console.log("Event added successfully:", newEvent);

      setEvents([...events, newEvent]);
      setForm({
        title: "",
        description: "",
        imageUrl: "",
        redirectUrl: "",
        date: "",
        tags: "",
        location: ""
      });
      setFile(null)
      toast({
        title: "Success",
        description: "Event added successfully",
      });
      toast({
        title: `${status}`,
        description: `Event Image upload ${status}`,
      })
    } catch (error) {
      console.error('Error adding event:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add event",
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
      <h2 className="text-2xl font-bold mb-6">Events Management</h2>

      <form onSubmit={addEvent} className="mb-8 space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter event title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
          <input
            type="text"
            placeholder="About the Event"
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Enter event description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
          />
        </div>
        <div>
        <h3>Upload Image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 w-full"
        />
          <label className="block text-sm font-medium text-gray-700 mb-1">or Backup Image URL</label>
          <input
            type="text"
            placeholder="Enter Google Drive Image URL (Backup)"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Registration URL</label>
          <input
            type="url"
            placeholder="Enter registration URL (Unstop/other platform)"
            value={form.redirectUrl}
            onChange={(e) => setForm({ ...form, redirectUrl: e.target.value })}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
          <input
            type="datetime-local"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => {
              console.log("Location changed to:", e.target.value);
              setForm({ ...form, location: e.target.value });
            }}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            placeholder="hackathon, workshop, competition"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add Event
        </button>
      </form>

      {events.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No events found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
          const imageUrl = titleDict[event.title]
          return(
            <div key={event._id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <button 
                  onClick={() => {
                    deleteEvent(event._id);
                    deleteEventImage(event.title);
                    }
                  }
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              {/* {event.imageUrl && (
                <img 
                  src={event.imageUrl} 
                  alt={event.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )} */}
              {imageUrl &&  (
            <img
              src={imageUrl}
              alt="event-image"
              className="mt-2 w-24 h-24 object-cover rounded"
            />
          )}
              {event.description && (
                <p className="text-gray-600 text-sm mb-2">{event.description}</p>
              )}
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-700">Date: </span>
                <span className="text-sm text-gray-600">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
              <a 
                href={event.redirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 text-sm inline-block mb-2"
              >
                Register Now
              </a>
              <div className="flex flex-wrap gap-2">
                {event.tags?.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-300">If Image Unavailable to Fetch.&nbsp;
            <a href={event.imageUrl} className="text-blue-300 underline text-sm">View Image</a></p>
            </div>
          )}
        )}
        </div>
      )}
    </div>
  );
}
