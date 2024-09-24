import mongoose from "mongoose";
const { Schema } = mongoose;

const performanceSchema = new Schema({
userId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
},
quizId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
},
score : {
    type: Number,
    required: true,
},
},{
    timestamps: true,
});

const Performance = mongoose.model("Performance", performanceSchema);
export default Performance;

