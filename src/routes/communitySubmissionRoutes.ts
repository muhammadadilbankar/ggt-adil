import express from 'express';
import multer from 'multer';
import { isAuthenticated, isAdmin } from '../middleware/auth';
import {
  createSubmission,
  getAllSubmissions,
  getApprovedSubmissions,
  updateSubmissionStatus,
  getUserSubmissions,
} from '../controllers/communitySubmissionController';
import {
  validateSubmissionCreate,
  validateStatusUpdate,
} from '../middleware/communitySubmissionValidation';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image files are allowed'));
      return;
    }
    cb(null, true);
  }
});

// Public routes
router.get('/approved', getApprovedSubmissions);

// Protected routes (requires authentication)
router.post(
  '/',
  isAuthenticated,
  upload.array('images', 5), // Limit to 5 images
  validateSubmissionCreate,
  createSubmission
);
router.get('/my-submissions', isAuthenticated, getUserSubmissions);

// Admin routes
router.get('/admin', isAuthenticated, isAdmin, getAllSubmissions);
router.patch(
  '/:id/status',
  isAuthenticated,
  isAdmin,
  validateStatusUpdate,
  updateSubmissionStatus
);

// Error handling middleware
router.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: 'File upload error',
      error: err.message,
    });
  }
  
  if (err) {
    return res.status(500).json({
      message: 'An error occurred during file upload',
      error: err.message,
    });
  }
  
  next();
});

export default router; 