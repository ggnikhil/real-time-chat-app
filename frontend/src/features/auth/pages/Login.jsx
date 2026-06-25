import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/login.scss"

const Login = () => {
  return (
    <div className='loginPage'>
        <div className='whatsappicon'>
            <i class="ri-whatsapp-line"></i>
        </div>

        <div className='logintext'>
            <h1>Login</h1>
        </div>

        <div>
            <form>
                <div>
                    <label htmlFor="Email">Email</label>
                    <input type="text" id='email' placeholder='Enter your email'/>
                </div>
                
                <div>
                    <label htmlFor="Password">Password</label>
                    <input type="password" id='password' placeholder='Enter your password'/>
                </div>

                <button>Login</button>

                <p className='loginPtag'>New here? <Link to={"/register"}>Create new Account</Link></p>
            </form>

            <div className='policyParabox'>
                <p className='policyPara'>By continuing to log in or sign up, you confirm that you have read, understood, and agree to our Terms of Service and Privacy Policy, which govern your use here.</p>
            </div>
        </div>
    </div>
  )
}

export default Login
