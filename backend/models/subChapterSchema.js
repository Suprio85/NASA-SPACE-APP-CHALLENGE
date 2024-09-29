import mongoose from "mongoose";
const { Schema } = mongoose;


const blockSchema = new Schema({
 id : String,
 type : String,
 data : mongoose.Schema.Types.Mixed, // This is a generic data type that can store anything
});


const subChapterSchema = new Schema({
    title: {
        type: String,
        required: [true,"title is required"],
    },

    blocks: [blockSchema],
},{
    timestamps: true,
});

const SubChapter = mongoose.model("SubChapter", subChapterSchema);
export default SubChapter;
