import { Request, Response, NextFunction } from 'express';

export const validateSubmissionCreate = (req: Request, res: Response, next: NextFunction) => {
  const { title, description, githubLink, liveLink, technologies } = req.body;

  // Required fields
  if (!title || !description) {
    return res.status(400).json({
      message: 'Title and description are required',
    });
  }

  // Title length validation
  if (title.length < 3 || title.length > 100) {
    return res.status(400).json({
      message: 'Title must be between 3 and 100 characters',
    });
  }

  // Description length validation
  if (description.length < 10 || description.length > 5000) {
    return res.status(400).json({
      message: 'Description must be between 10 and 5000 characters',
    });
  }

  // URL validations
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  
  if (githubLink && !urlRegex.test(githubLink)) {
    return res.status(400).json({
      message: 'Invalid GitHub URL format',
    });
  }

  if (liveLink && !urlRegex.test(liveLink)) {
    return res.status(400).json({
      message: 'Invalid live demo URL format',
    });
  }

  // Technologies validation
  try {
    const techArray = JSON.parse(technologies);
    if (!Array.isArray(techArray) || techArray.length === 0) {
      return res.status(400).json({
        message: 'At least one technology must be specified',
      });
    }

    if (techArray.some(tech => typeof tech !== 'string' || tech.length < 1)) {
      return res.status(400).json({
        message: 'Invalid technology format',
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: 'Invalid technologies format',
    });
  }

  // File validation
  const files = req.files as Express.Multer.File[];
  if (files && files.length > 5) {
    return res.status(400).json({
      message: 'Maximum 5 images allowed',
    });
  }

  if (files) {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (const file of files) {
      if (!validTypes.includes(file.mimetype)) {
        return res.status(400).json({
          message: 'Only JPEG, PNG, and WebP images are allowed',
        });
      }

      if (file.size > maxSize) {
        return res.status(400).json({
          message: 'Each image must be less than 5MB',
        });
      }
    }
  }

  next();
};

export const validateStatusUpdate = (req: Request, res: Response, next: NextFunction) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      message: 'Status is required',
    });
  }

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({
      message: 'Invalid status value',
    });
  }

  next();
}; 