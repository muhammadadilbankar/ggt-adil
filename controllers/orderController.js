import Order from '../models/Order.js';

// Get all orders with optional filtering
export const getAllOrders = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (startDate && endDate) {
      query.orderDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    const orders = await Order.find(query)
      .populate('products.product')
      .sort({ orderDate: -1 });
      
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('products.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new order
export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    
    const populatedOrder = await Order.findById(savedOrder._id)
      .populate('products.product');
    
    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('products.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    ).populate('products.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order statistics
export const getOrderStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const completedOrders = await Order.countDocuments({ status: 'delivered' });
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' }
        }
      }
    ]);

    res.json({
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 