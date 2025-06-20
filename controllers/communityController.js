// controllers/communityController.js
import Community from '../models/Community.js';
import mongoose from 'mongoose';

export const createCommunityPost = async (req, res) => {
  try {
    const post = new Community(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllCommunityPosts = async (req, res) => {
  try {
    const posts = await Community.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCommunityPost = async (req, res) => {
  try {
    await Community.findByIdAndDelete(req.params.id);
    res.json({ message: 'Community post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User submit project
export const submitUserProject = async (req, res) => {
  try {
    const { title, description, projectUrl, tags } = req.body;
    
    // Handle file uploads if any
    const images = req.files ? req.files.map(file => file.path) : [];

    const project = new Community({
      title,
      description,
      projectUrl,
      tags,
      images,
      userId: req.user.id,
      status: 'pending',
      isAdminUpload: false
    });

    await project.save();
    res.status(201).json({ message: 'Project submitted successfully', project });
  } catch (error) {
    console.error('Error submitting project:', error);
    res.status(500).json({ message: 'Failed to submit project' });
  }
};

// Get user's own projects
export const getUserProjects = async (req, res) => {
  try {
    const projects = await Community.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching user projects:', error);
    res.status(500).json({ message: 'Failed to fetch user projects' });
  }
};

// Get public (approved) projects
export const getPublicProjects = async (req, res) => {
  try {
    const projects = await Community.find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .populate('userId', 'name');
    res.json(projects);
  } catch (error) {
    console.error('Error fetching public projects:', error);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

// Get all community projects (with filters) - ADMIN ONLY
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Community.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');
    res.json(projects);
  } catch (error) {
    console.error('Error fetching all projects:', error);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

// Get single project
export const getProjectById = async (req, res) => {
  try {
    const project = await Community.findById(req.params.id)
      .populate('userId', 'name email');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Failed to fetch project' });
  }
};

// Create new project (admin upload)
// export const createProject = async (req, res) => {
//   try {
//     const { title, description, projectUrl, tags } = req.body;
    
//     // Handle file uploads if any
//     const images = req.files ? req.files.map(file => file.path) : [];

//     const project = new Community({
//       title,
//       description,
//       projectUrl,
//       tags,
//       images,
//       userId: req.user.id,
//       status: 'approved', // Admin uploads are automatically approved
//       isAdminUpload: true
//     });

//     await project.save();
//     res.status(201).json({ message: 'Project created successfully', project });
//   } catch (error) {
//     console.error('Error creating project:', error);
//     res.status(500).json({ message: 'Failed to create project' });
//   }
// };
export const createProject = async (req, res) => {
  try {
    console.log("Received project data:", req.body);

    // Create the community/project with defaults for missing required fields
    const community = new Community({
      ...req.body,
      // Provide defaults for required fields
      projectUrl: req.body.projectUrl || req.body.githubLink || "https://example.com",
      // Skip userId or use a default if needed
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011") // Use a valid ObjectId
    });

    console.log("Attempting to save community:", community);
    const savedCommunity = await community.save();
    console.log("Saved community successfully");
    res.status(201).json(savedCommunity);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      message: 'Failed to create project',
      details: error.message
    });
  }
};

// Update project (admin only)
export const updateProject = async (req, res) => {
  try {
    const { title, description, projectUrl, tags } = req.body;
    
    // Handle file uploads if any
    const images = req.files ? req.files.map(file => file.path) : undefined;

    const project = await Community.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        description, 
        projectUrl, 
        tags,
        ...(images && { images })
      },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project updated successfully', project });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Failed to update project' });
  }
};

// Update project status (approve/reject)
export const updateProjectStatus = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    
    const project = await Community.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        ...(rejectionReason && { rejectionReason })
      },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project status updated successfully', project });
  } catch (error) {
    console.error('Error updating project status:', error);
    res.status(500).json({ message: 'Failed to update project status' });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Community.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Failed to delete project' });
  }
};

export const updateCommunityPost = async (req, res) => {
  try {
    console.log('Updating community:', req.params.id, req.body);

    const updatedCommunity = await Community.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedCommunity) {
      return res.status(404).json({ message: 'Community not found' });
    }

    res.json(updatedCommunity);
  } catch (err) {
    console.error('Error updating community:', err);
    res.status(500).json({ error: err.message });
  }
};