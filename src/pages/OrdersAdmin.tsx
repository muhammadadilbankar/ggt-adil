import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
  products: Array<{
    product: {
      _id: string;
      name: string;
      price: number;
    };
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "completed" | "failed";
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  orderDate: string;
  notes?: string;
}

interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
}

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  // const fetchOrders = async () => {
  //   try {
  //     let url = "/api/orders";
  //     const params = new URLSearchParams();
      
  //     if (filterStatus) {
  //       params.append("status", filterStatus);
  //     }
  //     if (dateRange.startDate && dateRange.endDate) {
  //       params.append("startDate", dateRange.startDate);
  //       params.append("endDate", dateRange.endDate);
  //     }
      
  //     if (params.toString()) {
  //       url += `?${params.toString()}`;
  //     }

  //     const response = await axios.get(url);
  //     setOrders(response.data);
  //   } catch (error) {
  //     toast.error("Failed to fetch orders");
  //     console.error("Error fetching orders:", error);
  //   }
  // };
  const fetchOrders = async () => {
    console.log("Starting fetchOrders function");
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      console.log("Using token:", token ? "Token found" : "No token found");

      if (!token) {
        throw new Error("No authentication token found");
      }

      // Create base URL pointing to backend server
      let url = `${import.meta.env.VITE_API_URL}/api/orders`;
      const params = new URLSearchParams();

      // Add filters if specified
      if (filterStatus) {
        params.append("status", filterStatus);
      }
      if (dateRange.startDate && dateRange.endDate) {
        params.append("startDate", dateRange.startDate);
        params.append("endDate", dateRange.endDate);
      }

      // Append query string if there are parameters
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      console.log("Fetching orders from:", url);

      // Use axios with proper authorization header
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Orders data received:", response.data.length, "orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);

      // More detailed error handling
      const errorMessage = error.response?.data?.message ||
        error.message ||
        "Failed to fetch orders";

      toast.error(errorMessage);
    }
  };

  // const fetchStats = async () => {
  //   try {
  //     const response = await axios.get("/api/orders/stats");
  //     setStats(response.data);
  //   } catch (error) {
  //     toast.error("Failed to fetch order statistics");
  //     console.error("Error fetching stats:", error);
  //   }
  // };
  const fetchStats = async () => {
    console.log("Starting fetchStats function");
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      console.log("Using token for stats:", token ? "Token found" : "No token found");

      if (!token) {
        throw new Error("No authentication token found");
      }

      // Use absolute URL to backend server
      const url = `${import.meta.env.VITE_API_URL}/api/orders/stats`;
      console.log("Fetching order stats from:", url);

      // Add authorization header
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Stats data received:", response.data);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching order stats:", error);

      // More detailed error handling
      const errorMessage = error.response?.data?.message ||
        error.message ||
        "Failed to fetch order statistics";

      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchOrders(), fetchStats()]);
      setLoading(false);
    };
    loadData();
  }, [filterStatus, dateRange]);

  const updateOrderStatus = async (orderId: string, status: Order["status"]) => {
    try {
      await axios.patch(`/api/orders/${orderId}/status`, { status });
      toast.success("Order status updated successfully");
      fetchOrders();
      fetchStats();
    } catch (error) {
      toast.error("Failed to update order status");
      console.error("Error updating order status:", error);
    }
  };

  const updatePaymentStatus = async (orderId: string, paymentStatus: Order["paymentStatus"]) => {
    try {
      await axios.patch(`/api/orders/${orderId}/payment`, { paymentStatus });
      toast.success("Payment status updated successfully");
      fetchOrders();
      fetchStats();
    } catch (error) {
      toast.error("Failed to update payment status");
      console.error("Error updating payment status:", error);
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    
    try {
      await axios.delete(`/api/orders/${orderId}`);
      toast.success("Order deleted successfully");
      fetchOrders();
      fetchStats();
      setSelectedOrder(null);
    } catch (error) {
      toast.error("Failed to delete order");
      console.error("Error deleting order:", error);
    }
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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-red-600">Service Unavilable</h2>
        <p className="mt-1 text-sm text-gray-600">
          Review and manage orders
        </p>
      </div>
      {/* Stats Section */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
            <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Pending Orders</h3>
            <p className="text-2xl font-semibold text-yellow-600">{stats.pendingOrders}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Completed Orders</h3>
            <p className="text-2xl font-semibold text-green-600">{stats.completedOrders}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="text-2xl font-semibold text-blue-600">₹{stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <input
          type="date"
          value={dateRange.startDate}
          onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
          className="px-4 py-2 border rounded-md"
        />
        <input
          type="date"
          value={dateRange.endDate}
          onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
          className="px-4 py-2 border rounded-md"
        />
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order._id.slice(-6)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order.user.name}</div>
                  <div className="text-sm text-gray-500">{order.user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(order.orderDate), "MMM d, yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{order.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value as Order["status"])}
                    className={`text-sm rounded-full px-3 py-1 font-semibold
                      ${order.status === "delivered" ? "text-green-800 bg-green-100" :
                        order.status === "cancelled" ? "text-red-800 bg-red-100" :
                        order.status === "pending" ? "text-yellow-800 bg-yellow-100" :
                        "text-blue-800 bg-blue-100"}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.paymentStatus}
                    onChange={(e) => updatePaymentStatus(order._id, e.target.value as Order["paymentStatus"])}
                    className={`text-sm rounded-full px-3 py-1 font-semibold
                      ${order.paymentStatus === "completed" ? "text-green-800 bg-green-100" :
                        order.paymentStatus === "failed" ? "text-red-800 bg-red-100" :
                        "text-yellow-800 bg-yellow-100"}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium mb-2">Customer Information</h4>
                <p>Name: {selectedOrder.user.name}</p>
                <p>Email: {selectedOrder.user.email}</p>
                <p>Phone: {selectedOrder.user.phone}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Shipping Address</h4>
                <p>{selectedOrder.shippingAddress.street}</p>
                <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                <p>{selectedOrder.shippingAddress.zipCode}</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Products</h4>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="text-left">Product</th>
                    <th className="text-left">Quantity</th>
                    <th className="text-left">Price</th>
                    <th className="text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.products.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2">{item.product.name}</td>
                      <td className="py-2">{item.quantity}</td>
                      <td className="py-2">₹{item.price.toFixed(2)}</td>
                      <td className="py-2">₹{(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="text-right font-medium py-2">Total Amount:</td>
                    <td className="py-2 font-medium">₹{selectedOrder.totalAmount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {selectedOrder.notes && (
              <div className="mb-4">
                <h4 className="font-medium mb-2">Notes</h4>
                <p className="text-gray-600">{selectedOrder.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 