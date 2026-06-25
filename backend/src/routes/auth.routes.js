import { register,verifyOTP,login,logout } from "../controllers/auth.controller.js";
import { authMIddleware } from "../middleware/auth.middleware.js";
import { registerValidator,loginValidator,verifyOtpValidator } from "../validation/auth.validator.js";
import express from "express"

const authRouter = express.Router()

authRouter.post("/register",registerValidator, register)


authRouter.post("/verify-otp",verifyOtpValidator, verifyOTP)


authRouter.post("/login",loginValidator,login)


authRouter.get("/logout",authMIddleware,logout)
export default authRouter
