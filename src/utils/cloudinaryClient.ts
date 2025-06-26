const cloudinaryClient = {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dchz15orn',
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ggt-project-submission'
};

export default cloudinaryClient;