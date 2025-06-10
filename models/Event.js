// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
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
  imageUrl: String,
  redirectUrl: { type: String, required: true }, // Unstop/other platform
  date: {
    type: Date,
    required: true
  },
  tags: [String],
  published: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
