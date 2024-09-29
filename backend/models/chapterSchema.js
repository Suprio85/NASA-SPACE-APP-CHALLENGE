import mongoose from "mongoose";
const { Schema } = mongoose;


const chapterSchema = new Schema({
    title: {
        type: String,
        required: [true,"Title is required"],
    },
    subChapters: [{
        type: Schema.Types.ObjectId,
        ref: "SubChapter",
    }],
},{
    timestamps: true,
});

const Chapter = mongoose.model("Chapter", chapterSchema);
export default Chapter;

