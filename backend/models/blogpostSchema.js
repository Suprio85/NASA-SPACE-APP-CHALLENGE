import mongoose from "mongoose";
const { Schema } = mongoose;

const blogpostSchema = new Schema({
    title: {
        type: String,
        required: [true,"Title is required"],
    },
    content: {
        type: String,
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        }
    ],
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Reaction",
        }
    ],  
});

const Blogpost = mongoose.model("Blogpost", blogpostSchema);
export default Blogpost;