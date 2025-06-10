import express from 'express';
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
  getOrderStats
} from '../controllers/orderController.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import { validateOrder } from '../middleware/validate.js';

const router = express.Router();

// Protected routes - require authentication and admin access
router.use(isAuthenticated);
router.use(isAdmin);

// Get order statistics
router.get('/stats', getOrderStats);

// Get all orders with optional filtering
router.get('/', getAllOrders);

// Get single order
router.get('/:id', getOrderById);

// Create new order
router.post('/', validateOrder, createOrder);

// Update order status
router.patch('/:id/status', updateOrderStatus);

// Update payment status
router.patch('/:id/payment', updatePaymentStatus);

// Delete order
router.delete('/:id', deleteOrder);

export default router; 