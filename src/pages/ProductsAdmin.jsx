import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", price: "" });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts(products.filter((p) => p._id !== id));
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const newProduct = await response.json();
      setProducts([...products, newProduct]);
      setForm({ title: "", description: "", price: "" });
      toast({
        title: "Success",
        description: "Product added successfully",
      });
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Failed to add product",
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
        <div>
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
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
          {products.map((p) => (
            <li key={p._id} className="flex items-center justify-between p-4 border rounded">
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-gray-600">${p.price}</p>
                {p.description && <p className="text-sm text-gray-500">{p.description}</p>}
              </div>
              <button 
                onClick={() => deleteProduct(p._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
