import jwt from "jsonwebtoken"

export async function authMIddleware(){
    const token = req.cookies.token

    console.log(token)
}