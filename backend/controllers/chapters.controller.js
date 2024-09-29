import { apiResponse } from "../utils/apiResponse.js";
import asyncHandler from "express-async-handler";
import SubChapter from "../models/subChapterSchema.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadImage = asyncHandler(async (req, res) => {
  try {
    const file = req.files.avatar[0];
    const localFilePath = file.path;

    const response = await uploadOnCloudinary(localFilePath);
    if (!response) {
      return res.json(
        new apiResponse(500, "Error uploading image to Cloudinary")
      );
    }

    return res.json({
      success: 1,
      file: {
        url: response.url,
      },
    });
  } catch (error) {
    return res.json(
      new apiResponse(500, "Error uploading image to Cloudinary")
    );
  }
});

const createSubChapter = async (req, res) => {
  try {
    const { title, blocks } = req.body;

    console.log(blocks);

    return res.json(
      new apiResponse(201, "SubChapter Created Successfully")
    );

    // Create a new instance of the SubChapter model
    //   const newSubChapter = new SubChapter({
    //     title,
    //     blocks,
    //   });

    //   // Save the subchapter to the database
    //   const savedSubChapter = await newSubChapter.save();

    //   // Respond with the saved subchapter
    //   return res.json(new apiResponse(201, "SubChapter Created Successfully", savedSubChapter));
  } catch (error) {
    console.error("Error creating subchapter:", error);
    return res.json(new apiResponse(500, "Error creating subchapter"));
  }
};

export { uploadImage, createSubChapter };
