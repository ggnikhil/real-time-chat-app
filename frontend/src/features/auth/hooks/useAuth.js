import { useDispatch } from "react-redux";
import {login,register,logout,verifyOtp,getMe} from "../services/auth.services.js"
import { setError,setLoading,setUser } from "../auth.slice";

export function useAuth(){
    const dispatch = useDispatch()

    async function handleRegister({email,username,password,phoneNumber}) {
        try{
            dispatch(setLoading(true))
            const data = await register({email,username,password,phoneNumber})
        

        }catch(error){
            dispatch(setError(error.response?.data?.message || error.message));

        }finally{
            dispatch(setLoading(false))
        }
    }


    async function handleLogin({email,password}) {
        try{
            dispatch(setLoading(true))
            const data = await login({email,password})

        }catch(error){
            dispatch(setError(error.response?.data?.message || error.message));
        }finally{
            dispatch(setLoading(false))
        }
    }


    async function handleLogout() {
        try{
            dispatch(setLoading(true))
            const data = await logout()

        }catch(error){
            dispatch(setError(error.response?.data?.message || error.message));
        }finally{
            dispatch(setLoading(false))
        }
    }


    async function handleVerifyOtp({otp}) {
        try{
            dispatch(setLoading(true))
            const data = await verifyOtp({otp})
        }catch(error){
            dispatch(setError(error.response?.data?.message || error.message));
        }finally{
            dispatch(setLoading(false))
        }
    }


    async function handleGetMe() {
        try{
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        }catch(error){
            dispatch(setError(error.response?.data?.message || error.message));
        }finally{
            dispatch(setLoading(false))
        }
    }

    return{
        handleLogin,
        handleRegister,
        handleVerifyOtp,
        handleGetMe,
        handleLogout
    }

}