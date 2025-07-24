import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { ActionResponse } from "@/shared/types/actions";
import { InstituteUsers } from "../types";

type GetInstituteUsersResponse = ActionResponse<InstituteUsers[]>

export async function getInstituteUsers(limit = 10, offset = 0): Promise<GetInstituteUsersResponse> {
    // Initialize response variable to return
    let r: GetInstituteUsersResponse = { success: false, data: [], error: "" }

    try {
        // Attempt to get invitations
        const resp = await authenticatedGet({
            uri: `/institute-users?limit=${limit}&offset=${offset}}`,
        })

        // Check if response is not ok and set error
        if (!resp.ok) {
            const err = await resp.text()
            r.error = err || "Failed to get institute users"
            return r
        }

        // Get data from response and set to response variable
        const data = await resp.json()
        r.success = true
        r.data = data || []
    } catch (err) {
        if (err instanceof Error) {
            r.error = err.message
        } else {
            r.error = "Unknown error, failed to get institute users"
        }
    }

    // Return result
    return r
}