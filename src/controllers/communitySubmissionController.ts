import { Request, Response } from 'express';
// import type * as Express from 'express';
import CommunitySubmission from '../models/CommunitySubmission';
import { uploadToCloudinary } from '../utils/cloudinary';
import { isValidObjectId } from 'mongoose';

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface User {
      _id: string;
      // add other user properties if needed
    }
    interface Request {
      user: User;
    }
  }
}

// Create a new submission
export const createSubmission = async (req: Request, res: Response) => {
  try {
    const { title, description, githubLink, liveLink, technologies } = req.body;
    const files = req.files as Express.Multer.File[];
    
    // Upload images to Cloudinary if present
    const imageUrls = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const result = await uploadToCloudinary(file.path);
        if (result.secure_url) {
          imageUrls.push(result.secure_url);
        }
      }
    }

    const submission = new CommunitySubmission({
      title,
      description,
      githubLink,
      liveLink,
      technologies: JSON.parse(technologies),
      images: imageUrls,
      userId: req.user._id,
    });

    await submission.save();

    res.status(201).json({
      message: 'Project submitted successfully',
      submission,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to submit project',
      error: error.message,
    });
  }
};

// Get all submissions (admin only)
export const getAllSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await CommunitySubmission.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to fetch submissions',
      error: error.message,
    });
  }
};

// Get approved submissions (public)
export const getApprovedSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await CommunitySubmission.find({ status: 'approved' })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to fetch submissions',
      error: error.message,
    });
  }
};

// Update submission status (admin only)
export const updateSubmissionStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid submission ID' });
    }

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const submission = await CommunitySubmission.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('userId', 'name email');

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.json({
      message: 'Submission status updated successfully',
      submission,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to update submission status',
      error: error.message,
    });
  }
};

// Get user's own submissions
export const getUserSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await CommunitySubmission.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to fetch your submissions',
      error: error.message,
    });
  }
}; 