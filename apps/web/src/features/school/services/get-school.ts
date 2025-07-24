import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { ActionResponse } from "@/shared/types/actions";
import { School } from "../types";

type GetSchoolsResponse = ActionResponse<School[]>

export async function getSchools(): Promise<GetSchoolsResponse> {
    // Initialize response variable to return
    let r: GetSchoolsResponse = { success: false, data: [], error: "" }

    try {
        // Attempt to get schools
        const resp = await authenticatedGet({
            uri: "/schools",
        })

        // Check if response is not ok and set error
        if (!resp.ok) {
            const err = await resp.text()
            r.error = err || "Failed to get schools"
            return r
        }

        // Get data from response and set to response variable
        const data = await resp.json()
        r.success = true
        r.data = data
    } catch (err) {
        if (err instanceof Error) {
            r.error = err.message
        } else {
            r.error = "Unknown error, failed to get schools"
        }
    }

    // Return result
    return r
}