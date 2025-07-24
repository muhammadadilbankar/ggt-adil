import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

// Define Product interface to match your MongoDB schema
interface Product {
  _id: string;
  title: string;
  description?: string;  // Optional since not required in schema
  price: number;
  imageUrl?: string;     // Optional since not required in schema
  stock: number;
  // No need to include createdAt and updatedAt as they're automatically handled by timestamps: true
}

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState('');
  var [titleDict, setTitleDict] = useState({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Get the token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("No authentication token found");
          // You might want to redirect to login page here
          // window.location.href = '/login';
          setLoading(false);
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/public`)

        // const response = await fetch("http://localhost:5000/api/products", {
        //   headers: {
        //     "Authorization": `Bearer ${token}` //possible error here it should be - Authorization: `Bearer ${token}`
        //   }
        // });

        if (response.status === 401) {
          // Token expired or invalid
          console.error("Authentication token expired or invalid");
          toast({
            title: "Authentication Error",
            description: "Your session has expired. Please log in again.",
            variant: "destructive",
          });
          // Redirect to login or show login modal
          // window.location.href = '/login';
          setLoading(false);
          return;
        }

        // if (!response.ok) {
        //   throw new Error(`Failed to fetch products: ${response.status}`);
        // }

        const data = await response.data;
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/imageapi/imageCloudinarypublic/publicgetimageURL`, 
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


  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  );
 // console.log(filteredProducts);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product._id === product._id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }

    toast({
      title: "Added to cart",
      description: `${product.title} added to your cart`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product._id !== productId));

    toast({
      title: "Removed from cart",
      description: "Item removed from your cart",
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(
      cart.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 pb-16">
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-12 mb-8">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Electronics Products</h1>
            <p className="text-lg max-w-2xl">
              Browse our collection of components, kits, and equipment for your
              electronics projects. Special discounts available for club members.
            </p>
          </div>
        </div>

    <div className="flex py-8 max-w-7xl mx-auto px-6">
      <a href="https://forms.gle/8ckh3FpvsZS1BvCR6" target="_blank" className="inline-block">
        <button className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out">
          {/* Animated background overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Button content */}
          <div className="relative flex items-center space-x-3">
            <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            
            <span className="text-lg tracking-wide">
              Click here to order products!
            </span>
            
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
          
          {/* Pulse animation ring */}
          <div className="absolute inset-0 rounded-full bg-white opacity-20 scale-0 group-hover:scale-110 group-hover:opacity-0 transition-all duration-500"></div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>
      </a>
    </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Products Section */}
            <div className="md:w-2/3">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex gap-4 mb-6">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>

                {loading ? (
                  <div className="text-center py-8">Loading products...</div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => {
                      const imageUrl = titleDict[product.title]
                    return(
                      <div
                        key={product._id}
                        className="border rounded-lg overflow-hidden bg-white transition-transform hover:shadow-lg"
                      >
                         {imageUrl &&  (
            <img
              src={imageUrl}
              alt="product-image"
              className="mt-2 w-full h-24 object-cover rounded"
            />
          )}
                        {/* {product.imageUrl ? (
                          // <img
                          //   src={product.imageUrl}
                          //   alt={product.title}
                          //   className="w-full h-48 object-cover"
                          // />
                          <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                            <a href={product.imageUrl} className='underline text-blue-500' target='_blank'>View Product Image</a>
                          </div>
                        ) : (
                          <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                            No Image
                          </div>
                        )} */}
                        <div className="p-4">
                          <h3 className="font-semibold text-lg">{product.title}</h3>
                          {product.description && (
                            <p className="text-gray-600 text-sm mb-2">
                              {product.description}
                            </p>
                          )}
                          <div className="flex justify-between items-center mt-4">
                            <span className="font-bold">Rs.{product.price.toFixed(2)}</span>
                            <span className="text-sm text-gray-500">
                              {product.stock > 0
                                ? `${product.stock} in stock`
                                : "Out of stock"}
                            </span>
                          </div>
                          <Button
                            onClick={() => addToCart(product)}
                            className="w-full mt-4"
                            disabled={product.stock === 0}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    )}
                    )}

                    {filteredProducts.length === 0 && !loading && (
                      <div className="col-span-3 py-8 text-center text-gray-500">
                        No products matching your search were found.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Cart Section */}
            <div className="md:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
                <h2 className="text-xl font-bold mb-4">Your Cart (Check Total Price Only)</h2>
                {cart.length === 0 ? (
                  <p className="text-gray-500 mb-4">Your cart is empty.</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto">
                      {cart.map((item) => (
                        <div
                          key={item.product._id}
                          className="flex border-b pb-4"
                        >
                          {item.product.imageUrl ? (
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded text-xs text-gray-500">
                              No Image
                            </div>
                          )}
                          <div className="ml-4 flex-grow">
                            <h4 className="font-medium">{item.product.title}</h4>
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product._id,
                                      item.quantity - 1
                                    )
                                  }
                                  className="bg-gray-200 px-2 py-1 rounded"
                                >
                                  -
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product._id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="bg-gray-200 px-2 py-1 rounded"
                                >
                                  +
                                </button>
                              </div>
                              <span className="font-medium">
                                Rs.{(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product._id)}
                            className="text-red-500 ml-2"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-2">
                        <span>Items:</span>
                        <span>{totalItems}</span>
                      </div>
                      <div className="flex justify-between font-bold mb-4">
                        <span>Total:</span>
                        <span>Rs.{totalPrice.toFixed(2)}</span>
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => {
                          toast({
                            title: "Thank you for choosing us!",
                            description: "You can place your order by filling our GForm: https://forms.gle/8ckh3FpvsZS1BvCR6 (at top of page) or contacting us at gogreenramakrishna@gmail.com!",
                          });
                          setCart([]);
                        }}
                      >
                        Checkout
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}