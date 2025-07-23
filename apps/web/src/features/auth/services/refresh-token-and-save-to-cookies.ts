import { postApi } from "@/shared/lib/api"
import { TokenRefreshFailedError } from "../errors"
import { AuthCookie } from "../types"
import { saveAuthToCookie } from "../utils/save-auth-to-cookie"
import { getAuthCookieContent } from "../utils/get-auth-cookie-content"

/**
 * Refreshes the token and saves it to the cookie.
 */
export async function refreshTokenAndSaveToCookie(): Promise<AuthCookie> {
    // Obtain token data from cookies. This should contain access token, id token and refresh token
    const tokenData = await getAuthCookieContent()

    // Check and make sure refresh token exists after being extracted from cookies
    if (!tokenData?.refresh_token) {
        throw new TokenRefreshFailedError("No refresh token found")
    }

    // Make post request to obtain a new access token using the refresh token obtained
    const refreshTokenResp = await postApi({
        uri: "/refresh-token",
        body: { refresh_token: tokenData.refresh_token },
    })

    // If response is not ok, throw error
    if (!refreshTokenResp.ok) {
        let err = ""
        try {
            err = await refreshTokenResp.text()
        } catch (e) {
            err = "Failed to refresh token"
        }
        throw new TokenRefreshFailedError(err)
    }

    let data: AuthCookie

    // Attempt to parse json data from  refreshTokenResp response
    try {
        data = await refreshTokenResp.json()
    } catch (e) {
        throw new TokenRefreshFailedError("Failed to parse refresh token response")
    }

    // Save the token data to cookies
    await saveAuthToCookie(data)

    return data
}