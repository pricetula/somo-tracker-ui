import { putApi } from "@/shared/lib/api"
import { ApiInput } from "@/shared/lib/api/types"
import { refreshTokenAndSaveToCookie } from "../services/refresh-token-and-save-to-cookies"
import { AuthenticatedGetError } from "../errors"

export async function authenticatedPut(d: ApiInput): Promise<Response> {
    // Check and make sure access token exists
    if (!d.token) {
        throw new AuthenticatedGetError("Token is required")
    }

    // Make get request
    const resp = await putApi(d)

    // If response is not ok then check what the error is
    if (!resp.ok) {
        const { error } = await resp.json()

        // Check to see if error is caused by access token expiry
        if (error && error.includes('"exp" not satisfied')) {
            // Attempt to get new access token
            const newTokenData = await refreshTokenAndSaveToCookie()

            // Set the new token before making request
            d.token = newTokenData.access_token

            // Make get request again
            return await putApi(d)
        }
    }
    return resp
}