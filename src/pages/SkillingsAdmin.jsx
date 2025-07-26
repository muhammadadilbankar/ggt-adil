import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import cloudinaryClient from "@/utils/cloudinaryClient"
// import {cloudinary as cloudinaryConfig} from "../utils/cloudinary"
// import uploadMiddleware from "../middleware/uploadMiddleware";
// const upload = uploadMiddleware("../../uploads");
import axios from "axios";

export default function SkillingsAdmin() {
  const [skillings, setSkillings] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    tags: "",
    syllabus: "",
    difficulty: "beginner",
    imageUrl: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  var [titleDict, setTitleDict] = useState({});
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchSkillings();
  }, []);

  useEffect(() => {
    if (skillings.length > 0) {
      fetchSkillingImages();
      setFlag(true)
    }
  }, [skillings]);

  function cleanString(str) {
  return str.replace(/[^a-zA-Z0-9]/g, '');
  }

  const [flag, setFlag] = useState(false)

  const fetchSkillings = async () => {
   // console.log("Starting fetchSkillings function");
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
     // console.log("Token exists:", !!token);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skilling`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     // console.log("Response status:", response.status);
     // console.log("Response headers:", Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
       // console.log("Error response body:", errorText);
        throw new Error(`Failed to fetch skillings: ${response.status} ${errorText}`);
      }

      const data = await response.json();
     // console.log("Fetched data:", data);
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

  const fetchSkillingImages = async() => {
    if(flag){
       // console.log("Skillings:",skillings);
       // console.log("Fetching skilling images");
        const token = localStorage.getItem("token");
       // console.log("Using token:", token ? "Token found" : "No token found");
    
        if (!token) {
          throw new Error("No authentication token found");
        }
    
        const newDict = {}
    
       await Promise.all(
          skillings.map(async (skilling)=>{
            var key = "skilling";
            var imageIdname = cleanString(skilling.title);
            // console.log("Key",key)
            // console.log("ImageID:",imageIdname)
            try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/imageapi/imageCloudinary/getimageURL`, 
            { key, imageIdname },{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          //console.log("API Fetch done")
          //setStatus(`Fetched Image URL: ${res.data.result}`);
          newDict[skilling.title] = res.data.result
          // if(res.data.result != ""){
          //   console.log("image Found")
          // }
          //setImageUrl(res.data.result);
        } catch (err) {
          console.error(err);
          newDict[skilling.title] = "";
          //setStatus('Failed to fetch image');
        }
            //newDict[product.title] = cleanString(product.title);
          })
        );
    
          setTitleDict(newDict)
          setFlag(true)
         // console.log("NEWDICT SKILLING:",newDict)
      }
  }
  

  const deleteSkilling = async (id) => {
   // console.log("Deleting skilling with ID:", id);
    try {
      // Get token from localStorage instead of user object
      const token = localStorage.getItem("token");
     // console.log("Using token:", token ? "Token found" : "No token found");

      if (!token) {
        throw new Error("No authentication token found");
      }

      // Fix URL path - should be "skilling" (singular) not "skillings"
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skilling/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

     // console.log("Delete response status:", response.status);

      if (!response.ok) {
        // Try to get detailed error message from response
        const errorData = await response.json().catch(() => null);
       // console.log("Error response:", errorData);
        throw new Error(
          errorData?.message ||
          `Failed to delete skilling: ${response.status}`
        );
      }

     // console.log("Skilling deleted successfully");
      setSkillings(skillings.filter((s) => s._id !== id));
      toast({
        title: "Success",
        description: "Skilling deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting skilling:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete skilling",
        variant: "destructive",
      });
    }
  };

  const deleteSkillingImage = async (imagetitle) => {
        const token = localStorage.getItem("token");
       // console.log("Using token:", token ? "Token found" : "No token found");
  
        if (!token) {
          throw new Error("No authentication token found");
        }
        var imagename = cleanString(imagetitle);
        var key = 'skilling'
        var imageId = imagename;
        if (!key || !imageId) return;
       // console.log("Key:",key)
       // console.log("imageid:",imageId)
        try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/imageapi/imageCloudinary/delete`, 
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
       // console.log(res)
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

  // Handle image file selection
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImageFile(file);
  //     // Create a preview URL for the selected image
  //     setImagePreview(URL.createObjectURL(file));
  //   }
  // };

  // Upload image to Cloudinary
  // const uploadImage = async () => {
  //   if (!imageFile) return null;

  //   try {
  //     setUploadingImage(true);

  //     const formData = new FormData();
  //     formData.append('file', imageFile);
  //     formData.append('upload_preset', cloudinaryConfig.uploadPreset);

  //     const response = await fetch(
  //       `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
  //       {
  //         method: 'POST',
  //         body: formData
  //       }
  //     );

  //     const data = await response.json();

  //     if (data.error) {
  //       throw new Error(data.error.message || 'Failed to upload image');
  //     }

  //     return data.secure_url;
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to upload image. Please try again.",
  //       variant: "destructive",
  //     });
  //     return null;
  //   } finally {
  //     setUploadingImage(false);
  //   }
  // };
  // Update your uploadImage function
  // const uploadImage = async () => {
  //   if (!imageFile) return null;

  //   try {
  //     setUploadingImage(true);

  //     const formData = new FormData();
  //     formData.append('file', imageFile);
  //     formData.append('upload_preset', cloudinaryClient.uploadPreset);

  //     console.log("Uploading to Cloudinary with cloud name:", cloudinaryClient.cloudName);

  //     // Use Cloudinary's upload API directly
  //     const response = await fetch(
  //       `https://api.cloudinary.com/v1_1/${cloudinaryClient.cloudName}/image/upload`,
  //       {
  //         method: 'POST',
  //         body: formData
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       console.error("Cloudinary upload failed:", response.status, errorText);
  //       throw new Error(`Upload failed: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("Cloudinary upload successful:", data);

  //     // Return the secure URL for the uploaded image
  //     return data.secure_url;
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to upload image. Please try again.",
  //       variant: "destructive",
  //     });
  //     return null;
  //   } finally {
  //     setUploadingImage(false);
  //   }
  // };
  // const compressImage = (file) => {
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.onload = function (event) {
  //       const img = new Image();
  //       img.onload = function () {
  //         const canvas = document.createElement('canvas');
  //         const MAX_WIDTH = 1200;
  //         const MAX_HEIGHT = 1200;
  //         let width = img.width;
  //         let height = img.height;

  //         if (width > height) {
  //           if (width > MAX_WIDTH) {
  //             height *= MAX_WIDTH / width;
  //             width = MAX_WIDTH;
  //           }
  //         } else {
  //           if (height > MAX_HEIGHT) {
  //             width *= MAX_HEIGHT / height;
  //             height = MAX_HEIGHT;
  //           }
  //         }

  //         canvas.width = width;
  //         canvas.height = height;
  //         const ctx = canvas.getContext('2d');
  //         ctx.drawImage(img, 0, 0, width, height);

  //         // You can adjust quality (0 to 1)
  //         const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
  //         resolve(compressedDataUrl);
  //       };
  //       img.src = event.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // };
  // // Upload image to Cloudinary
  // const uploadImage = async () => {
  //   if (!imageFile) return null;

  //   try {
  //     setUploadingImage(true);
  //     //compressing the image
  //     const compressedImage = await compressImage(imageFile);

  //     // Convert file to base64 string (similar to your chat app)
  //     const reader = new FileReader();

  //     // Create a promise to handle the FileReader async operation
  //     const base64Data = await new Promise((resolve, reject) => {
  //       reader.onload = () => resolve(reader.result);
  //       reader.onerror = (error) => reject(error);
  //       reader.readAsDataURL(imageFile);
  //     });

  //     // Get token from localStorage
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       throw new Error("No authentication token found");
  //     }

  //     // Send to server-side endpoint (like in your chat app)
  //     const response = await fetch("http://localhost:5000/api/upload", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ image: compressedImage }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Upload failed: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("Upload successful:", data);

  //     return data.imageUrl;
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to upload image. Please try again.",
  //       variant: "destructive",
  //     });
  //     return null;
  //   } finally {
  //     setUploadingImage(false);
  //   }
  // };
  
  const addSkilling = async (e) => {
    e.preventDefault();
   // console.log("Adding skilling with form data:", form);

    const key = 'skilling';
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
      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Upload image if one is selected
      let imageUrl = form.imageUrl;
      // if (imageFile) {
      //   imageUrl = await uploadImage();
      //   // if (!imageUrl) {
      //   //   throw new Error("Failed to upload image");
      //   // }
      // }

      // Process tags
      const skillingData = {
        ...form,
        imageUrl,
        tags: form.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      };

     // console.log("Processed skilling data:", skillingData);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skilling`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(skillingData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message ||
          `Failed to add skilling: ${response.status}`
        );
      }

      //Upload image to Cloudinary
            try {
            const res = await axios.post(
              `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
              formData
            );
            setStatus('Success'); //URL: ${res.data.secure_url}
           // console.log(`URL: ${res.data.secure_url}`)
            } catch (err) {
            console.error(err);
            setStatus('Error');
            }

      const newSkilling = await response.json();
     // console.log("Skilling added successfully:", newSkilling);

      setSkillings([...skillings, newSkilling]);
      setForm({
        title: "",
        description: "",
        videoUrl: "",
        tags: "",
        syllabus: "",
        difficulty: "beginner",
        imageUrl: ""
      });
      // setImageFile(null);
      // setImagePreview(null);
      setFile(null)
      toast({
        title: "Success",
        description: "Skilling added successfully",
      });
      toast({
        title: `${status}`,
        description: `Skilling Image upload ${status}`,
      })
    } catch (error) {
      console.error('Error adding skilling:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add skilling",
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
        {/* Title field */}
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

        {/* Image upload field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Image</label>
          <div className="flex items-center space-x-4">
          <h3>Upload Image</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {/* Optional: External image URL input */}
            <div className="text-sm text-gray-500">or</div>
              <input
                type="text"
                placeholder="Google Drive URL Link for Image(Backup)"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
          </div>

          {/* Image preview */}
          {/* {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-40 w-auto object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                }}
                className="text-xs text-red-500 mt-1"
              >
                Remove image
              </button>
            </div>
          )} */}
        </div>

        {/* Description field */}
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
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level</label>
          <select
            value={form.difficulty}
            onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Syllabus</label>
          <textarea
            placeholder="Enter course syllabus or learning topics"
            value={form.syllabus}
            onChange={(e) => setForm({ ...form, syllabus: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
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
          disabled={uploadingImage}
          className={`bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors ${uploadingImage ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {uploadingImage ? 'Uploading Image...' : 'Add Skilling'}
        </button>
      </form>

      {/* Skilllings list - update to show images */}
      {skillings.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No skillings found OR Try logging in with us (Click on 'MDM Submit Project' tab) to view the Skillings!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillings.map((s) => {
            const imageUrl = titleDict[s.title]
          return (
            <div key={s._id} className="bg-white p-4 rounded-lg shadow-md">
              {/* {s.imageUrl && (
                <div className="mb-3">
                  <img
                    src={s.imageUrl}
                    alt={s.title}
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )} */}
              {imageUrl &&  (
            <img
              src={imageUrl}
              alt="skilling-image"
              className="mt-2 w-24 h-24 object-cover rounded"
            />
          )}
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <button
                  onClick={() => {
                    deleteSkilling(s._id);
                    deleteSkillingImage(s.title);
                  }
                  }
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
              <p className="text-sm text-gray-300">If Image Unavailable to Fetch.&nbsp;
            <a href={s.imageUrl} target="_blank" className="text-blue-300 underline text-sm">View Image</a></p>
            </div>
          )}
          )}
        </div>
      )}
    </div>
  );
}
