import { SchoolUser } from "@/features/school-user/types";


/**
 * Fetches the list of me by hitting the internal Next.js API Route /api/me.
 * This function is safe to call from Client Components (useQuery).
 * It relies on the browser to automatically send cookies to the same origin.
 */
export async function getMeAPI(): Promise<SchoolUser[]> {
    // 1. Fetch the internal API endpoint. Relative path is safe in the browser.
    const resp = await fetch("/api/me");

    // 2. Handle non-OK responses from the API Route
    if (!resp.ok) {

        let errorMessage: string;

        // Handle 401 specifically, as it means the token failed the server-side check
        if (resp.status === 401) {
            errorMessage = "Authentication required. Please sign in again.";
            // We throw a standardized Error object for serialization safety.
            const authError = new Error(errorMessage);
            (authError as any).status = 401; // Attach status for potential hook error handling
            throw authError;
        }

        // Handle other non-success status codes (e.g., 500 from the server)
        try {
            const errorJson = await resp.json();
            errorMessage = errorJson.message || `Failed to fetch me, status: ${resp.status}`;
        } catch {
            errorMessage = `Failed to fetch me, status: ${resp.status}`;
        }

        throw new Error(errorMessage);
    }

    // 3. Return the JSON payload (SchoolUser[])
    return resp.json() as Promise<SchoolUser[]>;
}
