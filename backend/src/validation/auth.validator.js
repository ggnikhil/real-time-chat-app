import {validationResult,body} from 'express-validator'

export function validation(req,res,next){
    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({
            success:false,
            error:error.array()
        })
    }

    next()
}


export const registerValidator = [
    body("username")
        .trim()
        .notEmpty().withMessage("username is must required")
        .isLength({min:2,max:35}).withMessage("Username must be between 2 and 35 characters")
        .isString().withMessage("username must be string"),
        
    
    body("email")
        .trim()
        .notEmpty().withMessage("Email must be required")
        .isEmail().withMessage("please provide valid email")
        .normalizeEmail()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).withMessage("Email format is invalid, your email contain this /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ "),
        
    body("password")
        .trim()
        .notEmpty().withMessage("password is must required")
        .isLength({min:5}).withMessage("password contain must be at least 5 characters"),

    body("phoneNumber")
        .trim()
        .notEmpty().withMessage("phonne number is must required")
        .isLength({min:10,max:10}).withMessage("phone must be 10 digits")
        .isNumeric().withMessage("username must be number"),

    validation
]

export const verifyOtpValidator = [

    body("otp")
        .trim()
        .notEmpty().withMessage("OTP is required")
        .isLength({min:6,max:6}).withMessage("OTP must be 6 digits")
        .isNumeric().withMessage("OTP must be a number"),
    
    validation
]

export const loginValidator = [

    body("email")
        .trim()
        .notEmpty().withMessage("Email must be required")
        .isEmail().withMessage("please provide valid email")
        .normalizeEmail()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).withMessage("Email format is invalid, your email contain this /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ "),

    body("password")
        .trim()
        .notEmpty().withMessage("password is must required")
        .isLength({min:5}).withMessage("password contain must be at least 5 characters"),
    
    validation
]