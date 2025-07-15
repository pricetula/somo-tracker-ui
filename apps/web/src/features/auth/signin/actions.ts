import { COOKIE } from "@/shared/lib/constants";
import { ActionResponse } from "@/shared/types/actions";
import { cookies } from "next/headers";
import { AuthCookie } from "../types";

/**
 * Sends an OTP code to the provided email address.
 *
 * @param email The email address to send the OTP code to.
 * @returns A promise that resolves to an object containing the success status, data, and error message.
 */
export async function sendOtpCodeToEmail(email: string): Promise<ActionResponse<string>> {
    "use server";
    try {
        // Check if email is provided otherwise throw error
        if (!email) {
            return { success: false, data: "", error: "Email is required" };
        }

        // Check if API_URL is set otherwise throw error
        if (!process.env.API_URL) {
            return { success: false, data: "", error: "API url not set" };
        }

        const res = await fetch(`${process.env.API_URL}auth/send-code`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        // If response is not ok, return error
        if (!res.ok) {
            const err = await res.json();
            return { success: false, data: "", error: err.error || "Failed to send code" };
        }

        return { success: true, data: "", error: "" };
    } catch (err) {
        return { success: false, data: "", error: "Network/server error" };
    }
}

// Response from API
interface AuthResponse extends AuthCookie {
    message: string;
}

/**
 * Verifies the provided OTP code for the given email address.
 *
 * @param code The OTP code to verify.
 * @param email The email address associated with the OTP code.
 * @returns A promise that resolves to an object containing the success status, data, and error message.
 */
export async function verifyOtpCode({ code, email }: { code: string, email: string }): Promise<ActionResponse<AuthResponse | null>> {
    "use server";
    try {
        // Check if code and email are provided otherwise throw error
        if (!code || !email) {
            return { success: false, data: null, error: "Code and email are required" };
        }

        // Check if API_URL is set otherwise throw error
        if (!process.env.API_URL) {
            return { success: false, data: null, error: "API url not set" };
        }

        const res = await fetch(`${process.env.API_URL}auth/verify-code`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, email }),
        });

        // If response is not ok, return error
        if (!res.ok) {
            const err = await res.json();
            return { success: false, data: null, error: err.error || res.statusText };
        }

        // Get the data from the response
        const data: AuthResponse = await res.json();

        // Get the cookie store
        const cookieStore = await cookies()

        // Set the token in the cookie
        cookieStore.set(COOKIE.AUTH, JSON.stringify({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            id_token: data.id_token,
            token_type: data.token_type,
            expires_in: data.expires_in,
        }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: COOKIE.MAX_AGE,
            path: '/'
        });

        return { success: true, data, error: "" };
    } catch (err) {
        return { success: false, data: null, error: "Server error. Please try again." };
    }
}