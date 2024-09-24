import mongoose from "mongoose";
const { Schema } = mongoose;

const reactionSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Blogpost",
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
});

const Reaction = mongoose.model("Reaction", reactionSchema);
export default Reaction;
