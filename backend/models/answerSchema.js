import mongoose from "mongoose";
const { Schema } = mongoose;

const answerSchema = new Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
    text: {
        type: String,
        required: [true, "Answer text is required"],
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

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;

