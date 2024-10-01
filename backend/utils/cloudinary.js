import dotenv from 'dotenv';
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import path from "path";

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const absoluteFilePath = path.resolve(localFilePath);
        console.log("Uploading file from: ", absoluteFilePath);

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(absoluteFilePath, {
            resource_type: "auto"
        });

        console.log("File is uploaded on Cloudinary: ", response.url);

        // Delete the local file after successful upload
        fs.unlinkSync(absoluteFilePath);
        return response;

    } catch (error) {
        console.error("Error uploading to Cloudinary: ", error);
        fs.unlinkSync(localFilePath); // Clean up local file on failure
        return null;
    }
};



export {uploadOnCloudinary}