import "server-only";

import { cookies } from "next/headers";
import { COOKIE } from "@/shared/lib/constants";
import { AuthCookie } from "../types";

/**
 * Internal helper function to safely get and parse the "auth" cookie.
 * @returns Parsed AuthCookieContent object, or null if the cookie is missing or invalid.
 */
export async function getAuthCookieContent(): Promise<AuthCookie | null> {
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
            throw new Error("Auth cookie content is missing expected tokens.");
        }

        return content;
    } catch (error: any) {
        throw new Error(`Failed to get auth cookie content: ${error.message}`);
    }
}
