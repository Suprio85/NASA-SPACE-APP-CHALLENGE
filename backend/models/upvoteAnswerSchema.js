import mongoose from "mongoose";
const { Schema } = mongoose;

const upvoteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    answerId: {
        type: Schema.Types.ObjectId,
        ref: "Answer",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
    unique: [["userId", "answerId"]] // To ensure that a user can upvote an answer only once
});

const Upvote = mongoose.model("Upvote", upvoteSchema);

export default Upvote;
