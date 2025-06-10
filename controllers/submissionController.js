// controllers/submissionController.js
import Submission from '../models/Submission.js';

// Get all submissions with metadata
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .sort({ submittedAt: -1 });
    
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'Failed to fetch submissions', error: error.message });
  }
};

// Get submission by ID
export const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    res.json(submission);
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ message: 'Failed to fetch submission' });
  }
};

// Create new submission
export const createSubmission = async (req, res) => {
  try {
    const { name, uid, branch, title, pdfLink } = req.body;
    
    if (!name || !uid || !branch || !title || !pdfLink) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const submission = new Submission({
      name,
      uid,
      branch,
      title,
      pdfLink,
    });
    
    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({ message: 'Failed to create submission' });
  }
};

// Delete submission (admin only)
export const deleteSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    res.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ message: 'Failed to delete submission' });
  }
};
