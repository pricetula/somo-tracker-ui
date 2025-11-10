"use server"

import { ApiInput } from "@/shared/lib/api/types"
import { refreshTokenAndSaveToCookie } from "../services/refresh-token-and-save-to-cookies"
import { AuthenticatedGetError, FailedToGetAuthCookieContentError } from "../errors"
import { getAccessTokenFromAuthCookie } from "./get-access-token-from-auth-cookie";
import { redirect } from "next/navigation"

export async function handleAuthenticatedRequest(d: ApiInput, fn: ({ uri, token, customHeaders }: ApiInput) => Promise<Response>): Promise<Response> {
    // Get the access token from the auth cookie
    const token = await getAccessTokenFromAuthCookie();

    // Check and make sure access token exists
    if (!token) {
        throw new AuthenticatedGetError("Token is required")
    }

    d.token = token

    try {
        // Make get request
        const resp = await fn(d)

        return resp
    } catch (err: any) {
        // Check to see if error is caused by access token expiry
        if (err?.message && err.message.includes("exp")) {
            // Attempt to get new access token
            const newTokenData = await refreshTokenAndSaveToCookie()

            // Set the new token before making request
            d.token = newTokenData.access_token

            // Make get request again
            return await fn(d)
        } else if (err instanceof FailedToGetAuthCookieContentError) {
            redirect("/signout")
        }
        throw err
    }
}