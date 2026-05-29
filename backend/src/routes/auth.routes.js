import { register,verifyOTP,login } from "../controllers/auth.controller.js";
import { registerValidator,loginValidator,verifyOtpValidator } from "../validation/auth.validator.js";
import express from "express"

const authRouter = express.Router()

authRouter.post("/register",registerValidator, register)


authRouter.post("/verify-otp",verifyOtpValidator, verifyOTP)


authRouter.post("/login",loginValidator,login)

export default authRouter
