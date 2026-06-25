import React from 'react'
import "../styles/welcomePage.scss"
import { useNavigate } from "react-router-dom"

const WelcomePage = () => {
    const navigate = useNavigate()

    
    return (
        <div className="welcome-page">
            <h1>Welcome to WhatsApp</h1>

            <div className='bgwallpaper'>
                <img src="/1radis.png" alt="bg" />
            </div>

            <div className='infobox'>
                <p>Read our <span>Privacy Policy.</span> Tap "Agree and continue" to accept the <span>Terms of services</span></p>
            </div>

            <button onClick={()=> navigate("/login")}>AGREE AND CONTINUE</button>

        </div>
    )
}

export default WelcomePage
