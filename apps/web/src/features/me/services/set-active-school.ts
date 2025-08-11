"use server"

import { authenticatedPut } from "@/features/auth/utils/authenticated-put";
import { UserResponse } from "@/shared/types/user";

export async function setActiveSchool(active_school_id: string): Promise<UserResponse> {
    // Initialize response variable to return
    let r: UserResponse = { success: false, data: null, error: "" }

    try {
        const resp = await authenticatedPut({
            uri: "/me/active-school",
            body: {
                active_school_id,
            }
        })

        if (!resp.ok) {
            const err = await resp.text()
            r.error = err || "Failed to create school"
            return r
        }

        // Get data from response and set to response variable
        const data = await resp.json()
        r.success = true
        r.data = data
    } catch (err: any) {
        if (err instanceof Error) {
            r.error = err.message
        } else {
            r.error = "Unknown error, failed to set active school"
        }
    }

    return r
}
