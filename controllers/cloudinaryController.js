import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const getImageURL = async(req,res) => {
    //console.log("getImageURL")
    const key = req.body.key;
    const imageId = req.body.imageIdname;

    // console.log("Key:",key);
    // console.log("imageId",imageId);

    if (!key || !imageId) {
        return res.status(400).json({ error: 'Missing key or imageId' });
    }

    const publicId = `${key}/${imageId}`;

    // console.log("Id to be searched:",publicId)

    var result = "";

    try {
    result = cloudinary.url(publicId, {
      type: 'upload',
      secure: true,
      format: 'jpg', // or png if needed
    });

    return res.json({ result });
  } catch (error) {
    console.error('Cloudinary error:', error);
    //res.status(500).json({ error: 'Fetching Image URL failed', details: error });
  }
}

export const DeleteImage = async(req,res) => {
   //console.log("DeleteImage")
    const key = req.body.key;
    const imageId = req.body.imageId;

    //console.log("Key:",key);
    //console.log("imageId",imageId);

     if (!key || !imageId) {
        return res.status(400).json({ error: 'Missing key or imageId' });
    }

    const publicId = `${key}/${imageId}`;
    
    try {
    const result = await cloudinary.uploader.destroy(publicId);
    //console.log(result)
    return res.json({ result });
  } catch (error) {
    //console.log(error)
    res.status(500).json({ error: 'Deletion failed', details: error });
  }
}