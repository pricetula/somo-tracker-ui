"use server"

import { ActionResponse } from "@/shared/types/actions"
import { authenticatedPost } from "@/features/auth/utils/authenticated-post"
import { CreateSchool, School } from "../types"

type CreateSchoolResponse = ActionResponse<School | null>

export async function createSchool(d: CreateSchool): Promise<CreateSchoolResponse> {
    // Initialize response variable to return
    let r: CreateSchoolResponse = { success: false, data: null, error: "" }

    try {
        // Attempt to create School and new user
        const resp = await authenticatedPost({
            uri: "/schools",
            body: d,
        })

        // Check if response is not ok and set error
        if (!resp.ok) {
            const err = await resp.text()
            r.error = err || "Failed to create school"
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
            r.error = "Unknown error, failed to create school"
        }
    }

    // Return result
    return r
}