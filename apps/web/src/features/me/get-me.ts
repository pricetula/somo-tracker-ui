import { cookies } from "next/headers";
import { getApi, postApi } from "@/shared/lib/api";
import { getAuthCookieContent } from "@/features/auth/utils/cookies";
import { InstituteUser } from "./types";
import { COOKIE } from "@/shared/lib/constants";

export async function getMe(token: string): Promise<InstituteUser> {
    const resp = await getApi({ uri: "/me", token })
    if (!resp.ok) {
        const { error } = await resp.json()

        if (error && error.includes('"exp" not satisfied')) {
            // Get token data stored on cookies
            const tokenData = await getAuthCookieContent()

            if (!tokenData?.refresh_token) {
                throw new Error("No refresh token found")
            }

            const refreshTokenResp = await postApi({ uri: "/refresh-token", body: { refresh_token: tokenData.refresh_token } })

            if (!refreshTokenResp.ok) {
                throw new Error("Failed to refresh token")
            }

            const data = await refreshTokenResp.json()

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

            const resp = await getApi({ uri: "/me", token: data.access_token })

            if (!resp.ok) {
                throw new Error("Failed to get me")
            }

            return await resp.json()
        }

        const err = new Error(error || resp.statusText);

        err.name = resp.statusText;

        throw err;
    }
    return await resp.json();
}
