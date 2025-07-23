import { ActionResponse } from "@/shared/types/actions"
import { authenticatedPost } from "@/features/auth/utils/authenticated-post"
import { CreateInstitute, Institute } from "../types"

type CreateInstituteResponse = ActionResponse<Institute | null>

export async function createInstitute(d: CreateInstitute): Promise<CreateInstituteResponse> {
    // Initialize response variable to return
    let r: CreateInstituteResponse = { success: false, data: null, error: "" }

    try {
        // Attempt to create institute and new user
        const resp = await authenticatedPost({
            uri: "/institutes",
            body: d,
        })

        // Check if response is not ok and set error
        if (!resp.ok) {
            const err = await resp.json()
            r.error = err.error || "Failed to create institute"
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
            r.error = "Unknown error, failed to create institute"
        }
    }

    // Return result
    return r
}