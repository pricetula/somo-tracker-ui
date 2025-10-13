import { authenticatedPost } from "@/features/auth/utils/authenticated-post"
import { CreateSchool, School } from "../types"

export async function createSchool(d: CreateSchool): Promise<School> {
    // Attempt to create School and new user
    const resp = await authenticatedPost({
        uri: "/schools",
        body: d,
    })

    // Check if response is not ok and set error
    if (!resp.ok) {
        const err = await resp.text()
        throw err || "Failed to create school"
    }

    // Get data from response and set to response variable
    return await resp.json()
}