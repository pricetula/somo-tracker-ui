"use server"

import { ActionResponse } from "@/shared/types/actions"

/**
 * Sends an OTP code to the provided email address.
 *
 * @param email The email address to send the OTP code to.
 * @returns A promise that resolves to an object containing the success status, data, and error message.
 */
export async function sendOtpCodeToEmail(email: string): Promise<ActionResponse<string>> {
    try {
        // Check if email is provided otherwise throw error
        if (!email) {
            return { success: false, data: "", error: "Email is required" }
        }

        // Check if API_URL is set otherwise throw error
        if (!process.env.API_URL) {
            return { success: false, data: "", error: "API url not set" }
        }

        const res = await fetch(`${process.env.API_URL}auth/send-code`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        })

        // If response is not ok, return error
        if (!res.ok) {
            const err = await res.json()
            return { success: false, data: "", error: err.error || "Failed to send code" }
        }

        return { success: true, data: "", error: "" }
    } catch (err) {
        return { success: false, data: "", error: "Network/server error" }
    }
}