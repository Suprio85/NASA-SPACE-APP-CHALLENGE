import mongoose from "mongoose";
const { Schema } = mongoose;

// Define blockSchema
const blockSchema = new Schema({
    id: String,
    type: String,
    data: Schema.Types.Mixed, // Generic data type for storing any kind of data
});

// Define answerSchema
const answerSchema = new Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
    blocks: [blockSchema], // Replaces `text` with an array of blocks
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    upvotes: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;
