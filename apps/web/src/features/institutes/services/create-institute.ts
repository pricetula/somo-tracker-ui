"use server"

import { authenticatedPost } from "@/features/auth/utils/authenticated-post"
import { CreateInstitute, Institute } from "../types"

export async function createInstitute(d: CreateInstitute): Promise<Institute> {
    // Attempt to create institute and new user
    const resp = await authenticatedPost({
        uri: "/institutes",
        body: d,
    })

    // Check if response is not ok and set error
    if (!resp.ok) {
        const err = await resp.text()
        throw err || "Failed to create institute"
    }

    // Get data from response and set to response variable
    return await resp.json()
}