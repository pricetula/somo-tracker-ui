"use server"

import { putApi } from "@/shared/lib/api"
import { ApiInput } from "@/shared/lib/api/types"
import { refreshTokenAndSaveToCookie } from "../services/refresh-token-and-save-to-cookies"
import { AuthenticatedPutError } from "../errors"
import { getAccessTokenFromAuthCookie } from "./get-access-token-from-auth-cookie";

export async function authenticatedPut(d: ApiInput): Promise<Response> {
    // Get the access token from the auth cookie
    const token = await getAccessTokenFromAuthCookie();

    // Check and make sure access token exists
    if (!token) {
        throw new AuthenticatedPutError("Token is required")
    }

    d.token = token

    try {
        // Make get request
        const resp = await putApi(d)

        // If response is not ok then check what the error is
        if (!resp.ok) {
            const error = await resp.text()

            // Throw error if not related to token expiry
            throw new AuthenticatedPutError(error)
        }
        return resp
    } catch (err: any) {
        // Check to see if error is caused by access token expiry
        if (err?.message && err.message.includes("exp")) {
            // Attempt to get new access token
            const newTokenData = await refreshTokenAndSaveToCookie()

            // Set the new token before making request
            d.token = newTokenData.access_token

            // Make get request again
            return await putApi(d)
        }
        throw err
    }
}