import mongoose from "mongoose";
const { Schema } = mongoose;


const commentSchema = new Schema({
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
    content: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;