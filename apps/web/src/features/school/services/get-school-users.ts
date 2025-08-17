import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { ActionResponse } from "@/shared/types/actions";
import { SchoolUser } from "../types";

type GetSchoolUserResponse = ActionResponse<SchoolUser[]>

export async function getSchoolUsers(): Promise<GetSchoolUserResponse> {
    // Initialize response variable to return
    let r: GetSchoolUserResponse = { success: false, data: [], error: "" }

    try {
        // Attempt to get schools
        const resp = await authenticatedGet({
            uri: "/schools/users",
        })

        // Check if response is not ok and set error
        if (!resp.ok) {
            const err = await resp.text()
            r.error = err || "Failed to get schools"
            return r
        }

        // Get data from response and set to response variable
        r.success = true
        r.data = await resp.json()
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