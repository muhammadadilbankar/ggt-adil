// models/Skilling.js
import mongoose from "mongoose";

const skillingSchema = new mongoose.Schema({
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
  imageUrl: {
    type: String,
    default: null // Default image or null
  },
  videoUrl: { 
    type: String,
  },
  resourceUrl: { 
    type: String,
    default: null
  },
  tags: [{ 
    type: String,
    trim: true
  }],
  published: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number, // in minutes
    required: false
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  syllabus: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true // This will automatically handle updatedAt
});

const Skilling = mongoose.model("Skilling", skillingSchema);

export default Skilling;
