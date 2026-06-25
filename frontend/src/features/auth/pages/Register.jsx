import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/register.scss"

const Register = () => {
  return (
    <div className='registerPage'>
        <div className='whatsappicon'>
            <i className="ri-whatsapp-line"></i>
        </div>

        <div className='registertext'>
            <h1>Create Account</h1>
        </div>

        <div>
            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' placeholder='Enter your username'/>
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' placeholder='Enter your email'/>
                </div>

                <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="text" id='phoneNumber' placeholder='Enter your phone number'/>
                </div>
                
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' placeholder='Enter your password'/>
                </div>

                <button>Register</button>

                <p className='registerPtag'>Already have an account? <Link to={"/login"}>Login</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Register