import express from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  togglePublish
} from '../controllers/eventController.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Protected routes - require authentication and admin access
router.use(isAuthenticated);
router.use(isAdmin);

// Get all events with filters
router.get('/', getAllEvents);

// Get single event
router.get('/:id', getEventById);

// Create new event
router.post('/', createEvent);

// Update event
router.put('/:id', updateEvent);

// Delete event
router.delete('/:id', deleteEvent);

// Toggle publish status
router.patch('/:id/publish', togglePublish);

export default router;
