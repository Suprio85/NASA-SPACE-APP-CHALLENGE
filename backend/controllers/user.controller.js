import { apiResponse } from "../utils/apiResponse.js";
import asyncHandler from "express-async-handler";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const checkroute = asyncHandler(async (req, res) => {
    return res.json(new apiResponse(200, "Welcome to the user route"));
});




export { checkroute};

