import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_URI,{ 
        dbName: "food-delivery",
    })
    .then(()=>{console.log("Database is connected")})
 } 