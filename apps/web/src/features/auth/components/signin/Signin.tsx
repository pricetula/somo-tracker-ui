import React, { Suspense } from "react"
import { SigninForm } from "./SigninForm"
import { sendOtpCodeToEmail, verifyOtpCode } from "./actions"

export function Signin() {
    return (
        <div className="h-full flex items-center justify-center">
            <Suspense>
                <SigninForm sendOtpCodeToEmail={sendOtpCodeToEmail} verifyOtpCode={verifyOtpCode} />
            </Suspense>
        </div>
    )
}