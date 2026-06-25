import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"


export async function authMIddleware(req,res,next){
    const token = req.cookies.token

    try{

        if(!token){
            return res.status(404).json({
                success:false,
                message:"token not found"
            })
        }

        const decoded = jwt.decode(token,process.env.JWT_SECRET)

        const checkUserIsVerified = await userModel.findById(decoded.userID)

        if(checkUserIsVerified.isVerified == false){
            return res.status(200).json({
                success:true,
                message:"user is Unverifed"
            })
        }

        req.user = decoded

        next()

    }catch(err){
        err.status = 500
        next(err)
    }

}