import { GetSchoolUsersInput, SchoolUser } from "@/features/school-user/types"
import { buildSchoolUsersURL } from "../utils"

/**
 * Fetches the list of school users by hitting the internal Next.js API Route /api/school-users.
 * This function is safe to call from Client Components (useQuery).
 * It relies on the browser to automatically send cookies to the same origin.
 */
export async function getSchoolUsersAPI(i: GetSchoolUsersInput): Promise<SchoolUser[]> {
    const uri = buildSchoolUsersURL('api/school-users', i)

    // 1. Fetch the internal API endpoint. Relative path is safe in the browser.
    const resp = await fetch(uri)

    // 2. Handle non-OK responses from the API Route
    if (!resp.ok) {
        let errorMessage: string

        // Handle other non-success status codes (e.g., 500 from the server)
        try {
            const errorJson = await resp.json()
            errorMessage = errorJson.message || `Failed to fetch school users, status: ${resp.status}`
        } catch {
            errorMessage = `Failed to fetch school users, status: ${resp.status}`
        }

        throw new Error(errorMessage)
    }

    // 3. Return the JSON payload (School[])
    return await resp.json() as Promise<SchoolUser[]>
}
