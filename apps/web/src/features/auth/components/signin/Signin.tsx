import React from "react"
import { SigninForm } from "./SigninForm"
import { sendOtpCodeToEmail, verifyOtpCode } from "./actions"

export function Signin() {
    return (
        <div className="h-full flex items-center justify-center">
            <SigninForm sendOtpCodeToEmail={sendOtpCodeToEmail} verifyOtpCode={verifyOtpCode} />
        </div>
    )
}