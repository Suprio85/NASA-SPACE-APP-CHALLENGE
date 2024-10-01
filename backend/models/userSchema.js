import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true,"Name is required"],
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
    },

    image_url:{
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    
},{
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;
