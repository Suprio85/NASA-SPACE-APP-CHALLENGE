import { apiResponse } from "../utils/apiResponse.js";
import asyncHandler from "express-async-handler";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const checkroute = asyncHandler(async (req, res) => {
    return res.json(new apiResponse(200, "Welcome to the user route"));
});

const uploadImage = asyncHandler(async (req, res) => {
    try {
        const file = req.files.avatar[0];
        const localFilePath = file.path;

        const response = await uploadOnCloudinary(localFilePath);
        if (!response) {
            return res.json(new apiResponse(500, "Error uploading image to Cloudinary"));
        }

        return res.json(new apiResponse(200, "Image uploaded successfully", response.url));
    } catch (error) {
        return res.json(new apiResponse(500, "Error uploading image to Cloudinary"));
    }
})

export { checkroute, uploadImage };

