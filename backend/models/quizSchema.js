import mongoose from "mongoose";
const { Schema } = mongoose;


const questionSchema = new Schema({
    question: {
        type: String,
        required: [true,"Question is required"],
    },
    options: {
        type: [String],
    },
    correctAnswer: {
        type: String,
    },
}, {
    timestamps: true,
});

const quizSchema = new Schema({
    title: {
        type: String,
        required: [true,"Title is required"],
    },
    subChapter: {
        type: Schema.Types.ObjectId,
        ref: "SubChapter",
    },
    questions: [questionSchema],
    marks: {
        type: Number,
        default: 10,
    },

}, {
    timestamps: true,
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;