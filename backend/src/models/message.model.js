import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema({
    conversationID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"conversation",
        required:[true,"conversationID must be required"]
    },

    senderID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },

    text:{
        type:String
    },

    seen:{
        type:Boolean,
        default:false
    }
})

export const messageModel = mongoose.model("message",messageSchema)