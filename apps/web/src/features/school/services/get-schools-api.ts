import { School } from "@/features/school/types";

/**
 * Fetches the list of schools by hitting the internal Next.js API Route /api/schools.
 * This function is safe to call from Client Components (useQuery).
 * It relies on the browser to automatically send cookies to the same origin.
 */
export async function getSchoolsAPI(): Promise<School[]> {
    // 1. Fetch the internal API endpoint. Relative path is safe in the browser.
    const resp = await fetch("/api/schools");

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
            errorMessage = errorJson.message || `Failed to fetch schools, status: ${resp.status}`;
        } catch {
            errorMessage = `Failed to fetch schools, status: ${resp.status}`;
        }

        throw new Error(errorMessage);
    }

    // 3. Return the JSON payload (School[])
    return resp.json() as Promise<School[]>;
}
