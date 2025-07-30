import React from "react"
import { sendOtpCodeToEmail } from "../../services/send-otp-code-to-email"
import { verifyOtpCode } from "../../services/verify-otp-code"
import { SigninForm } from "./SigninForm"

export function Signin() {
    return (
        <div className="h-full flex items-center justify-center">
            <SigninForm sendOtpCodeToEmail={sendOtpCodeToEmail} verifyOtpCode={verifyOtpCode} />
        </div>
    )
}