// In your backend, create a file like upload.controller.js
import cloudinary from "../src/utils/cloudinary.js";

export const uploadImage = async (req, res) => {
    try {
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ error: "Image is required" });
        }

        // Upload base64 image to cloudinary (exactly like your chat app)
        const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: "skillings", // Store in a specific folder
        });

        res.status(200).json({
            imageUrl: uploadResponse.secure_url,
            public_id: uploadResponse.public_id
        });
    } catch (error) {
        console.error("Error in uploadImage controller:", error);
        res.status(500).json({ error: "Failed to upload image" });
    }
};