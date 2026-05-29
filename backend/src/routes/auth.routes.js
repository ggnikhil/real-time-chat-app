import { register,verifyOTP } from "../controllers/auth.controller.js";
import express from "express"

const authRouter = express.Router()

authRouter.post("/register", register)
authRouter.post("/verify-otp", verifyOTP)

export default authRouter
