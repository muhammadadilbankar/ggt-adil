// controllers/skillingController.js
import Skilling from "../models/Skilling.js";

// Get all skilling content (with optional filters)
export const getAllSkilling = async (req, res) => {
  try {
    const { published, difficulty, search } = req.query;
    let query = {};
    
    // Filter by published status
    if (published !== undefined) {
      query.published = published === 'true';
    }
    
    // Filter by difficulty
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    // Search in title and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skillings = await Skilling.find(query)
      .sort({ createdAt: -1 });
    
    res.json(skillings);
  } catch (error) {
    console.error('Error fetching skilling content:', error);
    res.status(500).json({ message: 'Failed to fetch skilling content' });
  }
};

// Get single skilling content by ID
export const getSkillingById = async (req, res) => {
  try {
    const skilling = await Skilling.findById(req.params.id);
    
    if (!skilling) {
      return res.status(404).json({ message: 'Skilling content not found' });
    }
    
    res.json(skilling);
  } catch (error) {
    console.error('Error fetching skilling content:', error);
    res.status(500).json({ message: 'Failed to fetch skilling content' });
  }
};

// Create new skilling content
export const createSkilling = async (req, res) => {
  try {
    const skilling = new Skilling(req.body);
    await skilling.save();
    res.status(201).json(skilling);
  } catch (error) {
    console.error('Error creating skilling content:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update skilling content
export const updateSkilling = async (req, res) => {
  try {
    const skilling = await Skilling.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!skilling) {
      return res.status(404).json({ message: 'Skilling content not found' });
    }
    
    res.json(skilling);
  } catch (error) {
    console.error('Error updating skilling content:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete skilling content
export const deleteSkilling = async (req, res) => {
  try {
    const skilling = await Skilling.findByIdAndDelete(req.params.id);
    
    if (!skilling) {
      return res.status(404).json({ message: 'Skilling content not found' });
    }
    
    res.json({ message: 'Skilling content deleted successfully' });
  } catch (error) {
    console.error('Error deleting skilling content:', error);
    res.status(500).json({ message: 'Failed to delete skilling content' });
  }
};

// Toggle publish status
export const togglePublish = async (req, res) => {
  try {
    const skilling = await Skilling.findById(req.params.id);
    
    if (!skilling) {
      return res.status(404).json({ message: 'Skilling content not found' });
    }
    
    skilling.published = !skilling.published;
    await skilling.save();
    
    res.json(skilling);
  } catch (error) {
    console.error('Error toggling publish status:', error);
    res.status(500).json({ message: 'Failed to toggle publish status' });
  }
};
