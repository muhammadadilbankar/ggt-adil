// models/Community.js
import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String,
    required: true,
    trim: true
  },
  projectUrl: { 
    type: String,
    required: false,
    trim: true
  },
  images: [{ 
    type: String 
  }],
  tags: [{ 
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  rejectionReason: {
    type: String,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  isAdminUpload: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Community', communitySchema);
