"use server"

import { authenticatedPut } from "@/features/auth/utils/authenticated-put"
import { UpdateSchoolUserRole, SchoolUser } from "../types"

export async function updateSchoolUserRole(d: UpdateSchoolUserRole): Promise<SchoolUser> {
    // Attempt to create School and new user
    const resp = await authenticatedPut({
        uri: "/school-users/role",
        body: d,
    })

    // Check if response is not ok and set error
    if (!resp.ok) {
        const err = await resp.text()
        throw err || "Failed to update school user role"
    }

    // Get data from response and set to response variable
    return await resp.json()
}