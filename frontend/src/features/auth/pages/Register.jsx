import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import "../styles/register.scss"
import { useAuth } from '../hooks/useAuth.js'
import { useSelector } from 'react-redux'

const Register = () => {
    const {handleRegister} = useAuth()
    const navigate = useNavigate()
    const {loading} = useSelector((state)=>state.auth)
    
    if(loading){
        return <h1>Loading....</h1>
    }

    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [phoneNumber, setphoneNumber] = useState("")
    const [password, setpassword] = useState("")


    async function handleSubmit(e){
        e.preventDefault()

        await handleRegister({email,username,password,phoneNumber})
        navigate("/")
        
        setpassword("")
        setphoneNumber("")
        setemail("")
        setusername("")

    }


  return (
    <div className='registerPage'>
        <div className='whatsappicon'>
            <i className="ri-whatsapp-line"></i>
        </div>

        <div className='registertext'>
            <h1>Create Account</h1>
        </div>

        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input value={username} type="text" id='username' placeholder='Enter your username' onChange={(e)=>setusername(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input value={email} type="text" id='email' placeholder='Enter your email' onChange={(e)=>setemail(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input value={phoneNumber} type="text" id='phoneNumber' placeholder='Enter your phone number' onChange={(e)=>setphoneNumber(e.target.value)}/>
                </div>
                
                <div>
                    <label htmlFor="password">Password</label>
                    <input value={password} type="password" id='password' placeholder='Enter your password' onChange={(e)=>setpassword(e.target.value)}/>
                </div>

                <button>Register</button>

                <p className='registerPtag'>Already have an account? <Link to={"/login"}>Login</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Register