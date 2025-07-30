import { cookies } from "next/headers"
import { COOKIE } from "@/shared/lib/constants"
import { SaveAuthToCookieError } from "../errors";
import { AuthCookie } from "../types";

export async function saveAuthToCookie(data: AuthCookie): Promise<void> {
    "use server"

    if (!data) {
        throw new SaveAuthToCookieError("No data found in refresh token response")
    }

    if (!data.access_token) {
        throw new SaveAuthToCookieError("No access token found in refresh token response")
    }

    // if (!data.refresh_token) {
    //     throw new SaveAuthToCookieError("No refresh token found in refresh token response")
    // }

    if (!data.id_token) {
        throw new SaveAuthToCookieError("No id token found in refresh token response")
    }

    // Obtain cookie handler
    const cookieStore = await cookies()

    // Store the new refreshed token data obtained to cookies
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
    })
}