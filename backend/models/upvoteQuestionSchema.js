import mongoose from "mongoose";
const { Schema } = mongoose;

const upvoteQuestionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
}, {
    timestamps: true,
});

// Ensure a user can only upvote a question once
upvoteQuestionSchema.index({ user: 1, question: 1 }, { unique: true });

const UpvoteQuestion = mongoose.model("UpvoteQuestion", upvoteQuestionSchema);
export default UpvoteQuestion;
