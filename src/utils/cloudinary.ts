import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'fs/promises';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath: string) => {
  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'community-projects',
    });

    // Remove the file from local storage
    await unlink(filePath);

    return result;
  } catch (error) {
    // Remove the file from local storage even if upload fails
    await unlink(filePath).catch(console.error);
    throw error;
  }
}; 