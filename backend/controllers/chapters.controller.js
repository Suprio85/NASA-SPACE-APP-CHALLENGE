import { apiResponse } from "../utils/apiResponse.js";
import asyncHandler from "express-async-handler";
import SubChapter from "../models/subChapterSchema.js";
import Chapter from "../models/chapterSchema.js";
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

    return res.json(new apiResponse(201, "SubChapter Created Successfully"));

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

const getChapters = asyncHandler(async (req, res) => {
  try {
    const chapters = await Chapter.find();
    return res.json(
      new apiResponse(200, "Chapters fetched successfully", chapters)
    );
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return res.json(new apiResponse(500, "Error fetching chapters"));
  }
});

const addChapter = asyncHandler(async (req, res) => {
    try {
        const { title } = req.body;

        // Check if title is provided
        if (!title) {
            return res.status(400).json(new apiResponse(400, "Title is required"));
        }

        // Use findOneAndUpdate to either update or create the chapter
        const savedChapter = await Chapter.findOneAndUpdate(
            { title }, // Search by title
            { title }, // Update the title if the chapter is found
            {
                new: true,               // Return the updated document
                upsert: true,            // Create a new chapter if one doesn't exist
                setDefaultsOnInsert: true // Apply default values when inserting a new document
            }
        );

        return res.status(201).json(new apiResponse(201, "Chapter created/updated successfully", savedChapter));
    } catch (error) {
        console.error("Error creating/updating chapter:", error);
        return res.status(500).json(new apiResponse(500, "Error creating/updating chapter"));
    }
});

const getSubChapters = asyncHandler(async (req, res) => {
    const { chapterId } = req.body; // Expect chapterId from the request body

    try {
        // Validate chapterId is provided
        if (!chapterId) {
            return res.status(400).json(new apiResponse(400, "Chapter ID is required"));
        }

        // Fetch subchapters by the chapter reference
        const subChapters = await SubChapter.find({ chapter: chapterId });

        if (!subChapters.length) {
            return res.status(404).json(new apiResponse(404, "No subchapters found for this chapter"));
        }

        return res.status(200).json(
            new apiResponse(200, "SubChapters fetched successfully", subChapters)
        );
    } catch (error) {
        console.error("Error fetching subchapters:", error);
        return res.status(500).json(new apiResponse(500, "Error fetching subchapters"));
    }
});


const addSubchapters = asyncHandler(async (req, res) => {
    try {
        const { title, chapterId } = req.body;

        // Check if title and chapterId are provided
        if (!title || !chapterId) {
            return res.status(400).json(new apiResponse(400, "Title and Chapter ID are required"));
        }

        // Ensure the provided chapterId references an existing Chapter
        const chapterExists = await Chapter.findById(chapterId);
        if (!chapterExists) {
            return res.status(404).json(new apiResponse(404, "Chapter not found"));
        }

        // Use findOneAndUpdate to either update or create the subchapter
        const savedSubChapter = await SubChapter.findOneAndUpdate(
            { title }, // Search by title
            { title, chapter: chapterId }, // Update the title and chapter reference
            {
                new: true,               // Return the updated document
                upsert: true,            // Create a new subchapter if one doesn't exist
                setDefaultsOnInsert: true // Apply default values when inserting a new document
            }
        );

        return res.status(201).json(new apiResponse(201, "SubChapter created/updated successfully", savedSubChapter));
    } catch (error) {
        console.error("Error creating/updating subchapter:", error);
        return res.status(500).json(new apiResponse(500, "Error creating/updating subchapter"));
    }
});


export { uploadImage, createSubChapter,getChapters,getSubChapters ,addChapter,addSubchapters};
