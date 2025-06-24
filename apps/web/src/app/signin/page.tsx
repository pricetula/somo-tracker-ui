import { cookies } from "next/headers";
import { Signin } from "@/components/page/signin"

export default function Page() {
    async function sendOtpCodeToEmail(email: string) {
        "use server";
        try {
            const res = await fetch(`${process.env.API_URL}auth-send-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const err = await res.json();
                return { success: false, data: null, error: err.error || "Failed to send code" };
            }

            return { success: true, data: null, error: "" };
        } catch (err) {
            return { success: false, data: null, error: "Network/server error" };
        }
    }

    async function verifyOtpCode({ code, email }: { code: string, email: string }) {
        "use server";
        try {
            const res = await fetch(`${process.env.API_URL}auth-verify-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, email }),
            });

            if (!res.ok) {
                const err = await res.json();
                return { success: false, data: null, error: err.error || res.statusText };
            }

            const data = await res.json();

            const cookieStore = await cookies()

            cookieStore.set('auth', JSON.stringify(data), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7,
                path: '/'
            });

            return { success: true, data, error: "" };
        } catch (err) {
            return { success: false, data: null, error: "Server error. Please try again." };
        }
    }

    return (
        <Signin
            verifyOtpCode={verifyOtpCode}
            sendOtpCodeToEmail={sendOtpCodeToEmail}
        />
    )
}
