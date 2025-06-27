import "server-only";

import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers";
import { COOKIE } from "@/shared/lib/constants";
import { AuthCookie, JwtPayload } from "../types";

/**
 * Internal helper function to safely get and parse the "auth" cookie.
 * @returns Parsed AuthCookieContent object, or null if the cookie is missing or invalid.
 */
async function getAuthCookieContent(): Promise<AuthCookie | null> {
    try {
        const cookieStore = await cookies();
        const authCookie = cookieStore.get(COOKIE.AUTH);

        if (!authCookie || !authCookie.value) {
            return null;
        }

        // The cookie value is expected to be a JSON string
        const content: AuthCookie = JSON.parse(authCookie.value);

        // Basic validation to ensure it has the expected tokens
        if (typeof content.id_token !== "string" || typeof content.access_token !== "string") {
            console.warn("Auth cookie content is missing expected tokens.");
            return null;
        }

        return content;
    } catch (error) {
        console.error("Failed to parse auth cookie:", error);
        return null;
    }
}

/**
 * Extracts the access token from the "auth" cookie.
 * This function should only be called on the server.
 * @returns The access token string, or undefined if not found or cookie is invalid.
 */
export async function getAccessTokenFromAuthCookie(): Promise<string> {
    const content = await getAuthCookieContent();
    return content?.access_token || "";
}

/**
 * Extracts and decodes user details from the id_token found in the "auth" cookie.
 * This function performs a *decoding* (base64) of the JWT payload,
 * it does NOT *verify* the JWT"s signature.
 * It is assumed that the id_token was already verified by your authentication server
 * before being stored in the cookie by your Server Action.
 *
 * This function should only be called on the server.
 * @returns The decoded JWT payload (user details), or null if id_token is missing or invalid.
 */
export async function getPayloadFromIdToken(): Promise<JwtPayload | null> {
    const content = await getAuthCookieContent();

    if (!content?.id_token) {
        return null;
    }

    try {
        const decoded = jwtDecode<{
            email: string;
            picture: string;
        }>(content.id_token)

        return {
            picture: decoded.picture,
            email: decoded.email,
        };
    } catch (error) {
        console.error("Failed to decode or parse ID token payload:", error);
        return null;
    }
}

/**
 * Deletes the "auth" cookie.
 * This function should only be called on the server.
 */
export async function deleteAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE.AUTH);
}