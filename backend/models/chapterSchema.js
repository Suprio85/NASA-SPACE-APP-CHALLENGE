import mongoose from "mongoose";
const { Schema } = mongoose;

const chapterSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    // createdAt is automatically added by timestamps, but you can reference it explicitly
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt
});

const Chapter = mongoose.model("Chapter", chapterSchema);
export default Chapter;
