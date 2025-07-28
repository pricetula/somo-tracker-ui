"use server"

import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { GetInstituteUsersParams, GetInstituteUsersResponse } from "../types";

export async function getInstituteUsers(i: GetInstituteUsersParams = { limit: 10, roles: "", lastSeenCreatedAt: "" }): Promise<GetInstituteUsersResponse> {
    // Initialize response variable to return
    let r: GetInstituteUsersResponse = { success: false, data: [], error: "" }

    try {
        let uri = "/institute-users"

        // Array to hold all query parameters
        let queryParams = []

        // Check if limit was added then push onto query param list
        if (i.limit) queryParams.push(`limit=${i.limit}`)

        // Check if roles was set then add to query param list
        if (i.roles) queryParams.push(`roles=${i.roles.toUpperCase()}`)

        // Check if last seen created at was set then add to query param list
        if (i.lastSeenCreatedAt) queryParams.push(`last_seen_created_at=${i.lastSeenCreatedAt}`)

        // Concatenate the query params to uri
        if (queryParams.length) uri += `?${queryParams.join("&")}`

        // Attempt to get invitations
        const resp = await authenticatedGet({
            uri,
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