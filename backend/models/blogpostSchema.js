import mongoose from "mongoose";
const { Schema } = mongoose;

const blockSchema = new Schema({
    id: String,
    type: String,
    data: mongoose.Schema.Types.Mixed, // This is a generic data type that can store anything
});

const blogpostSchema = new Schema({
    title: {
        type: String,
        required: [true,"Title is required"],
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    blocks: [blockSchema],

});

const Blogpost = mongoose.model("Blogpost", blogpostSchema);
export default Blogpost;