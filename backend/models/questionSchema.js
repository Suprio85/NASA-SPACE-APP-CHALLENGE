import mongoose from "mongoose";
const { Schema } = mongoose;

// Question Schema
const questionSchema = new Schema({
    text: {
        type: String,
        required: [true, "Question text is required"],
    },
    details: {
        type: String,
        required: [true, "Question details are required"],
    },
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

const Question = mongoose.model("Question", questionSchema);
export default Question;