import { EducationSystem } from "../types";


/**
 * Fetches the list of me by hitting the internal Next.js API Route /api/me.
 * This function is safe to call from Client Components (useQuery).
 * It relies on the browser to automatically send cookies to the same origin.
 */
export async function getEducationSystemsAPI(): Promise<EducationSystem[]> {
    // 1. Fetch the internal API endpoint. Relative path is safe in the browser.
    const resp = await fetch("/api/education-systems");

    // 2. Handle non-OK responses from the API Route
    if (!resp.ok) {
        let errorMessage: string;

        // Handle other non-success status codes (e.g., 500 from the server)
        try {
            const errorJson = await resp.json();
            errorMessage = errorJson.message || `Failed to fetch education systems, status: ${resp.status}`;
        } catch {
            errorMessage = `Failed to fetch education systems, status: ${resp.status}`;
        }

        throw new Error(errorMessage);
    }

    // 3. Return the JSON payload (SchoolUser[])
    return resp.json() as Promise<EducationSystem[]>;
}
