import { conversationModel } from "../models/conversation.model.js"
import { messageModel } from "../models/message.model.js"
import userModel from "../models/user.model.js"

export async function sendMessage(req, res, next) {
    try {
        const sender = req.user.userID
        const { conversationID, text, receiver } = req.body

        const checkConversationISexist = await conversationModel.findOne({
            participants: { $all: [sender, receiver] }
        })

        let conversation = checkConversationISexist

        if (!checkConversationISexist) {
            conversation = await conversationModel.create({
                participants: [sender, receiver]
            })
        }

        const message = await messageModel.create({
            conversationId: conversation._id,
            sender: sender,
            text
        })

        res.status(201).json({
            success: true,
            message: "message send successfully",
            data:message
        })

    } catch (err) {
        console.log("ERROR:", err.message)
        err.status = 500
        next(err)
    }   

}

export async function getMessage(req, res, next) {
    try{
        const conversationId = req.params
        const messageData = await messageModel.find(conversationId)

        if(!messageData){
            return res.status(404).json({
                success:false,
                message:"conversation not found by this id"
            })
        }

        res.status(200).json({
            success:true,
            message:"All conversation fetch successfully",
            data:messageData
        })
    }catch(err){
        err.status = 500
        next(err)
    }

    
}

export async function getConversation(req,res,next) {
    try{
        const userId = req.user

        const conversation = await conversationModel.findOne({
            participants:userId
        })

        console.log(conversation)
    }catch(err){
        req.status = 500
        next(err)
    }

    
}