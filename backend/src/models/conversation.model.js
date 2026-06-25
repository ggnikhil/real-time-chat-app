import mongoose from 'mongoose'

export const conversationSchema = new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"userID must be required"]
    }],

    lastMassage:{
        type:String,
        default:""
    }

},{timestamps:true})


export const conversationModel = mongoose.model("conversation",conversationSchema)