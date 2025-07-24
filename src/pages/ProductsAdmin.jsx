import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  //const [imageId, setImageId] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  var [titleDict, setTitleDict] = useState({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    stock: 0
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
  if (products.length > 0) {
    fetchProductImages();
    setFlag(true)
  }
}, [products]);

  function cleanString(str) {
  return str.replace(/[^a-zA-Z0-9]/g, '');
  }

  const [flag, setFlag] = useState(false)
  
  const fetchProductImages = async () => {
    if(flag){
   // console.log("Products:",products);
   // console.log("Fetching product images");
    const token = localStorage.getItem("token");
     // console.log("Using token:", token ? "Token found" : "No token found");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const newDict = {}

   await Promise.all(
      products.map(async (product)=>{
        var key = "products";
        var imageIdname = cleanString(product.title);
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
      newDict[product.title] = res.data.result
      if(res.data.result != ""){
       // console.log("image Found")
      }
      //setImageUrl(res.data.result);
    } catch (err) {
      console.error(err);
      newDict[product.title] = "";
      //setStatus('Failed to fetch image');
    }
        //newDict[product.title] = cleanString(product.title);
      })
    );

      setTitleDict(newDict)
      setFlag(true)
     // console.log("NEWDICT:",newDict)
  }
}


  const fetchProducts = async () => {
    setTitleDict({});
   // console.log("Starting fetchProducts function");
    try {
      // Get token from localStorage instead of user object
      const token = localStorage.getItem("token");
     // console.log("Using token:", token ? "Token found" : "No token found");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     // console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
       // console.log("Error response body:", errorText);
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data = await response.json();
     // console.log("Fetched products data:", data);
      setProducts(data || []);
      //fetchProductImages();
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to load products",
        variant: "destructive",
      });
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
   // console.log("Deleting product with ID:", id);
    try {
      // Get token from localStorage instead of user object
      const token = localStorage.getItem("token");
     // console.log("Using token:", token ? "Token found" : "No token found");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
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
          `Failed to delete product: ${response.status}`
        );
      }

     // console.log("Product deleted successfully");
      setProducts(products.filter((p) => p._id !== id));
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const deleteProductImage = async (imagetitle) => {
    const token = localStorage.getItem("token");
     // console.log("Using token:", token ? "Token found" : "No token found");

      if (!token) {
        throw new Error("No authentication token found");
      }
      var imagename = cleanString(imagetitle);
      var key = 'products'
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


  const addProduct = async (e) => {
    e.preventDefault();
   // console.log("Adding product:", form);

    const key = 'products';

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
     // console.log("Using token:", token ? "Token found" : "No token found");

      if (!token) {
        throw new Error("No authentication token found");
      }

      // Validate required fields
      if (!form.title || !form.price) {
        throw new Error("Title and price are required");
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

     // console.log("Response status:", response.status);

      if (!response.ok) {
        // Try to get detailed error message from response
        const errorData = await response.json().catch(() => null);
       // console.log("Error response:", errorData);
        throw new Error(
          errorData?.message ||
          `Failed to add product: ${response.status}`
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

      const newProduct = await response.json();
     // console.log("Product added successfully:", newProduct);

      setProducts([...products, newProduct]);
      setForm({ title: "", description: "", price: "", imageUrl:"", stock: 0});
      setFile(null)
      toast({
        title: "Success",
        description: "Product added successfully.",
      });
      toast({
        title: `${status}`,
        description: `Product Image upload ${status}`,
      })
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add product",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Products</h2>

      <form onSubmit={addProduct} className="mb-8 space-y-4">
        <div>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <h3>Upload Image</h3>
        <div>
           <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 w-full"
          />
        </div>
        {/* <div>
          <input
          type="text"
          placeholder="Custom Image Name (e.g. pcb123)"
          value={imageId}
          onChange={(e) => setImageId(e.target.value)}
          className="border p-2 w-full"
        />
        </div> */}
        <h3>Backup Google Drive Image URL</h3>
        <div>
          <input
            type="text"
            placeholder="Google Drive Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <h3>Price</h3>
        <div>
          <input
            type="number"
            placeholder="Price in INR per Quantity"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <h3>Stock Quantity</h3>
        <div>
          <input
            type="number"
            placeholder="Stock Quantity"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((p) => {
            const imageUrl = titleDict[p.title]
          return (
              <li key={p._id} className="flex items-center justify-between p-4 border rounded">
                {imageUrl &&  (
            <img
              src={imageUrl}
              alt="product-image"
              className="mt-2 w-24 h-24 object-cover rounded"
            />
          )}
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-gray-600">Rs.{p.price}</p>
                  {p.description && <p className="text-sm text-gray-500">{p.description}</p>}
                  <p className="text-sm text-gray-300">If Image Unavailable to Fetch.&nbsp;
            <a href={p.imageUrl} target="_blank" className="text-blue-300 underline text-sm">View Image</a></p>
                </div>
                <button 
                  onClick={() => {
                  deleteProduct(p._id)
                  deleteProductImage(p.title)
                  }
                }
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
          )}
          )}
        </ul>
      )}
    </div>
  );
}
