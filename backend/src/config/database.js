import mongoose from "mongoose";

export function connectedToDB(){
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log("database connected successfully")
    }catch(err){
        console.log(err)
    }
}