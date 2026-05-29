import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        type:"OAuth2",
        user:process.env.GOOGLE_USER,
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRECT,
        refreshToken:process.env.GOOGLE_REFRESH_TOKEN
    }

})

transporter.verify((error,success) => {
    if(error){
        console.log('Error connecting to email server:', error)
    }else{
        console.log('Email server is ready to send messages')
    }
})



export async function sendEmail({to,subject,html,text}){
    try{

        const emailOption ={
            from:process.env.GOOGLE_USER,
            to,
            subject,
            html,
            text
        }

        const detail = await transporter.sendMail(emailOption)

    }catch(err){
        console.log(err)
    }
}
