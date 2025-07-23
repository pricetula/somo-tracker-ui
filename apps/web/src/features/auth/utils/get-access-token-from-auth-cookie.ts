import "server-only";

import { getAuthCookieContent } from "./get-auth-cookie-content";

/**
 * Extracts the access token from the "auth" cookie.
 * This function should only be called on the server.
 * @returns The access token string, or undefined if not found or cookie is invalid.
 */
export async function getAccessTokenFromAuthCookie(): Promise<string> {
    const content = await getAuthCookieContent();
    return content?.access_token || "";
}
