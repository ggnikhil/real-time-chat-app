import express from "express"
import { authMIddleware } from "../middleware/auth.middleware.js"
import { sendMessage,getMessage,getConversation } from "../controllers/message.controller.js"


const messageRouter = express.Router()


messageRouter.post("/send-message",authMIddleware,sendMessage)
messageRouter.get("/getmessage/:conversationId",authMIddleware,getMessage)
messageRouter.get("/getconversation",authMIddleware,getConversation)

export default messageRouter