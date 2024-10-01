import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the block schema
const blockSchema = new Schema({
    id: String,
    type: String,
    data: mongoose.Schema.Types.Mixed, // This is a generic data type that can store anything
});

// Define the subChapter schema
const subChapterSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    blocks: [blockSchema],
    // Reference to the Chapter
    chapter: {
        type: Schema.Types.ObjectId,
        ref: "Chapter", // Reference to the Chapter model
        required: true, // You can make this required to ensure every subchapter belongs to a chapter
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt
});

// Create the SubChapter model
const SubChapter = mongoose.model("SubChapter", subChapterSchema);
export default SubChapter;
