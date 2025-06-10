import express from 'express';
import {
  getAllSubmissions,
  getSubmissionById,
  createSubmission,
  deleteSubmission
} from '../controllers/submissionController.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import { validateSubmission } from '../middleware/validate.js';

const router = express.Router();

// Public route for creating submissions
router.post('/', validateSubmission, createSubmission);

// Protected routes (admin only)
router.get('/', isAuthenticated, isAdmin, getAllSubmissions);
router.get('/:id', isAuthenticated, isAdmin, getSubmissionById);
router.delete('/:id', isAuthenticated, isAdmin, deleteSubmission);

export default router;
