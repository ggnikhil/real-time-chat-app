import userModel from "../models/user.model.js"
import { sendEmail } from "../services/email.service.js"
import { otpModel } from "../models/otp.model.js"
import { redis } from "../config/cache.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


export async function register(req, res, next) {
    try {

        const { username, email, password, phoneNumber, countryCode, about, profile, isVerified, isOnline, lastSeen, contact, blockedUsers, privacy } = req.body

        const isUserExist = await userModel.findOne({
            $or: [{ email }, { username }]
        })

        if (isUserExist) {
            return res.status(400).json({
                success: false,
                message: email ? "Email already exists" : "Username already exists"
            })
        }

        const user = await userModel.create({
            username,
            email,
            password,
            phoneNumber,
            countryCode,
            about,
            profile,
            isVerified,
            isOnline,
            lastSeen,
            contact,
            blockedUsers,
            privacy
        })

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("token", token)

        function otpGentrater() {
            return Math.floor(100000 + Math.random() * 900000).toString()
        }

        const otp = otpGentrater()

        await otpModel.create({
            email,
            otp
        })

        sendEmail({
            to: email,
            subject: "Welcome to our app",
            html: `
                    <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;background:#f0fdf6;border-radius:12px;">
                        <h1 style="color:#128C7E;">Welcome to WhatsApp,<br> ${username}! 👋</h1>
                        <p style="color:#555;">Thank you for registering. We're excited to have you on board.</p>
                        <div style="background:#fff;border:2px dashed #25D366;border-radius:10px;padding:20px;text-align:center;margin-top:20px;">
                        <p style="margin:0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Your OTP</p>
                        <h2 style="color:#128C7E;letter-spacing:8px;margin:10px 0;">${otp}</h2>
                        <p style="margin:0;color:#999;font-size:12px;">Expires in 5 minutes</p>
                        </div>
                    </div>
                `,
            text: `Welcome to our app, ${username}! Thank you for registering. We're excited to have you on board.`
        })

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                countryCode: user.countryCode,
                about: user.about,
                profile: user.profile,
                isVerified: user.isVerified,
                isOnline: user.isOnline,
                lastSeen: user.lastSeen,
                contact: user.contact,
                blockedUsers: user.blockedUsers,
                privacy: user.privacy
            }
        })
    } catch (err) {
        err.status = 500
        next(err)
    }
}

export async function verifyOTP(req, res, next) {

    try {
        const token = req.cookies.token
        const { otp } = req.body


        if (!token) {
            return res.status(401).json({
                success: false,
                message: "token not found"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { email } = decoded

        const recordOTP = await otpModel.findOne({ email })

        if (!recordOTP) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        if (recordOTP.expiresAt < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP is expire"
            })
        }

        if (recordOTP.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        await userModel.updateOne({ email }, { isVerified: true })
        await otpModel.deleteOne({ email })


        res.status(200).json({
            success: true,
            message: "user verifyed successfully"
        })

    } catch (err) {
        console.log(err)
        err.status = 500
        next(err)
    }

}

export async function login(req, res, next) {

    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email }).select("+password")

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        if (user.isVerified !== true) {
            return res.status(400).json({
                success: false,
                message: "Please verify your email address"
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }

        const token = jwt.sign(
            {
                userID: user._id,
                email: user.email,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        )

        res.cookie("token", token)


        res.status(200).json({
            success: true,
            message: "user login successfully"
        })

    } catch (err) {
        console.log(err)
        err.status = 500
        next(err)
    }
}

export async function logout(req, res,next) {
    try {
        const token = req.cookies.token

        res.clearCookie("token")

        await redis.set(token, Date.now().toString(), "EX", 60 * 60)

        res.status(200).json({
            message: "user logout successfully"
        })
        
    } catch (err) {
        err.status = 500
        next(err)
    }

}

export async function getMe(req,res,next) {
    try{
        const token = req.cookies.token

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        res.status(200).json({
            success:true,
            message:"user fetch successfully",
            user:{
                userID:decoded.userID,
                email:decoded.email,
                username:decoded.username
            }
        })

    }catch(err){
        err.status = 500
        next(err)
    }   
}