import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let isConnected = false;

export const connectDB = async () => {
    // mongoose.set("strictQuery", true);
    //console.log(process.env.MONGODB_URI)

    if(isConnected){
        console.log("Using existing connection");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:"nasa",
            socketTimeoutMS:45000,
            connectTimeoutMS:45000,
        });
         
        isConnected = true;
        console.log("New connection established");
        
    } catch (error) {
        console.log("Error connecting to database");
        console.log(error); 
    }
}