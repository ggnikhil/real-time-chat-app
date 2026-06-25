import React, { useState, useRef } from 'react'
import "../styles/Otp.scss"

const VerifyOtp = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const inputRefs = useRef([])

    function handleChange(e, index) {
        const value = e.target.value
        if (!/^[0-9]?$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value && index < 5) {
            inputRefs.current[index + 1].focus()
        }
    }

    function handleKeyDown(e, index) {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    }

    return (
        <div className='verifyOtpPage'>
            <div className='whatsappicon'>
                <i className="ri-whatsapp-line"></i>
            </div>

            <h1>WhatsApp</h1>

            <p className='otpInfo'>An authentication code was sent to your registered email</p>

            <div className='otpBoxes'>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        ref={(el) => (inputRefs.current[index] = el)}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                ))}
            </div>

            <button className='verifyBtn'>Verify OTP</button>

            <p className='timer'>Code expires in 5:00</p>
        </div>
    )
}

export default VerifyOtp