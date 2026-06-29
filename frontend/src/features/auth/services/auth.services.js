import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})


export async function login({email,password}) {
    const responce = await api.post("/api/auth/login",{
        email,password
    })

    return responce.data
}

export async function register({email,username,password,phoneNumber}) {
    const responce = await api.post("/api/auth/register",{
        email,username,password,phoneNumber
    })

    return responce.data
}

export async function verifyOtp({otp}) {
    const responce = await api.post("/api/auth/verify-otp",{
        otp
    })

    return responce.data
}

export async function logout() {
    const responce = await api.get("/api/auth/logout")

    return responce.data
}

export async function getMe() {
    const responce = await api.get("/api/auth/getMe")
    return responce.data
}