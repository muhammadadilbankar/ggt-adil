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
  videoUrl: { 
    type: String, 
    required: true 
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
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true // This will automatically handle updatedAt
});

const Skilling = mongoose.model("Skilling", skillingSchema);

export default Skilling;
