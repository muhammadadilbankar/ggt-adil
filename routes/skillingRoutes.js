import express from 'express';
import {
  getAllSkilling,
  getSkillingById,
  createSkilling,
  updateSkilling,
  deleteSkilling,
  togglePublish
} from '../controllers/skillingController.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/public',getAllSkilling)
// Protected routes - require authentication and admin access
router.use(isAuthenticated);
router.use(isAdmin);

// Get all skilling content with filters
router.get('/', getAllSkilling);

// Get single skilling content
router.get('/:id', getSkillingById);

// Create new skilling content
router.post('/', createSkilling);

// Update skilling content
router.put('/:id', updateSkilling);

// Delete skilling content
router.delete('/:id', deleteSkilling);

// Toggle publish status
router.patch('/:id/publish', togglePublish);

export default router;
