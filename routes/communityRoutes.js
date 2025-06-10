import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  updateProjectStatus,
  deleteProject,
  submitUserProject,
  getUserProjects,
  getPublicProjects
} from '../controllers/communityController.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/community/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Public routes (no authentication needed)
router.get('/public', getPublicProjects); // Get all approved projects
router.get('/:id', getProjectById); // Public project details

// Protected routes (authentication needed)
router.get('/user/:userId', isAuthenticated, getUserProjects); // Get user's own projects
router.post('/submit', isAuthenticated, upload.array('images', 5), submitUserProject); // User project submission

// Admin routes
router.get('/', isAuthenticated, isAdmin, getAllProjects); // Admin view of all projects
router.post('/', isAuthenticated, isAdmin, upload.array('images', 5), createProject); // Admin project creation
router.put('/:id', isAuthenticated, isAdmin, upload.array('images', 5), updateProject); // Admin project update
router.put('/:id/status', isAuthenticated, isAdmin, updateProjectStatus); // Admin status update
router.delete('/:id', isAuthenticated, isAdmin, deleteProject); // Admin project deletion

export default router;
