// In your routes file
import express from 'express';
import { uploadImage } from '../controllers/upload.controller.js';
// import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/upload', uploadImage);

export default router;