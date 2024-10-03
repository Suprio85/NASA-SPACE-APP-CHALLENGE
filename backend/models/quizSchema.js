import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the quiz schema
const quizSchema = new Schema({
    question: {
        type: String,
        required: [true, "Question is required"],
    },
    optionA: {
        type: String,
        required: [true, "Option A is required"],
    },
    optionB: {
        type: String,
        required: [true, "Option B is required"],
    },
    optionC: {
        type: String,
        required: [true, "Option C is required"],
    },
    optionD: {
        type: String,
        required: [true, "Option D is required"],
    },
    correctAns: {
        type: String,
        required: [true, "Correct answer is required"],
        enum: ['A', 'B', 'C', 'D'], // Enforces correctAns to be one of the options
    },
    subchapter: {
        type: Schema.Types.ObjectId,
        ref: "SubChapter", // Reference to the SubChapter model
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Quiz model
const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
