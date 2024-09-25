import mongoose from "mongoose";
const { Schema } = mongoose;

const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
        message: "Title is required",
    },
    planet:{
        type: String,
    },
    chapter:{
        type: String,
    },
    description: {
        type: String,
    },
    marks: {
        type: Number,
        default: 10,
    },

},{
    timestamps: true,
});  

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;