import express from 'express';
// import {
//   getAllSubmissions,
//   getSubmissionById,
//   createSubmission,
//   deleteSubmission
// } from '../controllers/submissionController.js';
import { getImageURL,DeleteImage } from '../controllers/cloudinaryController.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

console.log("Cloudinary Routes")

const router = express.Router();

// Protected routes (admin only)
// router.get('/', isAuthenticated, isAdmin, getAllSubmissions);
// router.get('/:id', isAuthenticated, isAdmin, getSubmissionById);
// router.delete('/:id', isAuthenticated, isAdmin, deleteSubmission);
router.post('/publicgetimageURL',getImageURL)
router.post('/getimageURL',isAuthenticated, isAdmin, getImageURL)
router.post('/delete', isAuthenticated, isAdmin, DeleteImage)

export default router;
