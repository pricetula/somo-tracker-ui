import "server-only";

import { jwtDecode } from "jwt-decode"
import { getAuthCookieContent } from "./get-auth-cookie-content";
import { JwtPayload } from "../types";
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
    } catch (error: any) {
        throw new Error(`Failed to decode or parse ID token payload: ${error.message}`);
    }
}