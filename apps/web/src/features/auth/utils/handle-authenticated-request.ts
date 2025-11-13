"use server"

import { ApiInput } from "@/shared/lib/api/types"
import { refreshTokenAndSaveToCookie } from "../services/refresh-token-and-save-to-cookies"
import { getAccessTokenFromAuthCookie } from "./get-access-token-from-auth-cookie";

export async function handleAuthenticatedRequest(d: ApiInput, fn: (i: ApiInput) => Promise<Response>): Promise<Response> {
    try {
        // Get the access token from the auth cookie
        const token = await getAccessTokenFromAuthCookie();

        // Set the token in the input data
        d.token = token

        // Make request
        return await fn(d)
    } catch (err: any) {
        // Check to see if error is caused by access token expiry
        if (err?.message && err.message.includes("exp")) {
            // Attempt to get new access token
            const newTokenData = await refreshTokenAndSaveToCookie()

            // Set the new token before making request
            d.token = newTokenData.access_token

            // Make get request again
            return await fn(d)
        }
        throw err
    }
}