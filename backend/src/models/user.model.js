import mongoose from "mongoose";
import bcryptjs from "bcryptjs"

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        unique:true,
        trim:true,
        required:[true,"username must be required"]
    },

    email:{
        type:String,
        unique:true,
        trim:true,
        required:[true,"email must be required"]
    },

    phoneNumber:{
        type:String,
        unique:true,
        trim:true,
        required:[true,"phone number is must be required"]
    },

    countryCode:{
        type:String,
        default:"+91"
    },

    password:{
        type:String,
        select:false,
        required:[true,"password must be required"]
    },

    about:{
        type:String,
        default:"Hey there! I am using WhatsApp"
    },

    profile:{
        type:String,
        default:"https://ik.imagekit.io/nikhil29/image_zY_EyO36K.jpg?updatedAt=1770757037428"
    },

    isVerified:{
        type:Boolean,
        default:false
    },

    isOnline:{
        type:Boolean,
        default:false,
        index: true
    },

    lastSeen:{
        type:Date,
        default:Date.now,
        index: true
    },

    contact: [
        { type: mongoose.Schema.Types.ObjectId, ref: "users" }
    ],

    blockedUsers: [
        { type: mongoose.Schema.Types.ObjectId, ref: "users" }
    ],

    privacy: {

        lastSeen: { 
            type: String, 
            enum: ["everyone", "contacts", "nobody"],
            default: "everyone" 
        },

        profilePhoto: { 
            type: String, 
            enum: ["everyone", "contacts", "nobody"],
            default: "everyone" 
        },

        about: { 
            type: String, 
            enum: ["everyone", "contacts", "nobody"],
            default: "everyone" 
        },
    },

},{timestamps:true})


userSchema.pre("save", async function(){
    if(!this.isModified("password")) return
    this.password = await bcryptjs.hash(this.password,10)
})

userSchema.methods.comparePassword = async function (givenPassword) {
    return bcryptjs.compare(givenPassword,this.password)
}

const userModel = mongoose.model("users",userSchema)

export default userModel