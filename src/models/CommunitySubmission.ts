import mongoose from 'mongoose';

const communitySubmissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  githubLink: {
    type: String,
    trim: true,
  },
  liveLink: {
    type: String,
    trim: true,
  },
  technologies: [{
    type: String,
    trim: true,
  }],
  images: [{
    type: String, // URLs to uploaded images
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('CommunitySubmission', communitySubmissionSchema); 