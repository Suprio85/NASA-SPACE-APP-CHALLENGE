import mongoose from "mongoose";
const { Schema } = mongoose;


const leaderboardSchema = new Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    total_score : {
        type: Number,
        default: 0,
    },
    rank : {
        type: Number,
        required: true,
    },
},{
    timestamps: true,
});